// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
import store from '@/redux/store'

export function getFilesList(params: object) {
  return request('/dbfe/cloud/find_files_by_path', {
    method: 'GET',
    params,
    headers: {
      'Content-Type': 'application/json',
    }
  });
}

export function createFile(params: object) {
  let { info = '{}' } = params
  info = JSON.parse(info)
  info.author = store.getState()?.user?.info
  params.info = JSON.stringify(info)
  return request('/dbfe/cloud/create', {
    method: 'GET',
    params,
    headers: {
      'Content-Type': 'application/json',
    }
  });
}

export function deleteFile(params: object) {
  return request('/dbfe/cloud/update', {
    method: 'GET',
    params: {
      id: params?.id,
      path: ''
    },
    headers: {
      'Content-Type': 'application/json',
    }
  });
}

export function updateFile(params: object) {
  return request('/dbfe/cloud/update', {
    method: 'POST',
    data: params,
    headers: {
      'Content-Type': 'application/json',
    }
  });
}

export function searchFile(params: object) {
  return request('/dbfe/cloud/find_files_by_keyword', {
    method: 'GET',
    params,
    headers: {
      'Content-Type': 'application/json',
    }
  });
}

export function baseGetEnv(params: object) {
  return request('http://newostestadmin.dangbei.net/newOs/base/getEnv', {
    method: 'GET',
    params
  });
}

export async function getLoginUserInfo(options?: { [key: string]: any }) {
  return request('http://newostestadmin.dangbei.net/newOs/common/getLoginUserInfo', {
    method: 'GET',
    ...(options || {}),
  });
}