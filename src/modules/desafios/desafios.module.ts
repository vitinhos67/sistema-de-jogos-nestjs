import { Module } from '@nestjs/common';
import { DesafiosController } from './desafios.controller';
import { DesafiosService } from './desafios.service';

import { MongooseModule } from '@nestjs/mongoose';
import { DesafiosSchema } from './interface/Desafios.Schema';
import { JogadoresModule } from '../jogadores/jogadores.module';
import { CategoriasModule } from '../categorias/categorias.module';

@Module({
  imports: [
    JogadoresModule,
    CategoriasModule,
    MongooseModule.forFeature([{ name: 'Desafios', schema: DesafiosSchema }]),
  ],
  controllers: [DesafiosController],
  providers: [DesafiosService],
})
export class DesafiosModule {}
