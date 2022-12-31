import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
import { JogadoresModule } from '../modules/jogadores/jogadores.module';
import { CategoriasModule } from './categorias/categorias.module';
import { DesafiosModule } from './desafios/desafios.module';
import { PartidasModule } from './partidas/partidas.module';

dotenv.config();
@Module({
  imports: [
    MongooseModule.forRoot(process.env.DATABASE_STRING_CONNECTION),
    JogadoresModule,
    CategoriasModule,
    DesafiosModule,
    PartidasModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
