import {
  Controller,
  Post,
  Delete,
  HttpStatus,
  UseInterceptors,
  UploadedFile,
  HttpException,
  Res,
  Param,
  Get,
  Body,
  ParseIntPipe,
  HttpCode,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOkResponse,
  ApiBody,
  ApiConsumes,
  ApiOperation,
} from '@nestjs/swagger';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
// Service ************************************************
import { MinioService } from './minio.service';
// DTO ****************************************************
import { FileDto } from '../../DTO/file.dto';

@ApiTags('MinIo')
@Controller('minio')
export class MinioController {
  constructor(private readonly minioService: MinioService) {}
  // upload file *********************************************************************************
  @ApiOperation({
    summary: 'Minio آپلود فایل در',
  })
  @ApiOkResponse({
    description: 'Minio File Dto',
    type: [FileDto],
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
        bucketName: {
          type: 'string',
        },
      },
      required: ['file', 'bucketName'],
    },
  })
  @Post('/uploadFile')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('file'))
  async uploadedFiles(
    @UploadedFile() file,
    @Body('bucketName') bucketName: string,
  ): Promise<FileDto> {
    try {
      if (file) {
        const fileName = file.originalname;
        const fileBuffer = file.buffer;

        const result = await this.minioService.uploadFile(
          bucketName,
          fileName,
          fileBuffer,
        );
        return result;
      }
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: error?.message || 'خطا در آپلود فایل',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  // delete file ************************************************************************************
  @ApiOperation({
    summary: 'Minio حذف فایل در',
  })
  @ApiOkResponse({
    description: 'Minio File Dto',
    type: Boolean,
  })
  @Delete('delete/:id')
  @HttpCode(HttpStatus.OK)
  async deleteFile(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ): Promise<boolean> {
    try {
      const status = await this.minioService.deleteFile(id);
      return status;
    } catch (err) {
      throw err;
    }
  }
  // Download File  ***********************************************************************************
  @ApiOperation({
    summary: 'Minio دانلود فایل از',
  })
  @Post('/download/:id')
  @HttpCode(HttpStatus.OK)
  async downloadFile(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
    @Res() res: Response,
  ) {
    try {
      const object = await this.minioService.findFile(id);
      const stream = await this.minioService.downloadFile(id);
      // تنظیم هدرهای پاسخ
      res.set({
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': `attachment; filename="${object.originalFileName}"`,
      });
      stream.pipe(res);
    } catch (error) {
      throw new HttpException(
        `Failed to fetch file: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  // get File Info *********************************************************************************************************
  @ApiOperation({
    summary: 'Minio دریافت اطلاعات فایل از',
  })
  @ApiOkResponse({
    description: 'Minio File Dto',
    type: FileDto,
  })
  @Get('info/:id')
  @HttpCode(HttpStatus.OK)
  async getFileInfo(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number
  ):Promise<FileDto> {
    try {
      const file = await this.minioService.findFile(id);
      if (!file) {
        throw new HttpException(
          `File with UID ${id} not found`,
          HttpStatus.NOT_FOUND,
        );
      }
      return file;
    } catch (error) {
      throw new HttpException(
        `Failed to fetch file info: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
