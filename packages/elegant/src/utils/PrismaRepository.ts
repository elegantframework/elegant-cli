/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// Use for the base repository/model sources
import _ from 'lodash';
import { PrismaClient, User } from '@prisma/client';

export const prisma = new PrismaClient();

export const models = _.omit(prisma, [
  '$on',
  '$connect',
  '$disconnect',
  '$use',
  '$executeRaw',
  '$executeRawUnsafe',
  '$queryRaw',
  '$queryRawUnsafe',
  '$transaction',
]);

export type Model = keyof typeof models;

export type ModelStructure = {
  user: User;
};

export const createRow =
  <T extends Model>(model: T) =>
    // @ts-ignore
  (data: ModelStructure[T]) =>
    // @ts-ignore
    prisma[model].create({
      data,
    });

export const findAll =
  <T extends Model>(model: T) =>
  async (conditions: any, filterQueryParams: any = {}, options: any = {}, include: any = {}) => {
    const limit = +(options.limit === 'all' ? 0 : _.get(options, 'limit', 10));
    const offset = options.page && options.page > 0 ? limit * (options.page - 1) : 0;
    const otherOptions = _.omit(options, ['limit', 'offset', 'page']);

    const where = { ...conditions, ...filterQueryParams, ...otherOptions };

    return {
      // @ts-ignore
      rows: await prisma[model].findMany({
        where,
        ...(!_.isEmpty(include) && { include }),
        skip: offset,
        ...(limit > 0 && { take: limit }),
      }),
      count: /* @ts-ignore */ (
        await prisma[model].aggregate({
          where,
          _count: true,
        })
      )._count,
    };
  };

export const findOne =
  <T extends Model>(model: T) =>
  (conditions: object | string | number, option: any = {}) => {
    const dbCond = _.isObject(conditions) ? conditions : { id: _.toNumber(conditions) };

    // @ts-ignore
    return prisma[model].findFirst({ where: dbCond, ...option });
  };

export const updateRow =
  <T extends Model>(model: T) =>

    // @ts-ignore
  (conditions: object | string | number, data: Partial<ModelStructure[T]>) => {
    const dbCond = _.isObject(conditions) ? conditions : { id: _.toNumber(conditions) };
    const dbData = _.isObject(data) ? data : { data };

    // @ts-ignore
    return prisma[model].update({ data: dbData, where: dbCond });
  };

export const deleteRow =
  <T extends Model>(model: T) =>
  (conditions: object | string | number) => {
    const dbCond = _.isObject(conditions) ? conditions : { id: _.toNumber(conditions) };

    // @ts-ignore
    return prisma[model].deleteMany({ where: dbCond });
  };

export const modelToResource = async (model: any) => model;

export const resourceToModel = async (resource: any) => resource;

const factory = <T extends Model>(model: T) => ({
  findAll: findAll(model),
  findOne: findOne(model),
  create: createRow(model),
  update: updateRow(model),
  delete: deleteRow(model),
  modelToResource,
  resourceToModel,
  models,
});

export default factory;