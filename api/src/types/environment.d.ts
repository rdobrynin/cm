export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      POSTGRES_PORT: number;
      POSTGRES_HOST: number;
      POSTGRES_DB: string;
      POSTGRES_USER: string;
      POSTGRES_PASSWORD: string;
      NODE_ENV: 'dev' | 'prod';
    }
  }
}
