import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationModule } from './application/application.module';
import { ApplicationEntity } from './application/entities/application.entity';
import { PersonalEntity } from './application/entities/personal.entity';
import { UploadsEntity } from './application/entities/uploads.entity';
import { ReferenceEntity } from './application/entities/reference.entity';
import { LegalEntity } from './application/entities/legal.entity';
import { FileUploadModule } from './file-upload/file-upload.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'admin',
      database: 'quincena_db',
      entities: [
        ApplicationEntity,
        PersonalEntity,
        UploadsEntity,
        ReferenceEntity,
        LegalEntity,
      ],
      synchronize: true,
    }),
    ApplicationModule,
    FileUploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
