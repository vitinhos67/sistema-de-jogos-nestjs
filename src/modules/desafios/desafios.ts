import { Connection } from 'mongoose';
import { DesafiosSchema } from './interface/Desafios.Schema';

export const DesafiosProvider = [
  {
    provide: 'DESAFIOS_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Desafios', DesafiosSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
