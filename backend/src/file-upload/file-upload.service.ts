import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class FileUploadService {
  constructor(private configService: ConfigService) {}

  handleFileUpload(file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('no file uploaded');
    }

    const allowedMimeTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (!allowedMimeTypes.includes(file.mimetype)) {
      this.deleteFile(file.path);
      throw new BadRequestException('invalid file type');
    }

    const maxSize =
      this.configService.get<number>('MAX_FILE_SIZE') || 10 * 1024 * 1024;
    if (file.size > maxSize) {
      this.deleteFile(file.path);
      throw new BadRequestException('file is too large!');
    }

    // Validate filename to prevent path traversal
    const sanitizedFilename = path.basename(file.filename);
    if (sanitizedFilename !== file.filename) {
      this.deleteFile(file.path);
      throw new BadRequestException('invalid filename');
    }

    const normalizedPath = file.path.replace(/\\/g, '/');

    return {
      message: 'File uploaded successfully',
      filePath: normalizedPath,
    };
  }

  private deleteFile(filePath: string): void {
    try {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  }
}
