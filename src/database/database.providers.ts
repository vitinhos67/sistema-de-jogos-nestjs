import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> => {
      mongoose.set('strictQuery', true);
      return mongoose.connect(
        'mongodb+srv://victor:senha123@cluster0.5deos.mongodb.net/test1',
      );
    },
  },
];
