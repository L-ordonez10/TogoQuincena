import { Module } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FileUploadController } from './file-upload.controller';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { diskStorage } from 'multer';
import * as path from 'path';

@Module({
  imports: [
    MulterModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        storage: diskStorage({
          destination: configService.get<string>('UPLOAD_PATH'),
          filename: (req, file, cb) => {
            const sanitizedName = path
              .basename(file.originalname)
              .replace(/[^a-zA-Z0-9.-]/g, '_');
            const filename = `${Date.now()}-${sanitizedName}`;
            cb(null, filename);
          },
        }),
        limits: {
          fileSize:
            configService.get<number>('MAX_FILE_SIZE') || 5 * 1024 * 1024,
        },
      }),
    }),
  ],
  controllers: [FileUploadController],
  providers: [FileUploadService],
})
export class FileUploadModule {}
