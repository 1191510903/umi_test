import md5 from 'md5';
import fetch from 'dva/fetch';
import { router } from 'dva';

/**
 * 请求一个url，返回一个promise对象
 * @param {string} url
 * @param {object} options
 */
export default async function request(url, options) {
  const newOptions = { ...options };
  if (
    newOptions.method === 'POST' ||
    newOptions.method === 'PUT' ||
    newOptions.method === 'DELETE' ||
    newOptions.method === 'GET'
  ) {
    if (!(newOptions.body instanceof FormData)) {
      newOptions.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
        'X-Auth-Token': `${sessionStorage.getItem('token')}:wrhp:${md5(url)}`,
        ...newOptions.headers,
      };
    } else {
      newOptions.headers = {
        Accept: 'application/json',
        'X-Auth-Token': `${sessionStorage.getItem('token')}:wrhp:${md5(url)}`,
        ...newOptions.headers,
      };
    }
  }
  const response = await fetch(url, newOptions);
  const responseStatus = checkStatus(response);
  if (responseStatus === 'Unauthorized') {
    return { success: false, message: '认证失败，请重新登录' };
  }
  return await response.json();


  /**
   *  返回值判断
   * @param {object} response 
   * @returns 
   */
  function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    }
    if (response.status === 401) {
      sessionStorage.removeItem('loginId');
      sessionStorage.removeItem('userId');
      sessionStorage.removeItem('token');
      router.push('/login');
      return 'Unauthorized';
    }

    if (response.status === 403) {
      router.push('/exception/403');
      return null;
    }
    if (response.status <= 504 && response.status >= 500) {
      router.push('/exception/500');
    }
    if (response.status >= 404 && response.status < 422) {
      router.push('/exception/404');
    }

    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}
