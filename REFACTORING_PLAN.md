# План рефакторинга eCommerce-Application

> Аудит проведён 10.06.2026. Кодовая база: ~9 400 строк TS/TSX в 205 файлах,
> 42 компонента, 10 страниц, 4 MobX-стора, 5 сервисов, 15 тест-файлов.
> Последний коммит — июль 2024. Проект — учебный (RS School, 2023), стек на момент
> написания уже устарел, на 2026 год — устарел критически.

---

## 1. Резюме

Проект — SPA-витрина на Commercetools, собранная на Create React App. Три
фундаментальные проблемы делают рефакторинг не «желательным», а необходимым:

1. **Безопасность**: `clientSecret` Commercetools зашит в браузерный бандл
   (`REACT_APP_CLIENT_SECRET_CLIENT`). Любой посетитель сайта может извлечь его
   из JS и получить полные права API-клиента. Commercetools официально признаёт
   это уязвимостью ([issue #456](https://github.com/commercetools/commercetools-sdk-typescript/issues/456)).
2. **Мёртвый фундамент**: CRA (`react-scripts`) официально мёртв с февраля 2025,
   `@commercetools/sdk-client-v2` deprecated с октября 2024 и не получает даже
   security-фиксов, `formik-material-ui` — заброшенная alpha 2021 года.
3. **Архитектура против себя**: ~90% состояния в MobX-сторах — это вручную
   написанный кэш серверных данных (то, что сегодня делает TanStack Query
   декларативно), а реальная валидация форм идёт в обход Formik через
   самодельный механизм, скопипащенный 4 раза.

Рекомендуемая стратегия — **поэтапная переустановка фундамента в том же репозитории**
(не параллельный переписанный проект): сначала страховочная сетка из e2e-тестов,
затем замена слоёв снизу вверх (сборка → API → серверное состояние → формы → UI).

---

## 2. Текущее состояние: аудит

### 2.1. Стек и его статус на июнь 2026

| Технология | В проекте | Статус 2026 | Замена |
|---|---|---|---|
| Create React App (`react-scripts` 5) | сборка, dev-сервер, Jest | **мёртв** (deprecated 02/2025, webpack 5, нет поддержки) | Vite 7 |
| React | 18.2 | устарел | React 19 (Actions, `use()`, compiler) |
| TypeScript | 4.9.5 | устарел на 2+ major | TypeScript 5.9+ |
| `@commercetools/sdk-client-v2` | 2.2 | **deprecated 10/2024**, без security-фиксов | `@commercetools/ts-client` v3 |
| `@commercetools/platform-sdk` | 4.11 | сильно отстал | актуальная major-версия |
| MobX 6 + mobx-react-lite | всё состояние | жив, но 90% использования — серверный кэш | TanStack Query 5 + лёгкий клиентский стейт |
| Formik 2 + Yup 1 | формы | Formik фактически не развивается | react-hook-form + zod 4 |
| `formik-material-ui` | 4.0.0-**alpha**.2 | заброшен (2021) | удалить вместе с Formik |
| MUI 5 + `@mui/joy` 5-**beta** | UI-кит | MUI жив (v7+), Joy-beta — тупик | решение: MUI 7 **или** Tailwind 4 + shadcn/ui |
| SCSS-модули + глобальный SCSS + sx-пропсы | 3 параллельные системы стилей | хаос | одна система (см. §3) |
| Jest (через CRA) + RTL 13 | 15 тестов | Jest жив, но привязан к CRA | Vitest 3 + RTL + MSW 2 |
| ESLint 8 + airbnb-config | линтинг | ESLint 8 EOL, airbnb-config заброшен | ESLint 9 flat config + typescript-eslint 8 |
| react-router-dom | 6.14 | живо | react-router 7 или TanStack Router |

### 2.2. Мёртвые зависимости (объявлены, не импортируются ни разу)

`axios`, `localforage`, `match-sorter`, `sort-by`, `react-transition-group`,
`date-fns`, `@mui/joy` — 7 пакетов балласта. Также `src/utils/helpers.ts`
содержит корректный generic-`debounce`, который никто не использует
(CardMini импортирует `debounce` из `@mui/material`).

### 2.3. Критические проблемы безопасности

| # | Проблема | Где |
|---|---|---|
| S1 | `clientSecret` в браузерном бандле; client credentials flow выполняется из браузера | `src/services/BuildClient.ts:18`, `apiWithClientCredentialsFlow()` |
| S2 | Новый OAuth-клиент создаётся **на каждый запрос** (`apiWithClientCredentialsFlow()` вызывается в каждой функции `productService`) — каждый вызов каталога порождает запрос токена; риск rate limit и лишняя задержка | `src/services/productService.ts` |
| S3 | В localStorage сохраняется только `token`-строка; `refreshToken` и `expirationTime` теряются при перезагрузке → «вечный» токен без обновления | `MyTokenCache` в `BuildClient.ts` |
| S4 | Авторизация роутов доверяет флагу `localStorage.loggedIn === 'true'`, не связанному с валидностью токена | `src/stores/UserStore.ts:44`, `src/routes/Secure.tsx` |
| S5 | Пароль в открытом виде живёт в MobX-сторе (`userStore.userData`) весь сеанс регистрации до logout, рехидрируется обратно в поля формы | `pages/Registration`, `UserStore` |

**Немедленное действие (до любого рефакторинга): отозвать и перевыпустить
API-клиент в Merchant Center Commercetools.** Секрет скомпрометирован самим
фактом деплоя на публичный сайт (yes-code-merch.netlify.app).

### 2.4. Архитектурные проблемы по подсистемам

**API-слой (`src/services`)**
- 4 фабрики клиентов (password/anonymous/client-credentials/existing-token) без
  единой точки владения токеном; смешение анонимной и пользовательской сессий.
- Проверки `response.statusCode === 200/400` вручную, хотя SDK сам бросает
  исключение на не-2xx — ветки `400` мертвы.
- Deep-импорты из `@commercetools/platform-sdk/dist/declarations/...` —
  сломаются при любом обновлении SDK.
- `cartId`/`cartVersion` пишутся в localStorage «вокруг» каждого вызова из
  `cartService` — optimistic concurrency разбросана по слоям.

**Состояние (`src/stores`)**
- Сторы — модульные синглтоны с side-эффектами на импорте (ThemeStore мутирует
  `document.body`, UserStore регистрирует `reaction`); без RootStore/Context —
  нетестируемы и враждебны SSR.
- ~90% содержимого — серверный кэш: CartStore на 100% дублирует корзину CT
  (плюс рассинхронизируемый `productsInCartSku: Set`), ProductStore держит в
  observable то, что должно жить в URL (фильтры, сортировка, страница, поиск).
- `UserStore.updateUserProfile` — 148 строк, switch по stringly-typed
  `data.action` на 5 копипащенных блоков, вложенные `runInAction`, и финальное
  безусловное `store.userProfile = {...body}` даже при упавшем запросе.
- Обратные зависимости: стор импортирует enum из `components/baseComponents/...`.
- В `ProductStore` `await` стоит **до** `try` → необработанные promise
  rejections; флаг загрузки включается после прихода данных.
- Ошибки/успехи — глобальная «шина тостов» из hardcoded-строк в трёх сторах,
  которые одновременно слушает SnackBar.

**Формы и валидация**
- Две несовместимые парадигмы: профильные формы — нормальный Formik+Yup;
  логин/регистрация — Formik как контейнер значений, валидация через
  самодельный side-channel `updateMessage(field, messageText, bool)` со
  словарями `useState`, **ключи которых — строки сообщений об ошибках**.
  Машина скопирована 4 раза (~1 100 строк), `signUp.ts` — почти дословная
  копия `sigIn.ts`.
- Финальный сабмит регистрации: `submitForm()` + `setTimeout(() => signup(), 0)`
  — гонка между асинхронным циклом Formik → setState → useEffect → стор и
  таймером 0 мс.
- Баги правил: email-regex регистрации несовместим с regex профиля (можно
  зарегистрироваться с email, который нельзя сохранить в профиле); возраст 13
  при регистрации vs 15 в профиле (и проверка только по году); имена
  отвергают дефисы и апострофы (O'Brien, Anna-Maria); почтовый индекс везде
  `^\d{5}$` независимо от страны; в списке стран есть «EU», которого CT
  отвергнет как не-ISO-код; константа сообщения для города равна
  «Street name is required» (копипаст-баг, **закреплённый юнит-тестом**).
- `ProfileEdit` помечает **все** shipping-адреса как default:
  `checkBox: !!defaultShippingAddress` вместо сравнения id.

**Компоненты и роутинг**
- Нет code splitting: все 10 страниц импортируются жадно в `routes/index.tsx`.
- `App.tsx` при `isAppLoading` размонтирует весь каркас (Header/Routes/Footer).
- Дублирование компонентов под брейкпоинты: Header/HeaderMobile,
  Filter/FilterMobile, Sorting/SortMobile, NavBar — вместо адаптивных версий.
- Баг в `Card.tsx`: `classNames(styles.root, { [styles.isDiscount]: isDiscount, className })`
  — проп `className` никогда не применяется; вместо него при truthy добавляется
  литеральный класс `"className"`.
- Бизнес-логика (пути, варианты, корзина) внутри компонентов; `Card` ведёт
  локальный `isInCart`-стейт параллельно стору.

**Тесты**
- Покрытие бизнес-логики ≈ 0%: ни одного теста на сторы, сервисы, cart-math,
  auth; ни одного `jest.mock`/MSW во всём проекте.
- `SignInValidate.test.tsx` и `SignUpValidate.test.tsx` **байт-в-байт идентичны**
  и оба тестируют... валидацию адресов из `thirdWindow.ts`. Сами `sigIn.ts` и
  `signUp.ts` не покрыты вообще. У Footer два теста с пустыми телами.
- Захардкоженные даты-бомбы: тест поменяет поведение в 2028 году.
- Тесты не запускаются нигде автоматически: CI нет, husky гоняет только
  lint-staged, и только по `*.tsx` (не `*.ts`).
- При миграции UI-кита почти все компонентные тесты одноразовы (ассертят
  внутренности MUI, имена CSS-классов, Formik-обёртки). Переносимы только
  ~11 чистых тестов валидаторов.

**Репозиторий и тулинг**
- **`package-lock.json` в `.gitignore`** — lockfile не закоммичен, сборка
  невоспроизводима.
- CI отсутствует (`.github/` нет). Деплой — Netlify (`public/_redirects`).
- `public/css/` — 100+ **закоммиченных артефактов сборки** (скомпилированные
  `.module.css` + `.map`), которые ниоткуда не подключаются.
- tsconfig: `allowJs: true`, нет `noUncheckedIndexedAccess`, нет path-алиасов,
  `target: es6`.

---

## 3. Целевой стек

### 3.1. Рекомендация

| Слой | Выбор | Обоснование |
|---|---|---|
| Сборка | **Vite 7** | стандарт де-факто, мгновенный dev-сервер, Rollup-прод-сборка |
| Раннтайм | **React 19** | Actions/`use()`/`useOptimistic` упрощают формы и мутации; React Compiler снимает ручную мемоизацию |
| Язык | **TypeScript 5.9+, strict** | + `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, path-алиасы `@/` |
| Роутинг | **TanStack Router** (альтернатива: react-router 7) | типизированные search params — фильтры/сортировка/пагинация каталога переезжают из MobX в URL со 100% типобезопасностью |
| Серверное состояние | **TanStack Query 5** | заменяет CartStore, ProductStore и `userProfile` целиком: кэш, инвалидация, optimistic updates, loading/error из коробки |
| Клиентское состояние | **Zustand** (минимально) | остаётся только тема (1 boolean) и тонкий auth-стейт — MobX избыточен |
| Формы | **react-hook-form + zod 4** | единые схемы (email/password/адрес-по-стране), вывод типов из схем, zod переиспользуется для валидации env и API-ответов |
| Commercetools | **`@commercetools/ts-client` v3 + актуальный `platform-sdk`** | v2-клиент deprecated; v3 — promise-based, активно поддерживается |
| Auth-архитектура | **BFF: Netlify Functions как token-proxy** | секрет живёт только на сервере; браузер получает анонимный/пользовательский токен через свой эндпоинт с минимальными scope |
| UI | **решение за командой**, см. §3.2 | — |
| Стили | следует из выбора UI | в любом случае: одна система вместо трёх |
| Unit/integration | **Vitest 3 + RTL + MSW 2** | Vitest нативен Vite; MSW мокает CT API на сетевом уровне |
| E2E | **Playwright** | страховочная сетка миграции (см. фазу 0) |
| Линт/формат | **ESLint 9 flat config + typescript-eslint 8 + Prettier 3** | airbnb-config мёртв |
| Пакеты | **pnpm + закоммиченный lockfile + Node 22 LTS** | воспроизводимость |
| CI | **GitHub Actions** | lint + typecheck + unit + e2e на PR |

### 3.2. Два решения, которые нужно принять до старта

**A. UI-кит: Tailwind 4 + shadcn/ui vs MUI 7.**
- *Tailwind + shadcn/ui* — «новый стек» в полном смысле: одна система стилей,
  компоненты в своём коде, тёмная тема через CSS-переменные, дизайн придётся
  пересобрать. Больше работы, больше пользы как學ный опыт.
- *MUI 7* — сохранение визуала с меньшими затратами: миграция 5→7 по
  codemod'ам, выкинуть Joy-beta и formik-material-ui, SCSS-модули постепенно
  заменить на одну из MUI-стратегий. Меньше работы, но три системы стилей
  придётся консолидировать всё равно.
- Рекомендация: **Tailwind 4 + shadcn/ui**, если цель — современный стек и
  портфолио; **MUI 7**, если цель — минимальный путь к поддерживаемости.

**B. Vite SPA + BFF-функции vs Next.js 15+.**
- Текущий деплой — Netlify, проект — SPA. *Vite + Netlify Functions* (только
  для auth-proxy) — минимальное изменение модели, рекомендую как базовый
  вариант.
- *Next.js (App Router, RSC)* оправдан, если нужны SEO/SSR для каталога
  (реальный магазин, а не демо). Это заметно больший объём работы и другая
  ментальная модель.
- Рекомендация: **Vite SPA + BFF**, с осознанным отказом от SSR.

### 3.3. Целевая структура (feature-based)

```
src/
  app/                  # точка входа, провайдеры, роутер, error boundaries
  shared/
    api/                # ts-client, queryClient, типизированные обёртки CT
    config/             # env (валидация через zod), константы
    lib/                # утилиты
    ui/                 # базовые компоненты (Button, Price, Icon, ...)
  entities/
    product/            # типы, мапперы CT→домен, ProductCard
    cart/               # типы, cart-math (чистые функции!)
    customer/
  features/
    auth/               # login, registration wizard, session
    catalog-filters/    # фильтры/сортировка/поиск (state в URL)
    cart-management/    # add/remove/quantity/promo
    profile/            # адреса, перс. данные, пароль
  pages/                # сборка страниц из фич, lazy-loaded
```

(При желании — формализовать до Feature-Sliced Design; структура выше —
его упрощённая версия без жёсткой догматики.)

---

## 4. Стратегия миграции

**Не переписывать параллельно с нуля, а заменять слои в текущем репозитории.**
Объём (9.4k LOC) позволил бы и big-bang, но поэтапность даёт: работающее
приложение после каждой фазы, осмысленные PR, и страховку e2e-тестами.

Порядок выбран так, что каждый слой опирается на предыдущий:
сетка безопасности → сборка → API → данные → формы → UI → качество.

Ключевой принцип: **сначала Playwright-сценарии на текущем поведении** —
существующие юнит-тесты сеткой не являются (покрытие логики ~0%, тесты
привязаны к MUI/Formik и умрут вместе с ними).

---

## 5. План по фазам

### Фаза 0 — Безопасность и страховочная сетка (≈ 1 неделя)

| # | Задача | Критерий готовности |
|---|---|---|
| 0.1 | **Ротация API-клиента Commercetools** в Merchant Center; новые scope — минимальные (`view_published_products`, me-эндпоинты) | старый clientId/secret отозваны |
| 0.2 | Убрать `package-lock.json` из `.gitignore`, закоммитить lockfile (или сразу перейти на pnpm) | `pnpm install --frozen-lockfile` воспроизводим |
| 0.3 | Удалить `public/css/**` (артефакты сборки) и 7 мёртвых зависимостей | `git rm`, `npm ls` чист |
| 0.4 | Поднять GitHub Actions: lint + tsc + test на PR | зелёный пайплайн |
| 0.5 | **Playwright: 6–8 e2e-сценариев на текущем приложении**: логин, регистрация (3 шага), каталог+фильтр+пагинация, карточка товара, корзина (add/qty/remove), промокод, профиль (смена адреса), logout | сценарии зелёные против прода/превью |
| 0.6 | Характеризационные юнит-тесты на чистую логику, которая переживёт миграцию: `cartHelpers.getCartProducts` (центы, скидки, промо), `productHelpers`, валидаторы | зафиксировано текущее поведение, включая известные баги (с TODO-пометками) |

### Фаза 1 — Сборка и тулинг: CRA → Vite (≈ 1 неделя)

| # | Задача |
|---|---|
| 1.1 | Vite 7 + `@vitejs/plugin-react`; `index.html` в корень; `REACT_APP_*` → `import.meta.env.VITE_*`; валидация env через zod при старте |
| 1.2 | TypeScript 5.9: `strict` + `noUncheckedIndexedAccess` + `exactOptionalPropertyTypes`, убрать `allowJs`, path-алиас `@/*` |
| 1.3 | ESLint 9 flat config + typescript-eslint 8 + Prettier 3; husky/lint-staged чинить: проверять `*.ts` и `*.tsx` |
| 1.4 | Vitest 3 + RTL: перенести 15 тестов (фактически переносимы ~11 валидаторных; пустые и дублирующиеся — удалить) |
| 1.5 | React 18 → 19 (здесь же, пока diff мал): убрать `react-dom/test-utils`, обновить types |

Результат: то же приложение, но живой фундамент. E2E из фазы 0 зелёные.

### Фаза 2 — API-слой и аутентификация (≈ 1–2 недели)

| # | Задача |
|---|---|
| 2.1 | BFF на Netlify Functions: эндпоинты `POST /auth/anonymous`, `POST /auth/login`, `POST /auth/refresh`, `POST /auth/logout` — только они знают `clientSecret`; браузеру отдаётся access token c минимальным scope + httpOnly-cookie c refresh token (или ротация через BFF) |
| 2.2 | `@commercetools/ts-client` v3 + свежий `platform-sdk`: **один** клиент-инстанс на сессию (не на запрос!), токен-менеджмент в одном модуле; убрать все deep-импорты из `dist/declarations` |
| 2.3 | Переписать сервисы как тонкие типизированные функции над `apiRoot` (products, categories, cart по me-эндпоинтам, customer); убрать ручные проверки `statusCode`, нормализовать ошибки CT в доменные |
| 2.4 | Сессии: анонимная сессия создаётся **лениво** (при первом добавлении в корзину), при логине — корзина анонима мержится в корзину пользователя (`anonymousCartSignInMode`) |
| 2.5 | Удалить `loggedIn`-флаг из localStorage; источник истины — наличие валидной сессии |

Результат: секретов в бандле нет, токены живут в одном месте, API типобезопасен.

### Фаза 3 — Серверное состояние: MobX → TanStack Query + URL (≈ 2 недели)

| # | Задача |
|---|---|
| 3.1 | `QueryClient` + провайдер; ключи: `['categories']`, `['products', categoryId, filters, sort, page]`, `['product', key]`, `['cart']`, `['me']` |
| 3.2 | Каталог: фильтры/сортировка/поиск/страница — в **URL search params** (типизированно через TanStack Router); `paginationNavigate`-логика умирает, её выражает query key |
| 3.3 | Корзина: `useCart()` query + мутации add/remove/quantity/promo с optimistic updates и инвалидацией; `productsInCartSku`-Set и ручной cart-кэш удаляются; `cartId/cartVersion` уходят из localStorage (версия — из кэша query) |
| 3.4 | Профиль: `useMe()` + отдельные мутации `useChangePassword`, `useAddAddress`, ... — 148-строчный `updateUserProfile` со switch по `action` умирает |
| 3.5 | Уведомления: вместо «шины» error/success-строк в сторах — toast из `onSuccess`/`onError` мутаций (sonner или аналог) |
| 3.6 | Остаток клиентского стейта: `useTheme` (Zustand или контекст + CSS-переменные), тонкий auth-стейт. **MobX удаляется из зависимостей** |

Результат: −~1 200 строк сторов, loading/error-состояния и ретраи бесплатно.

### Фаза 4 — Формы: Formik/Yup → RHF + zod (≈ 1–2 недели)

| # | Задача |
|---|---|
| 4.1 | Библиотека zod-схем: email (одна! схема), password, имя (разрешить дефисы/апострофы), дата рождения (один возрастной порог, честный расчёт), адрес **с почтовым индексом по стране**, страны — только ISO 3166-1 (убрать «EU») |
| 4.2 | Профильные формы (парадигма B): механический перенос Yup→zod, Formik→RHF; починить баг default-адреса в ProfileEdit (сравнение по id) |
| 4.3 | Логин/регистрация (парадигма A): **переписать с нуля** — RHF `mode: 'onChange'`, чек-лист правил (UX ShowValidate сохраняется) рендерится из zod-issues; машина updateMessage/areAllValuesFalse/4 копии — удаляется (~1 100 строк) |
| 4.4 | Мастер регистрации: state-машина шагов с типизированным аккумулятором в локальном состоянии (не в глобальном сторе), сабмит — единая мутация без `setTimeout`-гонки; пароль не покидает форму |
| 4.5 | Типизированный контракт форма→API вместо `Record<string, string|boolean|number>` + stringly-typed `action` |

### Фаза 5 — UI, стили, маршрутизация (≈ 2–3 недели, зависит от решения A)

| # | Задача |
|---|---|
| 5.1 | Внедрить выбранную систему (Tailwind 4 + shadcn/ui или MUI 7); тёмная тема — CSS-переменные/`data-theme` вместо пересоздания `createTheme` на каждый рендер |
| 5.2 | Консолидация: три системы стилей → одна; SCSS abstract/core переносится в дизайн-токены |
| 5.3 | Слить дубли Header/HeaderMobile, Filter/FilterMobile, Sorting/SortMobile в адаптивные компоненты (container queries / md-брейкпоинты) |
| 5.4 | Роуты — lazy + Suspense (code splitting по страницам); скелетоны вместо размонтирования всего каркаса в App |
| 5.5 | Error boundaries (глобальный + на уровне страниц), страница 404/500 |
| 5.6 | Починить баг `className` в Card; вынести бизнес-логику (generateProductPath, варианты) из компонентов в entities |
| 5.7 | Производительность: bundle-анализ, оптимизация изображений (CT image API: `?format=webp`, размеры), prefetch при наведении |

### Фаза 6 — Качество и закрепление (≈ 1 неделя)

| # | Задача |
|---|---|
| 6.1 | MSW 2: моки CT API; интеграционные тесты фич (каталог+фильтры, корзина, auth-флоу) |
| 6.2 | Пороги покрытия в Vitest для `entities/*` и `shared/api` (например, 80%) |
| 6.3 | Playwright-сценарии из фазы 0 актуализировать; добавить в CI (preview-деплой Netlify) |
| 6.4 | A11y-проход: формы (label/aria), фокус-менеджмент в модалках, контраст в тёмной теме |
| 6.5 | Документация: README (актуальный стек, запуск), ADR на ключевые решения (BFF, TanStack Query, выбор UI-кита) |

---

## 6. Что сознательно НЕ переносим

- 12 из 15 тест-файлов (ассертят MUI-внутренности/CSS-классы/Formik — умирают вместе со стеком; 2 пустых, 2 дубля).
- Всю машину `updateMessage`/`ShowValidate`-словарей (~1 100 строк) — UX
  чек-листа воспроизводится из zod за ~50 строк.
- MobX-сторы целиком (CartStore, ProductStore, UserStore, ThemeStore).
- `formik-material-ui`, `@mui/joy`, 7 мёртвых зависимостей.
- `public/css/**`.

## 7. Риски и меры

| Риск | Мера |
|---|---|
| Сломать корзину/чекаут при замене cart-логики | характеризационные тесты cart-math в фазе 0; e2e-промокод/qty сценарии |
| BFF добавляет операционную сложность | функции маленькие (только токен-обмен); деплой вместе с фронтом на Netlify |
| Параллельная жизнь старого и нового кода между фазами | фазы режутся по слоям, а не по страницам — нет долгоживущих «двух каталогов»; каждая фаза завершается удалением заменённого кода |
| Project в Commercetools мог «протухнуть» (данные, типы продуктов) | в фазе 0 проверить проект в Merchant Center; при необходимости пересоздать тестовые данные скриптом |
| Команда учится новому стеку по ходу | порядок фаз = порядок изучения: Vite/TS → API → Query → RHF/zod → UI |

## 8. Оценка

Суммарно **8–10 недель** в темпе part-time команды из 2–3 человек (как писался
оригинал), или ~4–5 недель full-time одного опытного разработчика.
Фазы 0–2 (безопасность, фундамент, API) — обязательный минимум даже если
рефакторинг остановится: после них проект перестаёт быть уязвимым и
невоспроизводимым.

---

## Приложение: источники

- [Deprecation of the TypeScript SDK v2 client (07/2024)](https://docs.commercetools.com/api/releases/2024-07-26-deprecation-of-the-typescript-sdk-v2-client)
- [TypeScript SDK v2 client is now deprecated (10/2024)](https://docs.commercetools.com/api/releases/2024-10-30-typescript-sdk-v2-client-is-now-deprecated)
- [Get started with the TypeScript SDK (v3)](https://docs.commercetools.com/sdk/ts-sdk-getting-started)
- [Client credentials flow из браузера — уязвимость (issue #456)](https://github.com/commercetools/commercetools-sdk-typescript/issues/456)
- [Implement mobile and browser apps — официальный гайд CT по SPA](https://docs.commercetools.com/tutorials/mobile-spa)
- [Guest checkout / anonymous sessions](https://docs.commercetools.com/tutorials/anonymous-session)
- [HTTP API authorization / scopes](https://docs.commercetools.com/api/authorization)
