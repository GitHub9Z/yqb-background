import React, { useRef, useState, useCallback, useMemo, useEffect } from 'react';
import { Alert, Tag, Menu, Dropdown } from 'antd';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import DbSwitch from '@/components/DbSwitch';
import * as API_protocal from '@/services/api/protocal'
import { history } from 'umi';

import Model from './components/Model'
import { ChromeOutlined, UploadOutlined } from '@ant-design/icons';

import request from 'umi-request';

const generate_task = (record: any)=> {
  const generate_date = (time: number) => {
    if (!(time % 365)) {
      return (time / 365 + '年')
    }
    if (!(time % 30)) {
      return (time / 30 + '月')
    }
    if (!(time % 7)) {
      return (time / 7 + '周')
    }
    return time + '天'
  }
  const generate_time = (time: number) => {
    let res: string = ''
    // 转换为式分秒
    let h = time / 60 / 60 % 24
    if (h) {
      res += (h + '小时')
    }
    let m = time / 60 % 60
    if (m) {
      res += (m + '分钟')
    }
    let s = time % 60
    if (s) {
      res += (s + '秒')
    }
    // 作为返回值返回
    return res
}
  switch(record.task_type) {
    case 1: {
      return `消费${record.task_num}次 / ${generate_date(record.time)}`
      break
    }
    case 2: {
      return `消费${record.task_num}元 / ${generate_date(record.time)}`
      break
    }
    case 3: {
      return `消费${generate_time(record.task_num)} / ${generate_date(record.time)}`
      break
    }
  }
  
}
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
    title: '合约号',
    dataIndex: 'id',
    width: 80,
    align: 'center',
  },
  {
    title: '名称',
    dataIndex: 'title',
    width: 280,
    align: 'center',
  },
  {
    title: '签约期数',
    dataIndex: 'sum',
    width: 80,
    align: 'center',
    render: (_, record) => (
      <span>{record.sum}期</span>
    ),
    hideInSearch: true
  },
  {
    title: '每期指标',
    render: (_, record) => (
      <span>{generate_task(record)}</span>
    ),
    width: 120,
    align: 'center',
    hideInSearch: true
  },
  {
    title: '金额',
    dataIndex: 'bonus',
    width: 80,
    align: 'center',
    render: (_, record) => (
      <span>{record.sum}元</span>
    ),
    hideInSearch: true
  },
  {
    title: '操作',
    align: 'center',
    width: 180,
    hideInSearch: true,
    render: (_, record, __, action) => [
        <a onClick={() => {
          history.push({ pathname: `./protocal/promise/${record.id}` });
        }} style={{marginRight: '12px'}}>签约列表</a>,
        <a href={record.url}>下架</a>
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
          return API_protocal.findProtocals({
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