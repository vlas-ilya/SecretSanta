import { Id, Pin } from '../model/SessionTypes';

import fetch from '../../../../utils/fetch';

export const login = async (id: Id, pin: Pin | undefined) => {
  await fetch(`/auth/login`).post({
    data: {
      username: id,
      password: pin || '00000',
    },
  });
};

export const checkSession = async (id: Id) => {
  await fetch(`/auth/check_session`).post({
    data: {
      username: id,
    }
  });
};
