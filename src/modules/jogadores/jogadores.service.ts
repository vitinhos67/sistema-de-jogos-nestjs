import {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  HttpException,
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { AtualizarJogadorDTO } from './dtos/atualizar-jogador';

import { CriarJogadorDTO } from './dtos/criar-jogador.dto';
import Jogador from './interfaces/jogador.interface';

@Injectable()
export class JogadoresService {
  private jogadores: Jogador[] = [];
  private readonly logger = new Logger(JogadoresService.name);

  constructor(
    @InjectModel('Jogadores')
    private JogadoresModel: Model<Jogador>,
  ) {}

  async getJogadores(): Promise<Jogador[]> {
    return await this.JogadoresModel.find();
  }

  async getJogadorID(id: string) {
    const jogador = await this.JogadoresModel.findById(id);

    if (!jogador) {
      throw new NotFoundException(`jogador_nao_encontrado`);
    }
    return jogador;
  }

  async criarJogador(criaJogadorDto: CriarJogadorDTO) {
    return this.criar(criaJogadorDto);
  }

  private async criar(criaJogadorDto: CriarJogadorDTO) {
    const { nome, telefoneCelular, email } = criaJogadorDto;

    await this.verificarSeEmailEstaEmUso(email);

    const jogador: Jogador = {
      nome,
      telefoneCelular,
      email,
      ranking: 'A',
      posicaoRanking: 1,
      urlFotoJogador: 'https://www.google.com.br/foto123.png',
    };

    const salvarJogador = await this.JogadoresModel.create(jogador).catch(
      (e) => {
        if (e) {
          throw new InternalServerErrorException(e.message);
        }
      },
    );

    this.logger.log(`CriaJogadorDTO: ${JSON.stringify(jogador)}`);

    return salvarJogador;
  }

  async deletarJogador(id: string): Promise<void> {
    const jogador = await this.JogadoresModel.findByIdAndDelete(id).catch(
      (e) => {
        if (e) {
          throw new HttpException(e.message, 400, {
            cause: new Error('Jogador nao encontrado'),
          });
        }
      },
    );

    if (!jogador) {
      throw new NotFoundException(`Jogador com o id ${id} não encontrado`);
    }
    return;
  }

  async atualizar(
    id: string,
    atualizarJogadorDto: AtualizarJogadorDTO,
  ): Promise<void> {
    await this.getJogadorID(id);
    await this.JogadoresModel.findByIdAndUpdate(id, atualizarJogadorDto);
  }

  async verificarSeEmailEstaEmUso(email: string) {
    const jogadorEncontrado = await this.JogadoresModel.findOne({
      email,
    });

    if (jogadorEncontrado) {
      throw new BadRequestException(`Email Já esta em uso`);
    }
  }
}
