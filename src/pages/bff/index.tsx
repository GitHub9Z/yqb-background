import React, { useRef, useState, useCallback, useMemo, useEffect } from 'react';
import { Alert, Tag, Menu, Dropdown } from 'antd';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import DbSwitch from '@/components/DbSwitch';
import * as API_bff from '@/services/api/bff'
import { history } from 'umi';

import Model from './components/Model'
import { ChromeOutlined, UploadOutlined } from '@ant-design/icons';

import request from 'umi-request';

type GithubIssueItem = {
  url: string;
  id: number;
  number: number;
  title: string;
  labels: {
    name: string;
    color: string;
  }[];
  state: string;
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at?: string;
};
// 开关Dom组件渲染
const swithRender = (_: any, record: any) => {
  const isChecked = !!record?.status;
  return <DbSwitch
    key="Swicth"
    params={record}
    checkedChildren="开"
    unCheckedChildren="关"
    defaultChecked={isChecked}
  />;
}
const ProcessMap = {
  close: 'normal',
  running: 'active',
  online: 'success',
  error: 'exception',
};
const origin_columns: ProColumns<GithubIssueItem>[] = [
  {
    title: '命名空间',
    dataIndex: 'endpoint',
    ellipsis: true,
    render: (_, record) => (
      <a href={record.endpoint}>
        {record.endpoint.split('/')[2]}
      </a>
    ),
    request: async () => {
      let res = await API_bff.getEndpointList()
      return res.map(_i => ({
        value: _i,
        label: _i
      }))
    },
    width: 250
  },
  {
    title: 'URL',
    dataIndex: 'url',
    ellipsis: true,
    render: (_, record) => (
      <a href={record.url}>
        /{record.url.split('/').splice(3, 100).join('/')}
      </a>
    )
  },
  {
    title: '状态',
    dataIndex: 'deprecated',
    ellipsis: true,
    hideInSearch: true,
    width: 80,
    align: 'center',
    render: (_, record) => (
      <Tag color={record.deprecated ? '' : 'green'}>
        {record.deprecated ? '关闭' : '启用'}
      </Tag>
    )
  },
  {
    title: '访问量',
    dataIndex: 'hot',
    width: 80,
    align: 'center',
    hideInSearch: true
  },
  {
    title: '操作',
    align: 'center',
    width: 120,
    hideInSearch: true,
    render: (_, record, __, action) => [
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <a onClick={() =>{
          history.push({ pathname: `./api/requests/${record.id}` });
        }}>查看请求</a>
      </div>
    ]
  }
];

export default () => {
  const actionRef = useRef<ActionType>();


  /********* 搜索 */
  return (
    <PageContainer
    >
      <ProTable<GithubIssueItem>
        columns={origin_columns}
        actionRef={actionRef}
        request={async (params = {}, sort, filter) => {
          return request<{
            data: GithubIssueItem[];
          }>('/dbfe/api/find_api', {
            params: {
              ...params,
              current: (parseInt(params.current) - 1)
            }
          });
        }}
        editable={{
          type: 'multiple',
        }}
        columnsState={{
          persistenceKey: 'pro-table-singe-demos',
          persistenceType: 'localStorage',
        }}
        rowKey="id"
        search={{
          labelWidth: 'auto',
          span: 6,
          defaultCollapsed: false
        }}
        form={{
          // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
          syncToUrl: (values, type) => {
            if (type === 'get') {
              return {
                ...values,
                created_at: [values.startTime, values.endTime],
              };
            }
            return values;
          },
        }}
        pagination={{
          pageSize: 5,
        }}
        dateFormatter="string"
        toolBarRender={() => [
          <Model reload={() => {
            actionRef.current?.reload()
          }}/>
        ]}
      />
    </PageContainer>
  );
};