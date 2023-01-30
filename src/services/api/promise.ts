// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

export function findPromises(params: object) {
  return request('/yqb/promise/find_promises', {
    method: 'GET',
    params,
    headers: {
      'Content-Type': 'application/json',
    }
  });
}
