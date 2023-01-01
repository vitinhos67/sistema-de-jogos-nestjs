import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriasModule } from '../categorias/categorias.module';
import { JogadoresModule } from '../jogadores/jogadores.module';

import { PartidasSchema } from './interface/Partidas.Schema';
import { PartidasController } from './partidas.controller';
import { PartidasService } from './partidas.service';

@Module({
  imports: [
    CategoriasModule,
    JogadoresModule,
    MongooseModule.forFeature([{ name: 'Partidas', schema: PartidasSchema }]),
  ],
  controllers: [PartidasController],
  providers: [PartidasService],
})
export class PartidasModule {}
