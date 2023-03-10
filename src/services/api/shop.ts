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

export function create(params: object) {
  return request('/yqb/shop/create', {
    method: 'GET',
    params,
    headers: {
      'Content-Type': 'application/json',
    }
  });
}

export function update(params: object) {
  return request('/yqb/shop/update', {
    method: 'GET',
    params,
    headers: {
      'Content-Type': 'application/json',
    }
  });
}