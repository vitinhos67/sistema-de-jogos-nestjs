import * as dotenv from 'dotenv';

dotenv.config();

export const config = {
  database_uri: process.env.DATABASE_STRING_CONNECTION,
};
