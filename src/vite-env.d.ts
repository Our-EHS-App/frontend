/// <reference types="vite/client" />

interface ImportMetaEnv {
  MODE: string;
  DEV: boolean;
  PROD: boolean;
  SSR: boolean;
  VITE_BASE_URL: string;
  VITE_MODE: string;
}
