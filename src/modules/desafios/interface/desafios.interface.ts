import Jogador from 'src/modules/jogadores/interfaces/jogador.interface';

export interface DesafioInterface {
  acontece: string;
  status: Desafio;
  por: Jogador; //
  para: Jogador;
  categoria: string; //
  partida?: Partida;
}

export interface Partida {
  def: Jogador;
  resultado: Array<Resultado>;
}

export interface Resultado {
  set: string;
}

export enum Desafio {
  REALIZADO = 'REALIZADO',
  PENDENTE = 'PENDENTE',
  ACEITO = 'ACEITO',
  NEGADO = 'NEGADO',
  CANCELADO = 'CANCELADO',
}
