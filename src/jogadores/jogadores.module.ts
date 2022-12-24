import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { JogadoresProviders } from 'src/jogadores/jogadores.providers';
import { JogadoresController } from './jogadores.controller';
import { JogadoresService } from './jogadores.service';

@Module({
  imports: [DatabaseModule],
  controllers: [JogadoresController],
  providers: [JogadoresService, ...JogadoresProviders],
})
export class JogadoresModule {}
