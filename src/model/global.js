import { accountLogin } from '../service/login';

export default {
  namespace: 'global',
  state: {
    acticeKey: '/fs',
  },
  effects: {
    *login({ payload, callback }, { call, put }) {
      const response = yield call(accountLogin, payload);
      if (response.restCode === '100001') {
        const user = response.token.split(':');
        sessionStorage.setItem('loginId', user[0]);
        sessionStorage.setItem('userId', user[1]);
        sessionStorage.setItem('token', response.token);
      }
      if (callback && typeof callback === 'function') {
        callback(response);
      }
    },
  },
  reducers: {},
};
