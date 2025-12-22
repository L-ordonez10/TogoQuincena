import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ApplicationModule } from './application/application.module';
import { ApplicationEntity } from './application/entities/application.entity';
import { PersonalEntity } from './application/entities/personal.entity';
import { UploadsEntity } from './application/entities/uploads.entity';
import { ReferenceEntity } from './application/entities/reference.entity';
import { LegalEntity } from './application/entities/legal.entity';
import { FileUploadModule } from './file-upload/file-upload.module';
import { ApiKeyGuard } from './common/guards';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [
          ApplicationEntity,
          PersonalEntity,
          UploadsEntity,
          ReferenceEntity,
          LegalEntity,
        ],
        synchronize: configService.get<string>('NODE_ENV') !== 'production',
        logging: configService.get<string>('NODE_ENV') === 'development',
      }),
    }),
    ApplicationModule,
    FileUploadModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ApiKeyGuard,
    },
  ],
})
export class AppModule {}
