import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CriarPartidaDTO } from './dtos/criarPartidaDTO';
import { CategoriasService } from '../categorias/categorias.service';
import { PartidaInterface } from './interface/Partida.interface';
import { JogadoresService } from '../jogadores/jogadores.service';
import { handleError } from 'src/utils/error.handler';

@Injectable()
export class PartidasService {
  constructor(
    @InjectModel('Partidas') private partidaModel: Model<PartidaInterface>,
    private readonly categoriaService: CategoriasService,
    private readonly jogadoresService: JogadoresService,
  ) {}

  async todasPartidas() {
    return await this.partidaModel.find();
  }

  async criarPartida(criarPartidaDTO: CriarPartidaDTO) {
    const { categoria, jogadores, resultado } = criarPartidaDTO;

    const encontrarCategoria = await this.categoriaService.categoriaPorId(
      categoria,
    );

    if (!encontrarCategoria) {
      throw new BadRequestException('Categoria não encontrada;');
    }

    jogadores.forEach(async (jogadorID) => {
      const jogador = await this.jogadoresService.getJogadorID(jogadorID);

      if (!jogador) {
        throw new BadRequestException(
          `Jogador com o id ${jogadorID} não encontrado`,
        );
      }
    });

    const PartidaInterface: PartidaInterface = {
      categoria,
      jogadores: [jogadores[0], jogadores[1]],
      resultado: [resultado],
    };

    const criar = await this.partidaModel
      .create(PartidaInterface)
      .catch(handleError);

    return criar;
  }
}
