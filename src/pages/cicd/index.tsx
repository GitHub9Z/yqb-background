import React, { useRef, useState, useCallback, useMemo, useEffect } from 'react';
import { Button, Tag, Menu, Dropdown } from 'antd';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import DbSwitch from '@/components/DbSwitch';
import * as API_git from '@/services/api/git'

import UploadDialog from './components/UploadDialog'
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
    title: '索引',
    dataIndex: 'commit',
    width: 100,
    hideInSearch: true,
    renderFormItem: (_, { defaultRender }) => {
      return defaultRender(_);
    },
    render: (_, record) => (
      <Tag color="blue" key={record.commit}>
        {record.commit?.slice(0, 8)}
      </Tag>
    ),
  },
  {
    title: '描述',
    dataIndex: 'subject',
    ellipsis: true,
    width: 200,
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
  },
  {
    title: '提交者',
    dataIndex: 'author',
    ellipsis: true,
    valueEnum: {
    },
    render: (_, record) => (
      record.author === '手动提交' ? 
      <Tag color="green" key={record.commit}>
        手动提交
      </Tag> : record.author
    ),
  },
  {
    title: '提交时间',
    dataIndex: 'create_time',
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: '部署进度',
    dataIndex: 'progress',
    width: 200,
    hideInSearch: true,
    valueType: (item) => ({
      type: 'progress',
      status: item.progress >= 100 ? 'success' : 'normal',
    }),
  }
];

export default () => {
  const actionRef = useRef<ActionType>();

  /********* project切换 */
  function handleMenuClick({ key }) {
    setCP(key)
  }
  function handleButtonClick(e) {
    console.log('click', e);
  }
  const [project_list, setPL] = useState([])
  const [current_project, setCP] = useState(null)
  useEffect(() => {
    (async () => {
      let res = await API_git.getProjectList()
      res = res.filter(_i => _i)
      setCP(res[0] || null)
      setPL(res)
    })()
  }, [])
  const menu = useMemo(() => {
    return (
      <Menu onClick={handleMenuClick}>
        {project_list.map(_i => {
          return <Menu.Item key={_i}>
            {_i}
          </Menu.Item>
        })}
      </Menu>
    )
  }, [project_list])

  /********* author切换 */
  const [author_list, setAL] = useState([])
  useEffect(() => {
    (async () => {
      let res = await API_git.getAuthorListByProject(current_project)
      setAL(res)
    })()
  }, [current_project])
  let modified_columns = useMemo(() => {
    let _o = {}
    author_list.forEach(_i => {
      _o[_i] = { text: _i }
    })
    origin_columns[2].valueEnum = _o
    return [
      ...origin_columns,
      {
        title: '操作',
        key: 'option',
        width: 120,
        valueType: 'option',
        render: (_, record) => record.progress >= 100 ? [<a key="1" href={'http://' + current_project + '.' + record.commit + '.imgker.com'}>访问</a>] : []
      }
    ]
  }, [author_list])


  /********* tab切换 */
  const [tab_list, setTL] = useState([])
  const [current_tab, setCT] = useState(null)
  useEffect(() => {
    (async () => {
      let res = await API_git.getBranchListByProject(current_project)
      setCT(res[0] || null)
      setTL(res.map(_i => ({
        tab: _i,
        key: _i,
      })))
    })()
  }, [current_project])
  const handleTabChange = useCallback((e) => {
    setCT(e)
    actionRef.current?.reload()
  }, [])

  /********* 数据更新 */
  useEffect(() => {
    // console.log('知道你变了', current_tab, actionRef.current)
    window._s && clearTimeout(window._s)
    window._s = setTimeout(() => {
      actionRef.current?.reload()
    }, 50)
  }, [current_project, current_tab])

  /********* 搜索 */
  return (
    <PageContainer
      tabList={tab_list}
      tabActiveKey={current_tab}
      content={[
        <Dropdown.Button href={current_project && current_tab ? 'http://' + current_project + '.' + current_tab + '.imgker.com' : 'Loading...'} overlay={menu}>
          <ChromeOutlined />{current_project && current_tab ? 'http://' + current_project + '.' + current_tab + '.imgker.com' : 'Loading...'}
        </Dropdown.Button>,
        <UploadDialog reload={actionRef.current?.reload} project={current_project} branch={current_tab}/>
      ]}
      onTabChange={handleTabChange}
    >
      <ProTable<GithubIssueItem>
        columns={modified_columns}
        actionRef={actionRef}
        request={async (params = {}, sort, filter) => {
          if (!current_project || !current_tab) {
            return null
          }
          let _p = {
            project: current_project,
            branch: current_tab,
            author: params.author || undefined,
            subject: params.subject || undefined,
            pageNo: ((params.current || 1) - 1),
            pageSize: params.pageSize
          }
          return request<{
            data: GithubIssueItem[];
          }>('http://www.imgker.com/dbfe/git/find_commit_by_keyword', {
            params: _p,
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
        headerTitle="分支树"
      />
    </PageContainer>
  );
};