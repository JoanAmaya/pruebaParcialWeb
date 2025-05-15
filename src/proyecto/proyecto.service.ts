import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProyectoEntity } from './proyecto.entity/proyecto.entity';
import { Repository } from 'typeorm';
import {
  BusinessError,
  BusinessLogicException,
} from 'src/shared/errors/business-errors';

@Injectable()
export class ProyectoService {
  constructor(
    @InjectRepository(ProyectoEntity)
    private readonly proyectoRepository: Repository<ProyectoEntity>,
  ) {}
  async create(proyecto: ProyectoEntity): Promise<ProyectoEntity> {
    if (proyecto.fechaFin > proyecto.fechaInicio)
      return await this.proyectoRepository.save(proyecto);
    else
      throw new BusinessLogicException(
        'Fechas incoherentes',
        BusinessError.PRECONDITION_FAILED,
      );
  }
}
