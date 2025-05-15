import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EstudianteEntity } from './estudiante.entity/estudiante.entity';
import { Repository } from 'typeorm';
import {
  BusinessError,
  BusinessLogicException,
} from 'src/shared/errors/business-errors';

@Injectable()
export class EstudianteService {
  constructor(
    @InjectRepository(EstudianteEntity)
    private readonly estudianteRepository: Repository<EstudianteEntity>,
  ) {}

  async create(estudiante: EstudianteEntity): Promise<EstudianteEntity> {
    if (estudiante.codigoEstudiante.toString().length == 10)
      return await this.estudianteRepository.save(estudiante);
    else
      throw new BusinessLogicException(
        'El codigo del estudiante no tiene 10 caracteres',
        BusinessError.PRECONDITION_FAILED,
      );
  }

  async findOne(id: number): Promise<EstudianteEntity> {
    const estudiante = await this.estudianteRepository.findOne({
      where: { id },
      relations: ['proyecto'],
    });
    if (!estudiante)
      throw new BusinessLogicException(
        'The estudiante with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    return estudiante;
  }
}
