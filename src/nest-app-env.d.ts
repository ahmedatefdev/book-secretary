declare namespace NodeJS {
  interface ProcessEnv {
    MONGODB_URL: string;
    NODE_ENV: 'development' | 'production' | 'test';
    EXPIRE_IN: string;
    JWT_SECRET: string;
    DB_TYPE: string;
    USE_NEW_URL_PARSER: string;
    TYPEORM_SYNC: string;
    LOGGING: string;
  }
}

interface Window {
  Stripe: any;
}
