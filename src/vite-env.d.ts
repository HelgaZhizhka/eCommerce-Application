/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PROJECT_KEY_CLIENT: string;
  readonly VITE_SCOPES_CLIENT: string;
  readonly VITE_API_URL_CLIENT: string;
  readonly VITE_AUTH_URL_CLIENT: string;
  readonly VITE_CLIENT_ID_CLIENT: string;
  readonly VITE_CLIENT_SECRET_CLIENT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
