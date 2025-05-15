import { Controller, UseInterceptors, Get } from '@nestjs/common';
import { PropuestaEntity } from './propuesta.entity/propuesta.entity';

import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors/business-errors.interceptor';
import { PropuestaService } from './propuesta.service';

@UseInterceptors(BusinessErrorsInterceptor)
@Controller('propuesta')
export class PropuestaController {
  constructor(private readonly propuestaService: PropuestaService) {}

  @Get()
  async findAll() {
    return await this.propuestaService.findAll();
  }
}
