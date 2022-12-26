import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Post,
  Query,
  Param,
  Res,
} from '@nestjs/common';
import { CriarJogadorDTO } from './dtos/criar-jogador.dto';
import { JogadoresService } from './jogadores.service';
import { Response } from 'express';
import Jogador from './interfaces/jogador.interface';

@Controller('/api/v1/jogadores')
export class JogadoresController {
  constructor(private readonly jogadoresService: JogadoresService) {}

  @Get()
  async getJogadores(
    @Query('email') email: string,
  ): Promise<Jogador | Jogador[]> {
    if (email) {
      return this.jogadoresService.getJogadorPorEmail(email);
    } else {
      return this.jogadoresService.getJogadores();
    }
  }

  @Post()
  @HttpCode(201) // Atualiza o status code da pagina
  async criarAtualizarJogador(
    @Body() criarJogadorDto: CriarJogadorDTO,
    @Res() response: Response,
  ) {
    this.jogadoresService.criarAtualizarJogador(criarJogadorDto);

    /**
     * Aqui eu fiz o import da classe Response do Express, mas por padrao, O nest
     * utiliza do return e assim sua resposta convertera para JSON com o status Adequado.
     */
    response.status(200).json(criarJogadorDto);
  }

  @Delete()
  async deletarJogador(@Query('email') email: string) {
    console.log(email);
    await this.jogadoresService.deletarJogador(email);

    return `Jogador com o email ${email} removido com sucesso`;
  }
}
