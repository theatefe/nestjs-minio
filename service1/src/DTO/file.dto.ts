import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import pathes from '../config/pathes';

// OBJ *******************
export function fileObj(file) {
  return {
    id: file.id,
    uid: file.uid,
    bucketName: file.bucketName,
    originalFileName: file.originalFileName,
    fileUrl: `${pathes.minioUrl}${file.filePath}`,
    createdAt: file.createdAt,
  };
}

// CLASS *******************
export class FileDto {
  @IsNotEmpty()
  @ApiProperty({ type: Number })
  id: number;

  @IsNotEmpty()
  @ApiProperty({ type: String })
  uid: string;

  @IsNotEmpty()
  @ApiProperty({ type: String })
  bucketName: string;

  @IsNotEmpty()
  @ApiProperty({ type: String })
  originalFileName: string;

  @IsNotEmpty()
  @ApiProperty({ type: String })
  fileUrl: string;
}
