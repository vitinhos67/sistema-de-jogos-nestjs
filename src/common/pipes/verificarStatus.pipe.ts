import { BadRequestException, PipeTransform } from '@nestjs/common';
import { Desafio } from 'src/modules/desafios/interface/desafios.interface';

export class verificarConteudoStatus implements PipeTransform {
  transform(value: any) {
    value = value.toUpperCase();

    const status = Object.values(Desafio);
    const verificarSeKeyExiste = status.find(
      (statusKeys) => statusKeys === value,
    );

    if (!verificarSeKeyExiste) {
      throw new BadRequestException(`O valor ${value} não e aceito`);
    }

    return value;
  }
}
