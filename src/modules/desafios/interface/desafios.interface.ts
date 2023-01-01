import Jogador from 'src/modules/jogadores/interfaces/jogador.interface';

export interface DesafioInterface {
  acontece: string;
  status: Desafio;
  por: Jogador; //
  para: Jogador;
  categoria: string; //
  partida?: PartidaInterface;
}
export interface PartidaInterface {
  categoria: string;
  jogadores: [];
  resultado: Resultado[];
}

type Resultado = {
  set: string;
  ganhador: string;
};

export enum Desafio {
  REALIZADO = 'REALIZADO',
  PENDENTE = 'PENDENTE',
  ACEITO = 'ACEITO',
  NEGADO = 'NEGADO',
  CANCELADO = 'CANCELADO',
}
