/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PROJECT_KEY_CLIENT: string;
  readonly VITE_API_URL_CLIENT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
