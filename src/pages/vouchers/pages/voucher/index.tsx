import React, { useRef, useState, useCallback, useMemo, useEffect } from 'react';
import { Alert, Tag, Menu, Dropdown } from 'antd';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import DbSwitch from '@/components/DbSwitch';
import * as API_voucher from '@/services/api/voucher'
import { history } from 'umi';

const origin_columns: ProColumns[] = [
  {
    title: '券码',
    dataIndex: 'id',
    width: 80,
    align: 'center',
  },
  {
    title: '适用合约',
    dataIndex: 'protocals',
    width: 80,
    align: 'center',
    render(_, record) {
      return record.protocals.length
    },
    hideInSearch: true
  },
  {
    title: '核销次数',
    render(_, record) {
      return record.task_num[1] ? <span>{record.task_num[1]}次</span> : '-'
    },
    width: 80,
    align: 'center',
    hideInSearch: true
  },
  {
    title: '核销金额',
    render(_, record) {
      return record.task_num[2] ? <span>{record.task_num[2]}元</span> : '-'
    },
    width: 80,
    align: 'center',
    hideInSearch: true
  },
  {
    title: '核销时间',
    render(_, record) {
      return record.task_num[3] ? <span>{record.task_num[3]}分钟</span> : '-'
    },
    width: 80,
    align: 'center',
    hideInSearch: true
  },
  {
    title: '核销人',
    dataIndex: 'used_user_id',
    width: 80,
    align: 'center',
    hideInSearch: true
  }
];

export default ({ match: { params: { id } } }) => {
  const actionRef = useRef<ActionType>();

  /********* 搜索 */
  return (
    <PageContainer
    >
      <ProTable
        columns={origin_columns}
        actionRef={actionRef}
        request={async (params = {}, sort, filter) => {
          return API_voucher.findVouchers({
            vouchers_id: id,
            ...params,
            current: (parseInt(params.current) - 1),
            page_size: parseInt(params.pageSize)
          }).then(res => {
            return {
              total: res.data.count,
              data: res.data.data.map(_i => ({
                ..._i,
                task_num: JSON.parse(_i.task_num)
              }))
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
      />
    </PageContainer>
  );
};