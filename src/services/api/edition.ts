// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

export function getEditionList(params: object) {
  return request('/dbfe/edition/find_edition', {
    method: 'GET',
    params,
    headers: {
      'Content-Type': 'application/json',
    }
  });
}


export function create(params: object) {
  return request('/dbfe/edition/create', {
    method: 'GET',
    params,
    headers: {
      'Content-Type': 'application/json',
    }
  });
}
