import {
  Injectable,
  BadRequestException,
  BadGatewayException,
} from '@nestjs/common';
import { DesafioInterface, Desafio } from './interface/desafios.interface';
import { Model } from 'mongoose';
import { CriarDesafioDTO } from './dtos/criar-desafio.dto';
import { Categoria } from '../categorias/interfaces/categoria.interface';
import Jogador from '../jogadores/interfaces/jogador.interface';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class DesafiosService {
  constructor(
    @InjectModel('Desafios')
    private DesafiosModel: Model<DesafioInterface>,
    @InjectModel('Categoria')
    private categoriaModel: Model<Categoria>,
    @InjectModel('Jogadores')
    private jogadoresModel: Model<Jogador>,
  ) {}
  async todosDesafios() {
    return await this.DesafiosModel.find();
  }

  async cadastrarDesafio(CriarDesafioDTO: CriarDesafioDTO) {
    const { categoria, solicitadoPor, para, dataHoraDesafio } = CriarDesafioDTO;

    const encontrarCategoria = await this.categoriaModel.findOne({ categoria });

    if (!encontrarCategoria) {
      throw new BadRequestException(
        `A categoria ${categoria} não foi encontrada, verifique se esta categoria está correta`,
      );
    }

    const encontrarJogador = await this.jogadoresModel.findById(solicitadoPor);

    const encontrarJogadorRequisitado = await this.jogadoresModel.findById(
      para,
    );

    if (!encontrarJogador || !encontrarJogadorRequisitado) {
      throw new BadRequestException(
        'Um dos jogadores nao foi possivel encontrar',
      );
    }

    const desafioInterface: DesafioInterface = {
      categoria,
      status: Desafio.PENDENTE,
      por: encontrarJogador,
      para: encontrarJogadorRequisitado,
      acontece: dataHoraDesafio,
    };

    const cadastrarDesafio = await this.DesafiosModel.create(desafioInterface);

    return cadastrarDesafio;
  }

  async obterMeusDesafios(id: string) {
    try {
      const encontrarUsuario = await this.jogadoresModel.findById(id);

      if (!encontrarUsuario) {
        throw new BadRequestException('O jogador nao foi encontrado');
      }

      const encontrarDesafios = await this.DesafiosModel.find({
        para: id,
      });

      return encontrarDesafios;
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }
}
