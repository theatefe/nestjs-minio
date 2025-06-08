import { Module } from '@nestjs/common';
import { MinioController } from './minio.controller';
import { MinioService } from './minio.service';
import { FileDataAcceess } from '../../dataAccess/file.dataAccess';
import { Client } from 'minio';

const minioProvider = {
  provide: 'MINIO_CLIENT',
  useFactory: () => {
    return new Client({
      endPoint: 'localhost',
      port: 9000,
      useSSL: false,
      accessKey: 'admin',
      secretKey: 'raSP5oIYei!ZPf',
    });
  },
};

@Module({
  controllers: [MinioController],
  providers: [MinioService, minioProvider, FileDataAcceess],
  exports: [MinioService],
})
export class MinioModule {}
