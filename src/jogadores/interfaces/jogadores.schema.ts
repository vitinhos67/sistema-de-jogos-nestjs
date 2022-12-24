import * as mongoose from 'mongoose';

export default new mongoose.Schema(
  {
    telefoneCelular: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
    },
    nome: String,
    ranking: String,
    posicaoRanking: Number,
    urlFotoJogador: String,
  },
  {
    timestamps: true,
    collection: 'jogadores',
  },
);
