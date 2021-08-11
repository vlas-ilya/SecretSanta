import { Connection } from 'typeorm';

const transactions = [];
let isRun = false;

const runNext = async () => {
  if (!isRun) {
    const _runner = transactions.shift();
    if (_runner) {
      isRun = true;
      await _runner();
      isRun = false;
      await runNext();
    }
  }
};

const transaction =
  (connection: Connection) =>
  async <T>(runner: Promise<T>): Promise<T> =>
    new Promise<T>((resolve, reject) => {
      transactions.push(async () => {
        const queryRunner = connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
          const result: T = await runner;
          await queryRunner.commitTransaction();
          resolve(result);
        } catch (err) {
          await queryRunner.rollbackTransaction();
          reject(err);
        } finally {
          await queryRunner.release();
        }
      });
      runNext();
    });

export const wrapAllMethodsInTransaction = <T>(connection: Connection, service: T): T => {
  const object = {};
  const t = transaction(connection);
  // @ts-ignore
  for (let method of Object.getOwnPropertyNames(service.__proto__)) {
    if (method === 'constructor') {
      object[method] = service[method];
      continue;
    }
    object[method] = async (...args: any) => {
      return await t(service[method](...args));
    };
  }

  return object as T;
};
