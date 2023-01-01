import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { verificarConteudoStatus } from 'src/common/pipes/verificarStatus.pipe';
import { DesafiosService } from './desafios.service';
import { CriarDesafioDTO } from './dtos/criar-desafio.dto';
import { Desafio, DesafioInterface } from './interface/desafios.interface';
@Controller('/api/v1/desafios')
export class DesafiosController {
  constructor(private readonly desafiosServices: DesafiosService) {}
  @Get()
  async obterTodosDesafios(): Promise<DesafioInterface[]> {
    return await this.desafiosServices.todosDesafios();
  }

  @Post()
  @UsePipes(ValidationPipe)
  async cadastrarDesafios(
    @Body() criarCategoriaDTO: CriarDesafioDTO,
  ): Promise<DesafioInterface> {
    return await this.desafiosServices.cadastrarDesafio(criarCategoriaDTO);
  }

  @Get('/meusdesafios/:id')
  async obterMeusDesafios(
    @Param('id') id: string,
  ): Promise<DesafioInterface[]> {
    return await this.desafiosServices.obterMeusDesafios(id);
  }

  @Put('/status/:id')
  @UsePipes()
  async atualizarStatusDesafio(
    @Param('id') id: string,
    @Body('status', verificarConteudoStatus) status: Desafio,
  ): Promise<string> {
    await this.desafiosServices.atualizarStatusDesafio(id, status);

    return `O status foi atualizado para ${status}`;
  }
}
