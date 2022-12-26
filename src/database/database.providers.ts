import * as constains from '../config/constants';
import * as mongoose from 'mongoose';

const { config } = constains;

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> => {
      mongoose.set('strictQuery', true);
      return mongoose.connect(config.database_uri);
    },
  },
];
