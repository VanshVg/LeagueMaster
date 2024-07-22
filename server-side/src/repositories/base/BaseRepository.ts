import { type PrismaClient } from "@prisma/client/extension";

const DEFAULT_ORDER_BY = {
  created_at: "desc",
};

export default abstract class BaseRepository<T> {
  constructor(protected modelClient: PrismaClient) {}

  create(item: Record<string, any> = {}): Promise<T> {
    return this.modelClient.create({ data: item });
  }

  createMany(item: Record<string, any>[] = [{}]): Promise<{ count: number }> {
    return this.modelClient.createMany({ data: item });
  }

  getAll(conditions: Record<string, any> = {}, options: Record<string, any> = {}): Promise<T[]> {
    if (!options.orderBy) {
      options.orderBy = DEFAULT_ORDER_BY;
    }
    return this.modelClient.findMany({ where: conditions }, options);
  }

  getOne(condition: Record<string, any> = {}): Promise<T | null> {
    return this.modelClient.findUnique({
      where: condition,
    });
  }

  async getFirst(condition: Record<string, any> = {}): Promise<T | null> {
    return await this.modelClient.findFirst({ where: condition });
  }

  async updateById(id: number, item: Record<string, any> = {}) {
    return await this.modelClient.update({ where: { id }, data: item });
  }

  deleteById(id: number): Promise<T> {
    return this.modelClient.update({ where: { id }, data: { deleted_at: new Date() } });
  }
}
