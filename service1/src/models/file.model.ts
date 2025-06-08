import { Column, Table, Model } from 'sequelize-typescript';
import Sequelize from 'sequelize';

@Table({
  tableName: 'files',
  paranoid: true,
  comment: 'مدل فایل ها',
  deletedAt: 'deletedAt',
})
export class File extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: Sequelize.INTEGER,
  })
  id: number;

  @Column({
    type: Sequelize.STRING,
    allowNull: false,
  })
  uid: string;

  @Column({
    type: Sequelize.STRING,
    allowNull: false,
  })
  bucketName: string;

  @Column({
    type: Sequelize.STRING,
    allowNull: false,
  })
  originalFileName: string;

  @Column({
    type: Sequelize.STRING,
    allowNull: false,
  })
  filePath: string;

  @Column({
    defaultValue: new Date(),
    allowNull: false,
    type: Sequelize.DATE,
  })
  createdAt: Date;

  @Column({
    defaultValue: new Date(),
    allowNull: false,
    type: Sequelize.DATE,
  })
  updatedAt: Date;

  @Column({
    allowNull: true,
    type: Sequelize.DATE,
  })
  deletedAt: Date;
}
