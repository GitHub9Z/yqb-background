// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
import store from '@/redux/store'

export function create(params: object) {
  return request('/yqb/vouchers/create', {
    method: 'POST',
    params,
    headers: {
      'Content-Type': 'application/json',
    }
  });
}

export function update(params: object) {
  return request('/yqb/protocal/update', {
    method: 'GET',
    params,
    headers: {
      'Content-Type': 'application/json',
    }
  });
}

export function findVouchers(params: object) {
  return request('/yqb/vouchers/find_vouchers', {
    method: 'GET',
    params,
    headers: {
      'Content-Type': 'application/json',
    }
  });
}
