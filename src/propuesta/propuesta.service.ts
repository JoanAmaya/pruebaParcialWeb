import { Injectable } from '@nestjs/common';
import { PropuestaEntity } from './propuesta.entity/propuesta.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  BusinessError,
  BusinessLogicException,
} from 'src/shared/errors/business-errors';

@Injectable()
export class PropuestaService {
  constructor(
    @InjectRepository(PropuestaEntity)
    private readonly propuestaRepository: Repository<PropuestaEntity>,
  ) {}
  async crearPropuesta(propuesta: PropuestaEntity): Promise<PropuestaEntity> {
    if (propuesta.titulo) return await this.propuestaRepository.save(propuesta);
    else
      throw new BusinessLogicException(
        'Titulo vacio',
        BusinessError.BAD_REQUEST,
      );
  }

  async findOne(id: number): Promise<PropuestaEntity> {
    const propuesta = await this.propuestaRepository.findOne({
      where: { id },
      relations: ['proyecto', 'profesor'],
    });
    if (!propuesta)
      throw new BusinessLogicException(
        'La propuesta no fue encontrada',
        BusinessError.NOT_FOUND,
      );

    return propuesta;
  }
  async findAll(): Promise<PropuestaEntity[]> {
    return await this.propuestaRepository.find({
      relations: ['proyecto', 'profesor'],
    });
  }

  async delete(id: number) {
    const propuesta = await this.propuestaRepository.findOne({ where: { id } });
    if (!propuesta)
      throw new BusinessLogicException(
        'The propuesta with the given id was not found',
        BusinessError.NOT_FOUND,
      );
    if (propuesta.proyecto)
      throw new BusinessLogicException(
        'la propuesta tiene asociado un proyecto',
        BusinessError.BAD_REQUEST,
      );

    await this.propuestaRepository.remove(propuesta);
  }
}
