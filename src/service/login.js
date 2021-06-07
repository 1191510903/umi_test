import { urlHost } from '@/utils/common';
import request from 'umi-request';
import md5 from 'md5';

export async function accountLogin(params) {
  return request(`${urlHost}/login`, {
    method: 'POST',
    requestType: 'form',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: params,
  });
}
