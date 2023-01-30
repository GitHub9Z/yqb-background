import React, { useRef, useState, useCallback, useMemo, useEffect } from 'react';
import { Alert, Tag, Menu, Dropdown } from 'antd';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import DbSwitch from '@/components/DbSwitch';
import * as API_edition from '@/services/api/edition'
import * as API_app from '@/services/api/app'

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
    title: '版本号',
    dataIndex: 'code',
    ellipsis: true,
    align: 'center',
    width: 80,
    // render: (_, record) => (
    //   <Tag key={record.code}>
    //     {record.code}
    //   </Tag>
    // )
  },
  {
    title: '更新内容',
    dataIndex: 'intro',
    align: 'center',
    ellipsis: true,
    // render: (_, record) => (
    //   <Alert
    //     style={{ whiteSpace: 'pre', height: '100px', overflowY: 'auto' }}
    //     description={record.intro}
    //     type="info"
    //   />
    // )
  },
  {
    title: '操作',
    align: 'center',
    width: 120,
    hideInSearch: true,
    render: (_, record, __, action) => [
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <a href={record.url}>下载</a>
      </div>
    ]
  }
];

export default ({ match }) => {
  const actionRef = useRef<ActionType>();
  const { id } = JSON.parse(atob(match?.params?.id))


  const [app, setApp] = useState(undefined)
  useEffect(async () => {
    let { data } = await API_app.getappInfo({
      id
    })
    setApp(data)
  }, [id])
  /********* 搜索 */
  return (
    <PageContainer
    >
      <ProTable<GithubIssueItem>
        columns={origin_columns}
        actionRef={actionRef}
        request={async (params = {}, sort, filter) => {
          return API_edition.getEditionList({
            ...params,
            app: id,
            current: (parseInt(params.current) - 1)
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
        search={false}
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
          app ? <Model app={app} reload={() => {
            actionRef.current?.reload()
          }}/> : undefined
        ]}
      />
    </PageContainer>
  );
};