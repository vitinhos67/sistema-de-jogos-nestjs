import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
  Param,
  Put,
} from '@nestjs/common';
import { CriarJogadorDTO } from './dtos/criar-jogador.dto';
import { JogadoresService } from './jogadores.service';
import Jogador from './interfaces/jogador.interface';
import { ValidacaoParametrosPipe } from '../../common/pipes/jogadores.validate';

@Controller('/api/v1/jogadores')
export class JogadoresController {
  constructor(private readonly jogadoresService: JogadoresService) {}

  @Get()
  async getJogadores(): Promise<Jogador[]> {
    return this.jogadoresService.getJogadores();
  }

  @Get(':_id')
  @UsePipes(ValidationPipe)
  async getJogador(@Param('_id', ValidacaoParametrosPipe) id: string) {
    return this.jogadoresService.getJogadorID(id);
  }

  @Post()
  @HttpCode(201) // Atualiza o status code da pagina
  @UsePipes(ValidationPipe)
  async criarJogador(@Body() criarJogadorDto: CriarJogadorDTO) {
    return this.jogadoresService.criarJogador(criarJogadorDto);
  }

  @Put(':_id')
  @UsePipes(ValidationPipe)
  async atualizarjogador(
    @Param('_id') id: string,
    @Body(ValidacaoParametrosPipe)
    CriarJogadorDTO: CriarJogadorDTO,
  ) {
    return this.jogadoresService.atualizar(id, CriarJogadorDTO);
  }

  @Delete(':_id')
  async deletarJogador(@Param('_id', ValidacaoParametrosPipe) id: string) {
    await this.jogadoresService.deletarJogador(id);
    return `Jogador com o id ${id} removido com sucesso`;
  }
}
