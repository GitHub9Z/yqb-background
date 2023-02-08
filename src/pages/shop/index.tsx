import React, { useRef, useState, useCallback, useMemo, useEffect } from 'react';
import { Alert, Tag, Menu, Dropdown } from 'antd';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import DbSwitch from '@/components/DbSwitch';
import * as API_shop from '@/services/api/shop'
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
    title: '门店号',
    dataIndex: 'id',
    width: 80,
    align: 'center',
  },
  {
    title: '联系方式',
    dataIndex: 'phone',
    width: 80,
    align: 'center',
  },
  {
    title: '门店名称',
    dataIndex: 'title',
    width: 80,
    align: 'center',
    hideInSearch: true
  },
  {
    title: '经纬度',
    width: 280,
    render: (_, record) => (
      <span>{record.longitude}, {record.latitude}</span>
    ),
    align: 'center',
    hideInSearch: true
  },
  {
    title: '操作',
    align: 'center',
    width: 180,
    hideInSearch: true,
    render: (_, record, __, action) => [
      <Model reload={() => {
        action?.reload()
      }} init={record}/>,
        <a href={record.url} style={{ marginLeft: '10px' }}>删除</a>
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
          return API_shop.findShops({
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