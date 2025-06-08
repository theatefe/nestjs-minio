import * as Models from '../models/index';

export class FileDataAcceess {
  async findOne(uid) {
    const File = await Models.File.findOne({
      where: {
        uid,
      },
    });
    return File;
  }
  async findById(id) {
    return await Models.File.findByPk(id);
  }
  async create(
    uid: string,
    bucketName: string,
    originalFileName: string,
    filePath: string,
  ) {
    const file = await Models.File.create({
      uid,
      bucketName,
      originalFileName,
      filePath,
    });
    return file;
  }
  async deleteFile(id) {
    await Models.File.destroy({
      where: { id },
    });
  }
}
