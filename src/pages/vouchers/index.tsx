import React, { useRef, useState, useCallback, useMemo, useEffect } from 'react';
import { Alert, Tag, Menu, Dropdown } from 'antd';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import DbSwitch from '@/components/DbSwitch';
import * as API_vouchers from '@/services/api/vouchers'
import { history } from 'umi';

import Model from './components/Model'
import { ChromeOutlined, UploadOutlined } from '@ant-design/icons';

import request from 'umi-request';

const generate_task = (record: any) => {
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
  switch (record.task_type) {
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
    title: '批次号',
    width: 120,
    dataIndex: 'id'
  },
  {
    title: '发行量',
    dataIndex: 'sum',
    width: 120,
    align: 'center',
  },
  {
    title: '操作',
    align: 'center',
    width: 180,
    hideInSearch: true,
    render: (_, record, __, action) => [
      <a onClick={() => {
        history.push({ pathname: `./vouchers/voucher/${record.id}` });
      }} style={{ marginRight: '12px' }}>券码列表</a>,
      <a onClick={() => {

      }} style={{ marginRight: '12px' }}>删除</a>
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
          return API_vouchers.findVouchers({
            ...params,
            current: (parseInt(params.current) - 1),
            page_size: parseInt(params.pageSize)
          }).then(res => {
            return {
              total: res.data.count,
              data: res.data.data
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
        pagination={{
          pageSize: 5,
        }}
        dateFormatter="string"
        toolBarRender={() => [
          <Model reload={() => {
            actionRef.current?.reload()
          }} />
        ]}
      />
    </PageContainer>
  );
};