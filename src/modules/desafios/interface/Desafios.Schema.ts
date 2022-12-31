import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

/*  import { Jogadores } from 'src/modules/jogadores/interfaces/jogadores.schema';

export const DesafiosSchemaMongoose = new mongoose.Schema({
  acontece: String,
  status: String,
  solicitadoEm: {
    type: Date,
    default: Date.now,
  },
  por: { type: mongoose.Schema.Types.ObjectId, ref: 'Jogador' },
  categoria: String,
  jogadores: [],
  partidas: [
    {
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
  resultados: [],
});  */

@Schema()
export class Desafios {
  @Prop()
  acontece: string;

  @Prop()
  status: string;

  @Prop({
    type: Date,
    default: Date.now(),
  })
  solicitadoEm: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Jogador' })
  por: unknown;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Jogador' })
  para: unknown;

  @Prop()
  categoria: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
  })
  partidas: [];

  @Prop()
  resultados: [];
}

export const DesafiosSchema = SchemaFactory.createForClass(Desafios);
