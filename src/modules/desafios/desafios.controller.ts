import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { DesafiosService } from './desafios.service';
import { CriarDesafioDTO } from './dtos/criar-desafio.dto';

@Controller('/api/v1/desafios')
export class DesafiosController {
  constructor(private readonly desafiosServices: DesafiosService) {}
  @Get()
  async obterTodosDesafios() {
    return await this.desafiosServices.todosDesafios();
  }

  @Post()
  @UsePipes(ValidationPipe)
  async cadastrarDesafios(@Body() criarCategoriaDTO: CriarDesafioDTO) {
    return await this.desafiosServices.cadastrarDesafio(criarCategoriaDTO);
  }

  @Get('/meusdesafios/:id')
  async obterMeusDesafios(@Param('id') id: string) {
    return await this.desafiosServices.obterMeusDesafios(id);
  }
}
