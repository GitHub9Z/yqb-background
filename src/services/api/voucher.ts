// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

export function findVouchers(params: object) {
  return request('/yqb/voucher/find_vouchers', {
    method: 'GET',
    params,
    headers: {
      'Content-Type': 'application/json',
    }
  });
}
