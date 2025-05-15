import { Injectable } from '@nestjs/common';
import { ProfesorEntity } from './profesor.entity/profesor.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  BusinessError,
  BusinessLogicException,
} from 'src/shared/errors/business-errors';

@Injectable()
export class ProfesorService {
  constructor(
    @InjectRepository(ProfesorEntity)
    private readonly profesorRepository: Repository<ProfesorEntity>,
  ) {}

  async crearProfesor(profesor: ProfesorEntity): Promise<ProfesorEntity> {
    const gruposPosibles = ['TICSW', 'IMAGINE', 'COMIT'];
    if (
      gruposPosibles.some((palabra) =>
        profesor.grupoInvestigacion.includes(palabra),
      )
    )
      return await this.profesorRepository.save(profesor);
    else
      throw new BusinessLogicException(
        'No contiene un grupo requerido',
        BusinessError.BAD_REQUEST,
      );
  }
  async findProfesorById(id: number): Promise<ProfesorEntity> {
    const profesor = await this.profesorRepository.findOne({
      where: { id },
      relations: ['artworks', 'exhibitions'],
    });
    if (!profesor)
      throw new BusinessLogicException(
        'The museum with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    return profesor;
  }

  async delete(id: number) {
    const profesor = await this.profesorRepository.findOne({ where: { id } });
    if (!profesor)
      throw new BusinessLogicException(
        'The museum with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    await this.profesorRepository.remove(profesor);
  }
  async deleteCedula(cedula: number) {
    const profesor = await this.profesorRepository.findOne({
      where: { cedula },
    });
    if (!profesor)
      throw new BusinessLogicException(
        'The museum with the given id was not found',
        BusinessError.NOT_FOUND,
      );
    let valorTotal = profesor.propuestas.length;
    for (let i = 0; i < valorTotal; i++) {
      if (profesor.propuestas[i].proyecto) {
        throw new BusinessLogicException(
          'Propuesta con proyecto asociado',
          BusinessError.BAD_REQUEST,
        );
      }
    }

    await this.profesorRepository.remove(profesor);
  }
}
