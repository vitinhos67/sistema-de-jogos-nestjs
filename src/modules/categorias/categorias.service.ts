import { BadRequestException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { AtualizarCategoriaDTO } from './dto/atualizarCategoria.dto';
import { Categoria } from './interfaces/categoria.interface';
import Jogador from '../jogadores/interfaces/jogador.interface';
import { handleError } from 'src/utils/error.handler';
import { InjectModel } from '@nestjs/mongoose';
@Injectable()
export class CategoriasService {
  constructor(
    @InjectModel('Categorias') private categoriaModel: Model<Categoria>,
    @InjectModel('Jogadores') private jogadoresModel: Model<Jogador>,
  ) {}

  async criarCategoria(criarCategoriaDTO): Promise<Categoria> {
    const { categoria } = criarCategoriaDTO;

    const verificarSeCategoriaJaExiste = await this.categoriaModel
      .findOne({
        categoria,
      })
      .exec();

    if (verificarSeCategoriaJaExiste) {
      throw new BadRequestException(
        'Uma categoria com este nome já esta em uso',
      );
    }

    const criarCategoria = await this.categoriaModel.create(criarCategoriaDTO);
    return criarCategoria;
  }

  async todasCategorias(): Promise<Categoria[]> {
    return await this.categoriaModel.find();
  }

  async categoriaPorId(categoria: string) {
    return await this.categoriaModel.findOne({ categoria });
  }

  async atualizarCategoria(
    categoria: string,
    atualizarCategoriaDTO: AtualizarCategoriaDTO,
  ): Promise<void> {
    const encontrarCategoria = this.categoriaPorId(categoria);

    if (!encontrarCategoria) {
      throw new BadRequestException('Categoria nao encontrada');
    }

    await this.categoriaModel.findOneAndUpdate(
      { categoria },
      { $set: atualizarCategoriaDTO },
    );
  }
  async atribuirJogadorACategoria(params) {
    const { categoria, jogador } = params;

    const encontrarCategoria = await this.categoriaPorId(categoria).catch(
      handleError,
    );

    if (!encontrarCategoria) {
      throw new BadRequestException('A categoria não foi encontrada.');
    }

    const encontrarJogador = await this.jogadoresModel
      .findById(jogador)
      .catch(handleError);

    if (!encontrarJogador) {
      throw new BadRequestException('O Jogador não foi encontrado.');
    }

    await this.categoriaModel.findOneAndUpdate(
      {
        categoria: encontrarCategoria.categoria,
      },
      {
        $push: { jogadores: jogador },
      },
    );
  }
}
