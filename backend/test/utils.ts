import * as request from 'supertest';

export const login = async (
  app: any,
  id: string,
  password: string = '00000',
): Promise<string> => {
  const loginRes = await request(app.getHttpServer()).post(`/auth/login`).send({
    username: id,
    password: password,
  });

  return loginRes.header['set-cookie']
    ?.filter((cookie) => cookie.startsWith('auth-cookie'))[0]
    ?.split(';')?.[0]
    .split('auth-cookie=')?.[1];
};
