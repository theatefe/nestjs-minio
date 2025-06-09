import { Injectable, Inject } from '@nestjs/common';
import { Client } from 'minio';
import { v4 as uuidv4 } from 'uuid';
// DataAccess ****************************************************
import { FileDataAcceess } from '../../dataAccess/file.dataAccess';
// Dto ***********************************************************
import { FileDto, fileObj } from './../../DTO/file.dto';

@Injectable()
export class MinioService {
  constructor(
    @Inject('MINIO_CLIENT') private readonly minioClient: Client,
    private readonly fileDataAcceess: FileDataAcceess,
  ) {}
  // upload file  **************************************************
  async uploadFile(
    bucketName: string,
    fileName: string,
    file: Buffer,
  ): Promise<FileDto> {
    // check bucket
    const existBucket = await this.minioClient.bucketExists(bucketName);
    if (!existBucket) {
      // create bucket
      await this.minioClient.makeBucket(bucketName, 'us-east-1');
    }
    // create uid
    const uid = uuidv4();
    // create objectName
    const objectName = `${uid}-${fileName}`;
    // put object in minio
    await this.minioClient.putObject(bucketName, objectName, file);
    const filePath = `/${bucketName}/${fileName}`;
    const fileObjectData = await this.fileDataAcceess.create(
      uid,
      bucketName,
      fileName,
      filePath,
    );
    return fileObj(fileObjectData);
  }
  // delete file ***************************************************
  async deleteFile(id: number): Promise<boolean> {
    // check file
    const file = await this.fileDataAcceess.findById(id);
    if (file) {
      try {
        const objectName = `${file.uid}-${file.originalFileName}`;
        // remove file with object name im minio
        await this.minioClient.removeObject(file.bucketName, objectName);
        // remove file with id in db
        await this.fileDataAcceess.deleteFile(id);
        return true;
      } catch (err) {
        console.error(err);
        return false;
      }
    }
    return false;
  }
  // download file  **************************************************
  async downloadFile(id: number): Promise<NodeJS.ReadableStream> {
    try {
      // check file
      const file = await this.fileDataAcceess.findById(id);
      const objectName = `${file.uid}-${file.originalFileName}`;
      // get file object in minio
      const result = await this.minioClient.getObject(
        file.bucketName,
        objectName,
      );
      return result;
    } catch (error) {
      throw new Error(
        `Failed to fetch object stream from MinIO: ${error.message}`,
      );
    }
  }
  // find File ***********************************************************
  async findFile(id: number) {
    try {
      // check file
      const file = await this.fileDataAcceess.findById(id);
      // objectName
      const objectName = `${file.uid}-${file.originalFileName}`;
      // get object in minio
      //const object = this.minioClient.getObject(file.bucketName, objectName);
      return fileObj(file);
    } catch (error) {
      throw new Error(`Failed to fetch file: ${error.message}`);
    }
  }
}
