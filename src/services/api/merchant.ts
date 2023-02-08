// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
import store from '@/redux/store'

export function get_info() {
  return request('/yqb/merchant/get_info', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  });
}

export function update_info(params: object) {
  return request('/yqb/merchant/update_info', {
    method: 'GET',
    params,
    headers: {
      'Content-Type': 'application/json',
    }
  });
}
