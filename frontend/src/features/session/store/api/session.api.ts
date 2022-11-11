import { Id, Pin } from 'model';

import fetch from '../../../../utils/fetch';

export const login = async (id: Id, pin: Pin | undefined) => {
  await fetch(`/auth/login`).post({
    data: {
      username: id,
      password: pin || '00000',
    },
  });
};

export const retryWithLogin = async <T>(id: Id, fun: () => Promise<T>) => {
  try {
    return await fun();
  } catch (e) {
    if (e.response.status === 401) {
      await login(id, undefined);
      return await fun();
    }
    throw e;
  }
};

export const checkSession = async (id: Id) => {
  await fetch(`/auth/check_session`).post({
    data: {
      username: id,
    },
  });
};
