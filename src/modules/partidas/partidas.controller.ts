import { Body, Controller, Get, Post } from '@nestjs/common';

import { CriarPartidaDTO } from './dtos/criarPartidaDTO';
import { PartidasService } from './partidas.service';

@Controller('/api/v1/partidas')
export class PartidasController {
  constructor(private readonly partidasServices: PartidasService) {}

  @Get()
  async TodasPartidas() {
    return await this.partidasServices.todasPartidas();
  }

  @Post()
  async criarPartida(@Body() criarPartidaDTO: CriarPartidaDTO) {
    return await this.partidasServices.criarPartida(criarPartidaDTO);
  }
}
