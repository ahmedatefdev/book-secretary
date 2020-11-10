declare namespace NodeJS {
  interface ProcessEnv {
    MONGODB_URL: string;
    NODE_ENV: 'development' | 'production' | 'test';
    EXPIRE_IN: string;
    JWT_SECRET: string;
    SENDGRID_API_EMAIL: string;
    JWT_SECRET_RESET: string;
  }
}

interface Window {
  Stripe: any;
}
