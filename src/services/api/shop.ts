// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

export function findShops(params: object) {
  return request('/yqb/shop/find_shops', {
    method: 'GET',
    params,
    headers: {
      'Content-Type': 'application/json',
    }
  });
}
