import React, { useRef, useState, useCallback, useMemo, useEffect } from 'react';
import { CloseOutlined, PauseCircleFilled, BackwardOutlined, PlayCircleFilled, ForwardOutlined } from '@ant-design/icons';
import { Progress, Button, Avatar, Breadcrumb, Input, Popconfirm, Upload, Image, Drawer, AutoComplete, Card } from 'antd';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { ProCard, ProForm, ProFormDependency, ProFormSelect, ProFormText, ProFormTextArea, ProFormUploadButton } from '@ant-design/pro-components';
import { message } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import DbSwitch from '@/components/DbSwitch';
import Field from '@ant-design/pro-field';
import * as API_cloud from '@/services/api/cloud'
import { LinkOutlined } from '@ant-design/icons';
import Style from './index.less';
import OSS from 'ali-oss'
import store from '@/redux/store'

export default () => {
  const [currentFile, setCurrentFile] = useState(undefined);
  const [picVisible, setPicVisible] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [drawer, setDrawer] = useState(undefined);
  const [preview, setPreview] = useState(undefined);
  const [audio, setAudio] = useState(undefined)
  const [path, setP] = useState(['首页'])
  const [files, setF] = useState([
  ])

  return (
    <PageContainer
    >
      <ProCard>
        <ProForm
          onFinish={async (values) => {
            console.log(values);
            message.success('提交成功');
          }}
          initialValues={{
            name: '蚂蚁设计有限公司',
            name2: '蚂蚁设计集团',
            useMode: 'chapter',
          }}
        >
          <ProFormUploadButton
            width="md"
            name="header"
            label="商户品牌Logo"
            tooltip="最长为 16 字"
            placeholder="请输入名称"
          />
          <ProFormText
            width="md"
            name="name"
            label="商户品牌名称"
            tooltip="最长为 16 字"
            placeholder="请输入名称"
          />
          <ProFormTextArea
            width="md"
            name={['name2', 'text']}
            label="商户简介"
            tooltip="最长为 128 字"
            placeholder="请输入名称"
          />
          {/*  ProFormDependency 会自动注入并且 进行 shouldUpdate 的比对  */}
          <ProFormDependency name={['name', ['name2', 'text']]}>
            {({ name, name2 }) => {
              return (
                <ProFormSelect
                  options={[
                    {
                      value: 'chapter',
                      label: '盖章后生效',
                    },
                  ]}
                  width="md"
                  name="useMode"
                  label={`与《${name || ''}》 与 《${name2?.text || ''}》合同约定生效方式`}
                />
              );
            }}
          </ProFormDependency>
          {/* noStyle shouldUpdate 是必选的，写了 name 就会失效 */}
          <ProForm.Item noStyle shouldUpdate>
            {(form) => {
              return (
                <ProFormSelect
                  options={[
                    {
                      value: 'chapter',
                      label: '盖章后生效',
                    },
                  ]}
                  width="md"
                  name="useMode"
                  label={`与《${form.getFieldValue('name')}》合同约定生效方式`}
                />
              );
            }}
          </ProForm.Item>

        </ProForm>
      </ProCard>

    </PageContainer>
  );
};