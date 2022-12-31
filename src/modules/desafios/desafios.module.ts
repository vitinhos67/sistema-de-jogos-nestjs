import { Module } from '@nestjs/common';
import { DesafiosController } from './desafios.controller';
import { DesafiosService } from './desafios.service';

import { MongooseModule } from '@nestjs/mongoose';
import { CategoriaSchema } from '../categorias/interfaces/categoria.schema';
import { DesafiosSchema } from './interface/Desafios.Schema';
import { JogadoresSchema } from '../jogadores/interfaces/jogadores.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Desafios', schema: DesafiosSchema },
      { name: 'Categoria', schema: CategoriaSchema },
      { name: 'Jogadores', schema: JogadoresSchema },
    ]),
  ],
  controllers: [DesafiosController],
  providers: [DesafiosService],
})
export class DesafiosModule {}
