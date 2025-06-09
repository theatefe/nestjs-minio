import { Module } from '@nestjs/common';


import { MinioModule } from './application/minio/minio.module';
import sequilzeObj from './database/sequilze.obj';

@Module({
  imports: [sequilzeObj,MinioModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
