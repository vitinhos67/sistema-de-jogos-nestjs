import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CriarCategoriaDTO } from './dto/criar-categoria-dto';
import { AtualizarCategoriaDTO } from './dto/atualizarCategoria.dto';
import { ValidacaoParametrosPipe } from 'src/common/pipes/jogadores.validate.pipe';

@Controller('/api/v1/categorias')
export class CategoriasController {
  constructor(private readonly categoriaService: CategoriasService) {}

  @Get()
  async TodasCategorias() {
    return await this.categoriaService.todasCategorias();
  }

  @Get(':categoria')
  async CategoriaPorId(@Param('categoria') categoria: string) {
    const categoriaEncontrada = await this.categoriaService.categoriaPorId(
      categoria,
    );

    if (!categoriaEncontrada) {
      throw new BadRequestException('Nao foi possivel encontrar a categoria');
    }

    return categoriaEncontrada;
  }

  @Post()
  @UsePipes(ValidationPipe)
  async criarCategoria(@Body() criarCategoriaDTO: CriarCategoriaDTO) {
    const categoria = await this.categoriaService.criarCategoria(
      criarCategoriaDTO,
    );

    return categoria;
  }

  @Put(':categoria')
  async atualizarCategoria(
    @Param('categoria') categoria: string,
    @Body() atualizarCategoriaDTO: AtualizarCategoriaDTO,
  ) {
    await this.categoriaService.atualizarCategoria(
      categoria,
      atualizarCategoriaDTO,
    );

    return `categoria atualizada com sucesso`;
  }

  @Post(':categoria/jogador/:jogador')
  @UsePipes(ValidationPipe)
  async atribuirJogadorACategoria(
    @Param(ValidacaoParametrosPipe) params: string[],
  ): Promise<string> {
    await this.categoriaService.atribuirJogadorACategoria(params);

    return `Jogador adicionado a categoria ${params['categoria']}`;
  }
}
