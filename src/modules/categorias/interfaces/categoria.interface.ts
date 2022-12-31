import Jogador from '../../jogadores/interfaces/jogador.interface';

export interface Categoria {
  readonly categoria: string;
  descricao: string;
  eventos: Array<Eventos>;
  jogadores: Array<Jogador>;
}

export interface Eventos {
  nome: string;
  operacao: string;
  value: string;
}
