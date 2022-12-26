import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { CriarJogadorDTO } from './dtos/criar-jogador.dto';
import Jogador from './interfaces/jogador.interface';

@Injectable()
export class JogadoresService {
  private jogadores: Jogador[] = [];
  private readonly logger = new Logger(JogadoresService.name);

  constructor(
    @Inject('JOGADORES_MODEL')
    private JogadoresModel: Model<Jogador>,
  ) {}

  async getJogadores(): Promise<Jogador[]> {
    return await this.JogadoresModel.find();
  }

  async getJogadorPorEmail(email: string) {
    const jogadorEncontrado = await this.JogadoresModel.find({
      email,
    });

    if (!jogadorEncontrado) {
      throw new NotFoundException(
        `Jogador não encontrado com o email ${email}`,
      );
    }
    return jogadorEncontrado;
  }

  async criarAtualizarJogador(criaJogadorDto: CriarJogadorDTO): Promise<void> {
    const { email } = criaJogadorDto;

    const jogadorEncontrado = await this.JogadoresModel.findOne({
      email: email,
    });

    if (jogadorEncontrado) {
      return await this.atualizar(jogadorEncontrado, criaJogadorDto);
    } else {
      this.criar(criaJogadorDto);
    }
  }

  private async criar(criaJogadorDto: CriarJogadorDTO): Promise<void> {
    const { nome, telefoneCelular, email } = criaJogadorDto;

    const jogador: Jogador = {
      nome,
      telefoneCelular,
      email,
      ranking: 'A',
      posicaoRanking: 1,
      urlFotoJogador: 'https://www.google.com.br/foto123.png',
    };
    this.logger.log(`CriaJogadorDTO: ${JSON.stringify(jogador)}`);
    await this.JogadoresModel.create(jogador);
  }

  async deletarJogador(email: string) {
    const jogadores = await this.JogadoresModel.remove(email);
    console.log(jogadores);
    if (!jogadores) {
      throw new NotFoundException(
        `Jogador não encontrado com o email ${email}`,
      );
    }
    return;
  }

  private async atualizar(
    jogadorEncontrado,
    criaJogadorDto: CriarJogadorDTO,
  ): Promise<void> {
    const { nome } = criaJogadorDto;

    await this.JogadoresModel.updateOne(
      {
        email: jogadorEncontrado.email,
      },
      {
        nome,
      },
    );
  }
}
