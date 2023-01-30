// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

export function SMS(params: object) {
  return request('/yqb/merchant/SMS', {
    method: 'POST',
    params,
    headers: {
      'Content-Type': 'application/json',
    }
  });
}

export function LOGIN(params: object) {
  return request('/yqb/merchant/LOGIN', {
    method: 'POST',
    params,
    headers: {
      'Content-Type': 'application/json',
    }
  });
}
