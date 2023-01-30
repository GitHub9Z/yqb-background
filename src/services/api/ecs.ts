// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
import store from '@/redux/store'

export function exec({ command }) {
  return request('/dbfe/ecs/exec', {
    method: 'POST',
    data: {
      command
    }
  });
}

export function getFilesList(params: object) {
  return request('/dbfe/ecs/find_files_by_path', {
    method: 'GET',
    params,
    headers: {
      'Content-Type': 'application/json',
    }
  });
}

export function createFile(params: object) {
  return request('/dbfe/ecs/create', {
    method: 'GET',
    params,
    headers: {
      'Content-Type': 'application/json',
    }
  });
}

export function uploadFile(params: object) {
  return request('/dbfe/ecs/upload', {
    method: 'POST',
    data: params,
  });
}

export function downloadFile(params: object) {
  return request('/dbfe/ecs/download', {
    method: 'GET',
    params
  });
}

export function deleteFile(params: object) {
  return request('/dbfe/ecs/delete_files_by_path', {
    method: 'GET',
    params: {
      path: params?.path
    },
    headers: {
      'Content-Type': 'application/json',
    }
  });
}

export function readFile(params: object) {
  return request('/dbfe/ecs/read_file_by_path', {
    method: 'GET',
    params: {
      path: params?.path
    },
    headers: {
      'Content-Type': 'application/json',
    }
  });
}

export function renameFile(params: object) {
  return request('/dbfe/ecs/rename', {
    method: 'POST',
    data: params,
    headers: {
      'Content-Type': 'application/json',
    }
  });
}

export function updateFile(params: object) {
  return request('/dbfe/ecs/update', {
    method: 'POST',
    data: params,
    headers: {
      'Content-Type': 'application/json',
    }
  });
}

export function searchFile(params: object) {
  return request('/dbfe/ecs/find_files_by_keyword', {
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