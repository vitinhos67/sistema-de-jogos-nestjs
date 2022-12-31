import * as mongoose from 'mongoose';
/* 
export const CategoriaSchema1 = new mongoose.Schema(
  {
    Categoria: {
      type: String,
      unique: true,
    },
    descricao: String,
    eventos: [
      {
        nome: String,
        operacao: String,
        valor: Number,
      },
    ],
    jogadores: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'jogador',
      },
    ],
  },
  { timestamp: true, collection: 'category' },
); */

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CategoriaDocument = HydratedDocument<Categoria>;

@Schema()
export class Categoria {
  @Prop({
    unique: true,
  })
  categoria: string;

  @Prop()
  descricao: string;

  @Prop([
    {
      nome: String,
      operacao: String,
      valor: Number,
    },
  ])
  eventos: [];

  @Prop([
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'jogador',
    },
  ])
  jogadores: [];
}

export const CategoriaSchema = SchemaFactory.createForClass(Categoria);
