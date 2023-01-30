// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
import store from '@/redux/store'

export function getappList(params) {
  return request('/dbfe/app/find_app', {
    method: 'GET',
    params,
    headers: {
      'Content-Type': 'application/json',
    }
  });
}

export function getappInfo(params: object) {
  return request('/dbfe/app/get_info', {
    method: 'GET',
    params,
    headers: {
      'Content-Type': 'application/json',
    }
  });
}

export function create(params: object) {
  return request('/dbfe/app/create', {
    method: 'GET',
    params,
    headers: {
      'Content-Type': 'application/json',
    }
  });
}

export function update(params: object) {
  return request('/dbfe/app/update', {
    method: 'GET',
    params,
    headers: {
      'Content-Type': 'application/json',
    }
  });
}
