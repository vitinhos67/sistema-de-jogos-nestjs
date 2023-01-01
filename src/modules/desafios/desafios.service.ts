import {
  Injectable,
  BadRequestException,
  BadGatewayException,
} from '@nestjs/common';
import { DesafioInterface, Desafio } from './interface/desafios.interface';
import { Model } from 'mongoose';
import { CriarDesafioDTO } from './dtos/criar-desafio.dto';
import { InjectModel } from '@nestjs/mongoose';
import { JogadoresService } from '../jogadores/jogadores.service';
import { CategoriasService } from '../categorias/categorias.service';

@Injectable()
export class DesafiosService {
  constructor(
    @InjectModel('Desafios')
    private DesafiosModel: Model<DesafioInterface>,
    private categoriaService: CategoriasService,
    private jogadoresService: JogadoresService,
  ) {}
  async todosDesafios(): Promise<DesafioInterface[]> {
    return await this.DesafiosModel.find();
  }

  async cadastrarDesafio(
    CriarDesafioDTO: CriarDesafioDTO,
  ): Promise<DesafioInterface> {
    const { categoria, solicitadoPor, para, dataHoraDesafio } = CriarDesafioDTO;

    const encontrarCategoria = await this.categoriaService.categoriaPorId(
      categoria,
    );

    if (!encontrarCategoria) {
      throw new BadRequestException(
        `A categoria ${categoria} não foi encontrada, verifique se esta categoria está correta`,
      );
    }

    const encontrarJogador = await this.jogadoresService.getJogadorID(
      solicitadoPor,
    );

    const encontrarJogadorRequisitado =
      await this.jogadoresService.getJogadorID(para);

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

  async obterMeusDesafios(id: string): Promise<DesafioInterface[]> {
    try {
      const encontrarUsuario = await this.jogadoresService.getJogadorID(id);

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

  async atualizarStatusDesafio(id: string, status: string) {
    const encontrarDesafio = await this.DesafiosModel.findById(id);

    if (!encontrarDesafio) {
      throw new BadRequestException('O desafio não foi encontrado');
    }

    const atualizarStatus = await this.DesafiosModel.updateOne(
      {
        id,
      },
      {
        $set: {
          status,
        },
      },
    );

    return atualizarStatus;
  }
}
