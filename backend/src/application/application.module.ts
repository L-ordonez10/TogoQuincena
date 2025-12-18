import { Module } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { ApplicationController } from './application.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationEntity } from './entities/application.entity';
import { PersonalEntity } from './entities/personal.entity';
import { UploadsEntity } from './entities/uploads.entity';
import { ReferenceEntity } from './entities/reference.entity';
import { LegalEntity } from './entities/legal.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ApplicationEntity,
      PersonalEntity,
      UploadsEntity,
      ReferenceEntity,
      LegalEntity,
    ]),
  ],
  controllers: [ApplicationController],
  providers: [ApplicationService],
})
export class ApplicationModule {}
