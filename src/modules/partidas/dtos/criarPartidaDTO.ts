import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { Resultado } from '../interface/Partida.interface';

export class CriarPartidaDTO {
  @IsString()
  @IsNotEmpty()
  categoria: string;

  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  @IsNotEmpty()
  jogadores: string[];

  @IsNotEmpty()
  resultado: Resultado;
}
