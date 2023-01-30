// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

export function findUsers(params: object) {
  return request('/yqb/user/find_users', {
    method: 'GET',
    params,
    headers: {
      'Content-Type': 'application/json',
    }
  });
}
