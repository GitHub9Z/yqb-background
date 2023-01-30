import React, { useRef, useState, useCallback, useMemo, useEffect } from 'react';
import { Popover, Tag, Drawer, Input, Row, Col, Card, Statistic } from 'antd';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import DbSwitch from '@/components/DbSwitch';
import * as API_docs from '@/services/api/bff'
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';

import { ChromeOutlined, UploadOutlined } from '@ant-design/icons';

import request from 'umi-request';

// id: String,
// api_id: String,
// url: String,
// request: Object,
// response: Object,
// status: Number,

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

// id: String,
// api_id: String,
// url: String,
// request: Object,
// response: Object,
// status: Number,



export default ({ match }) => {
  const { id } = match?.params
  const actionRef = useRef<ActionType>();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [drawer, setDrawer] = useState(undefined);
  const [info, setInfo] = useState(null);
  const origin_columns: ProColumns<GithubIssueItem>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      ellipsis: true,
      width: 250
    },
    {
      title: 'URL',
      dataIndex: 'url',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: 'Method',
      dataIndex: 'method',
      ellipsis: true,
      hideInSearch: true,
      width: 80,
      align: 'center',
      render: (_, record) => (<b>{record.method}</b>)
    },
    {
      title: '状态码',
      dataIndex: 'status',
      ellipsis: true,
      hideInSearch: true,
      width: 80,
      align: 'center',
      render: (_, record) => {
        const color_enum = {
          2: 'green',
          3: 'blue',
          4: 'gray',
          5: 'red'
        }
        return (
          <Tag color={color_enum[Math.round(record.status / 100)]}>
            {record.status}
          </Tag>
        )
      }
    },
    {
      title: '请求报文',
      dataIndex: 'request',
      ellipsis: true,
      hideInSearch: true,
      width: 80,
      align: 'center',
      render: (_, record) => (
        record?.request ? <Popover content={JSON.stringify(record.request)} title="请求报文">
          <Tag color="blue">
            查看
          </Tag>
        </Popover> : '-'
      )
    },
    {
      title: '响应报文',
      dataIndex: 'response',
      width: 80,
      align: 'center',
      hideInSearch: true,
      render: (_, record) => (
        <Tag color="blue" style={{
          cursor: 'pointer'
        }} onClick={() => {
          setDrawer({
            data: JSON.stringify(record.response),
            title: '响应报文'
          })
          setDrawerVisible(true)
        }}>
          查看
        </Tag>
      )
    },
    {
      title: '响应时间',
      dataIndex: 'speed',
      width: 80,
      align: 'center',
      hideInSearch: true,
      render: (_, record) => (
        <Tag color="gray">
          {record.speed}ms
        </Tag>
      )
    }
  ];

  useEffect(() => {
    (async () => {
      let res = await API_docs.getApiInfo({
        id
      })
      setInfo(res)
    })()
  }, [id])
  /********* 搜索 */
  return (
    <PageContainer
      content={[
        info ? <div className="site-statistic-demo-card">
          <Row gutter={16}>
            <Col span={6}>
              <Card>
                <Statistic
                  title="总访问量"
                  value={info.all_total}
                  valueStyle={{ color: '#3f8600' }}
                  // prefix={<ArrowUpOutlined />}
                  suffix="次"
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="24小时访问量"
                  value={info.day_total}
                  valueStyle={{ color: '#3f8600' }}
                  // prefix={<ArrowUpOutlined />}
                  suffix="次"
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="平均响应速度"
                  value={info.speed}
                  precision={2}
                  valueStyle={{ color: '#3f8600' }}
                  // prefix={<ArrowDownOutlined />}
                  suffix="ms"
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="报错率"
                  value={info.fail_rate}
                  precision={2}
                  valueStyle={{ color: '#cf1322' }}
                  // prefix={<ArrowDownOutlined />}
                  suffix="%"
                />
              </Card>
            </Col>
          </Row>
        </div> : undefined
      ]}
    >
      <ProTable<GithubIssueItem>
        columns={origin_columns}
        actionRef={actionRef}
        request={async (params = {}, sort, filter) => {
          return request<{
            data: GithubIssueItem[];
          }>('/dbfe/request/find_request', {
            params: {
              ...params,
              api_id: id,
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
      />
      <Drawer title={drawer?.title} placement="bottom" height={'100%'} onClose={() => setDrawerVisible(false)} visible={drawerVisible}>
        <div style={{
          display: 'flex',
          height: '100%'
        }}>
          <div style={{ flex: '1', display: 'flex', flexDirection: 'column' }}>
            <Input.TextArea style={{ flex: '1', background: '#EBEEF5', marginBottom: '20px' }} rows={4} value={drawer?.data} onChange={({ target: { value } }) => {
              setDrawer({
                data: value,
                path: drawer?.path,
                title: drawer?.title
              })
            }} />
          </div>
        </div>
      </Drawer>
    </PageContainer>
  );
};