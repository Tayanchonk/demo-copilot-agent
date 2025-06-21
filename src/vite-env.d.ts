/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly NETLIFY?: string
  // Add other env variables here as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
