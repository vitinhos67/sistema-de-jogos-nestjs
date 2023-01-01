import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema()
class Partidas {
  @Prop()
  categoria: string;

  @Prop()
  jogadores: [{ type: mongoose.Schema.Types.ObjectId; ref: 'jogadores' }];

  @Prop({ type: Array })
  resultado: unknown;
}

export const PartidasSchema = SchemaFactory.createForClass(Partidas);
