import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApplicationEntity } from './entities/application.entity';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectRepository(ApplicationEntity)
    private readonly repo: Repository<ApplicationEntity>,
  ) {}

  create(dto: CreateApplicationDto) {
    const application = this.repo.create(dto);
    return this.repo.save(application);
  }

  findAll() {
    return this.repo.find({
      order: { fechaSolicitud: 'DESC' },
    });
  }

  async findOne(id: number) {
    const application = await this.repo.findOneBy({ id });
    if (!application) {
      throw new NotFoundException('Solicitud no encontrada');
    }
    return application;
  }

  async update(id: number, dto: UpdateApplicationDto) {
    const application = await this.findOne(id);
    Object.assign(application, dto);
    return this.repo.save(application);
  }

  async remove(id: number) {
    const application = await this.findOne(id);
    return this.repo.remove(application);
  }
}
