// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

export function getApiList() {
  return request('/dbfe/api/find_api', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  });
}

export function getEchart() {
  return request('/dbfe/api/echart', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  });
}

export function getApiInfo(params: object) {
  return request('/dbfe/api/get_api_info', {
    method: 'GET',
    params,
    headers: {
      'Content-Type': 'application/json',
    }
  });
}

export function getEndpointList() {
  return request('/dbfe/api/find_endpoint', {
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
