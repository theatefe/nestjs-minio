import { SequelizeModule } from '@nestjs/sequelize';
import * as Models from '../models';
import { Op } from 'sequelize';

import * as dbConfig from '../config/dbConfig.json';
//const env = process.env.NODE_ENV.toLowerCase();
const env = 'test'.toLowerCase();

const allModels = [];
Object.keys(Models).forEach((model) => {
  allModels.push(Models[model]);
});
export default SequelizeModule.forRoot({
  dialect: dbConfig[env].dialect,
  host: dbConfig[env].host,
  port: dbConfig[env].port,
  username: dbConfig[env].username,
  password: dbConfig[env].password,
  database: dbConfig[env].database,
  models: allModels,
  autoLoadModels: true,
  synchronize: true,
  logging: false,
  operatorsAliases: {
    $eq: Op.eq,
    $ne: Op.ne,
    $gte: Op.gte,
    $gt: Op.gt,
    $lte: Op.lte,
    $lt: Op.lt,
    $not: Op.not,
    $in: Op.in,
    $notIn: Op.notIn,
    $is: Op.is,
    $like: Op.like,
    $notLike: Op.notLike,
    $iLike: Op.iLike,
    $notILike: Op.notILike,
    $regexp: Op.regexp,
    $notRegexp: Op.notRegexp,
    $iRegexp: Op.iRegexp,
    $notIRegexp: Op.notIRegexp,
    $between: Op.between,
    $notBetween: Op.notBetween,
    $overlap: Op.overlap,
    $contains: Op.contains,
    $contained: Op.contained,
    $adjacent: Op.adjacent,
    $strictLeft: Op.strictLeft,
    $strictRight: Op.strictRight,
    $noExtendRight: Op.noExtendRight,
    $noExtendLeft: Op.noExtendLeft,
    $and: Op.and,
    $or: Op.or,
    $any: Op.any,
    $all: Op.all,
    $values: Op.values,
    $col: Op.col,
  },
});
