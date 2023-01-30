import React, { useRef, useState, useCallback, useMemo, useEffect } from 'react';
import { Alert, Tag, Menu, Dropdown } from 'antd';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import DbSwitch from '@/components/DbSwitch';
import * as API_user from '@/services/api/user'
import { history } from 'umi';

import Model from './components/Model'
import { ChromeOutlined, UploadOutlined } from '@ant-design/icons';

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

const origin_columns: ProColumns[] = [
  {
    title: '用户id',
    dataIndex: 'id',
    width: 80,
    align: 'center',
  },
  {
    title: '联系方式',
    dataIndex: 'title',
    width: 280,
    align: 'center',
  },
  {
    title: '信用分',
    dataIndex: 'sum',
    width: 80,
    align: 'center',
    render: (_, record) => (
      <span>{record.sum}期</span>
    ),
    hideInSearch: true
  },
  {
    title: '合约期数',
    render: (_, record) => (
      <span></span>
    ),
    width: 120,
    align: 'center',
    hideInSearch: true
  },
  {
    title: '合约进度',
    render: (_, record) => (
      <span></span>
    ),
    width: 120,
    align: 'center',
    hideInSearch: true
  },
  {
    title: '总收益',
    render: (_, record) => (
      <span></span>
    ),
    width: 120,
    align: 'center',
    hideInSearch: true
  },
];

export default () => {
  const actionRef = useRef<ActionType>();


  /********* 搜索 */
  return (
    <PageContainer
    >
      <ProTable
        columns={origin_columns}
        actionRef={actionRef}
        request={async (params = {}, sort, filter) => {
          return API_user.findUsers({
            params: {
              ...params,
              current: (parseInt(params.current) - 1)
            }
          }).then(res => res.data);
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