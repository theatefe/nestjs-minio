import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MinioModule } from './application/minio/minio.module';
import { ScheduleModule } from '@nestjs/schedule';

import 'dotenv/config';
import sequilzeObj from './database/sequilze.obj';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    sequilzeObj,
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    ScheduleModule.forRoot(),
    MinioModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
