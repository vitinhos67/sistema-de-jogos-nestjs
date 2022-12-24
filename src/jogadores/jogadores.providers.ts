import { Connection } from 'mongoose';
import Jogadores from './interfaces/jogadores.schema';

export const JogadoresProviders = [
  {
    provide: 'JOGADORES_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Jogadores', Jogadores),
    inject: ['DATABASE_CONNECTION'],
  },
];
