/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GOOGLE_SHEETS_ID: string
  readonly VITE_GOOGLE_SERVICE_ACCOUNT_EMAIL: string
  readonly VITE_GOOGLE_PRIVATE_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}