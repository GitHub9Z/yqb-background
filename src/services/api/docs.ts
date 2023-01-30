// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

export function getDocsList() {
  return request('/dbfe/docs/find_docs', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  });
}

export function getTagsList() {
  return request('/dbfe/docs/find_tags', {
    method: 'GET',
    params: {
    },
    headers: {
      'Content-Type': 'application/json',
    }
  });
}

export function create(params: object) {
  return request('/dbfe/docs/create', {
    method: 'GET',
    params,
    headers: {
      'Content-Type': 'application/json',
    }
  });
}

export function update(params: object) {
  return request('/dbfe/docs/update', {
    method: 'GET',
    params,
    headers: {
      'Content-Type': 'application/json',
    }
  });
}
