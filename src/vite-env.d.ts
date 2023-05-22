/// <reference types="vite/client" />

interface ImportMetaEnv {
  MODE: string;
  DEV: boolean;
  PROD: boolean;
  SSR: boolean;
  VITE_KEYCLOAK_URL: string;
  VITE_KEYCLOAK_REALM: string;
  VITE_KEYCLOAK_CLIENT_ID: string;
  VITE_BASE_URL: string;
  VITE_MODE: string;
}
