import React, { useRef, useState, useCallback, useMemo, useEffect } from 'react';
import { Alert, Tag, Menu, Dropdown } from 'antd';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import DbSwitch from '@/components/DbSwitch';
import * as API_docs from '@/services/api/docs'

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
    title: '难度',
    dataIndex: 'dif',
    width: 80,
    hideInSearch: true,
    render: (_, record) => {
      let opt = [{
        color: 'green',
        label: '简单',
        value: 1
      }, {
        color: 'blue',
        label: '一般',
        value: 2
      }, {
        color: 'red',
        label: '困难',
        value: 3
      }, {
        color: 'black',
        label: '极难',
        value: 4
      }].find(_i => _i.value === record.dif)
      if (!opt) return null
      return (
        <Tag color={opt.color} key={record.dif}>
          {opt.label}
        </Tag>
      )
    }
  },
  {
    title: '标签',
    dataIndex: 'tag',
    ellipsis: true,
    width: 80,
    request: async () => {
      let res = await API_docs.getTagsList()
      return res.data.map(_i => ({
        value: _i,
        label: _i
      }))
    },
    render: (_, record) => (
      <Tag key={record.tag}>
        {record.tag}
      </Tag>
    )
  },
  {
    title: '题干',
    dataIndex: 'title',
    ellipsis: true,
    render: (_, record) => (
      <Alert
        style={{ whiteSpace: 'pre', height: '100px', overflowY: 'auto' }}
        description={record.title}
        type="info"
      />
    )
  },
  {
    title: '题解',
    dataIndex: 'answer',
    ellipsis: true,
    hideInSearch: true,
    render: (_, record) => (
      <Alert
        style={{ whiteSpace: 'pre', height: '100px', overflowY: 'auto' }}
        description={record.answer}
        type="info"
      />
    )
  },
  {
    title: '操作',
    align: 'center',
    width: 120,
    hideInSearch: true,
    render: (_, record, __, action) => [
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <a href={record.url}>参考链接</a>
        <Model init={record} reload={action.reload} />
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
          }>('/dbfe/docs/find_docs', {
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