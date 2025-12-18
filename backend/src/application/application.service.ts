import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApplicationEntity } from './entities/application.entity';
import { CreateApplicationDto } from './dto/create-application.dto';
import { PersonalEntity } from './entities/personal.entity';
import { UploadsEntity } from './entities/uploads.entity';
import { ReferenceEntity, ReferenceKind } from './entities/reference.entity';
import { LegalEntity } from './entities/legal.entity';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectRepository(ApplicationEntity)
    private readonly repo: Repository<ApplicationEntity>,
    @InjectRepository(PersonalEntity)
    private readonly personalRepo: Repository<PersonalEntity>,
    @InjectRepository(UploadsEntity)
    private readonly uploadsRepo: Repository<UploadsEntity>,
    @InjectRepository(ReferenceEntity)
    private readonly referenceRepo: Repository<ReferenceEntity>,
    @InjectRepository(LegalEntity)
    private readonly legalRepo: Repository<LegalEntity>,
  ) {}

  async create(dto: CreateApplicationDto) {
    // Crear la aplicación principal con entidades relacionadas simples (OneToOne)
    const application = this.repo.create({
      personal: dto.personal,
      uploads: dto.uploads || undefined,
      legal: dto.legal || undefined,
      salary: dto.salary,
      source: dto.source,
    });

    // Guardar la aplicación primero (esto guardará automáticamente las entidades relacionadas OneToOne por cascade)
    const savedApplication = await this.repo.save(application);

    // Ahora crear las referencias con la aplicación ya guardada
    const references: any[] = [];

    if (dto.personalRefs && Array.isArray(dto.personalRefs)) {
      for (const r of dto.personalRefs) {
        references.push({
          ...r,
          kind: ReferenceKind.PERSONAL,
          application: savedApplication,
        });
      }
    }

    if (dto.workRefs && Array.isArray(dto.workRefs)) {
      for (const r of dto.workRefs) {
        references.push({
          ...r,
          kind: ReferenceKind.WORK,
          application: savedApplication,
        });
      }
    }

    if (references.length > 0) {
      await this.referenceRepo.save(references);
    }

    return this.findOne(savedApplication.id);
  }

  findAll() {
    return this.repo.find({
      order: { fechaSolicitud: 'DESC' },
      relations: ['personal', 'uploads', 'references', 'legal'],
    });
  }

  async findOne(id: number) {
    const application = await this.repo.findOne({
      where: { id },
      relations: ['personal', 'uploads', 'references', 'legal'],
    });
    if (!application) {
      throw new NotFoundException('Solicitud no encontrada');
    }
    return application;
  }
  async remove(id: number) {
    const application = await this.findOne(id);
    return this.repo.remove(application);
  }
}
