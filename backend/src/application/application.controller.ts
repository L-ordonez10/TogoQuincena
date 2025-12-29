import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApplicationService } from './application.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { Logger } from '@nestjs/common';

@Controller('applications')
export class ApplicationController {
  constructor(private readonly service: ApplicationService) {}
  private readonly logger = new Logger(ApplicationController.name);

  @Post()
  create(@Body() dto: CreateApplicationDto) {
    this.logger.log(`Crear aplicación con DTO: ${JSON.stringify(dto)}`);
    return this.service.create(dto);
  }

  @Get()
  findAll(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ) {
    return this.service.findAll(+page, +limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
