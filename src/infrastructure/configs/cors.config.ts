import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { config } from 'dotenv';

config();

const corsOptions: CorsOptions = {
  origin: process.env.CORS_ORIGIN,
  credentials: process.env.CORS_CREDENTIALS === 'true',
  allowedHeaders: process.env.CORS_ALLOWED_HEADERS,
  methods: process.env.CORS_METHODS,
  preflightContinue: process.env.CORS_PREFLIGHT_CONTINUE === 'true',
};

export = corsOptions;
