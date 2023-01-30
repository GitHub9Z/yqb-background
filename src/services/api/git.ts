// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

export function getProjectList() {
  return request('/dbfe/git/find_project', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  });
}

export function getBranchListByProject(project: string | null) {
  return request('/dbfe/git/find_branch_by_project', {
    method: 'GET',
    params: {
      project
    },
    headers: {
      'Content-Type': 'application/json',
    }
  });
}

export function getAuthorListByProject(project: string | null) {
  return request('/dbfe/git/find_author_by_project', {
    method: 'GET',
    params: {
      project
    },
    headers: {
      'Content-Type': 'application/json',
    }
  });
}

export function getCommitList(params: object) {
  return request('/dbfe/git/find_commit_by_keyword', {
    method: 'GET',
    params,
    headers: {
      'Content-Type': 'application/json',
    }
  });
}

export function commit(params: object) {
  return request('/dbfe/git/create', {
    method: 'GET',
    params,
    headers: {
      'Content-Type': 'application/json',
    }
  });
}
