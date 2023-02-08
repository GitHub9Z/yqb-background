import React, { useRef, useState, useCallback, useMemo, useEffect } from 'react';
import { CloseOutlined, PauseCircleFilled, BackwardOutlined, PlayCircleFilled, ForwardOutlined } from '@ant-design/icons';
import { Progress, Button, Avatar, Breadcrumb, Input, Popconfirm, Upload, Image, Drawer, AutoComplete, Card } from 'antd';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { ProCard, ProForm, ProFormDependency, ProFormSelect, ProFormText, ProFormTextArea, ProFormUploadButton } from '@ant-design/pro-components';
import { message } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import DbSwitch from '@/components/DbSwitch';
import Field from '@ant-design/pro-field';
import * as API_merchant from '@/services/api/merchant'
import { LinkOutlined } from '@ant-design/icons';
import Style from './index.less';
import OSS from 'ali-oss'
import store from '@/redux/store'

export default () => {
  const form = useRef()
  useEffect(async () => {
    let { data } = await API_merchant.get_info()
    if (!data) return
    data.header = [{
      url: data.header,
      name: 'logo'
    }]
    form?.current?.setFieldsValue(data)
  })

  const handleUploadChange = async ({ file: { originFileObj } }) => {
    if (!originFileObj || window.last_upload === originFileObj.name) return
    window.last_upload = originFileObj.name
    const client = new OSS({
      region: 'oss-cn-beijing',
      accessKeyId: 'LTAI5tAg9BTerrZLPSZaDYdr',
      accessKeySecret: 'FqPIESeDeYWglFPIiYecl58Lgqk9O0',
      bucket: 'jsonote'
    });
    await client.multipartUpload(originFileObj.name, originFileObj)
    form?.current?.setFieldsValue({
      ...form?.current?.getFieldsValue(),
      header: [{
        url: "http://oss.imgker.com/" + originFileObj.name,
        name: originFileObj.name
      }]
    })
    message.success('上传成功')
  }

  const handleUpdate = useCallback(async () => {
    let params = form?.current?.getFieldsValue?.()
    params.header = params.header?.[0]?.url
    let { success } = await API_merchant.update_info(params)
    if (success) {
      message.success('保存成功')
    }
  }, [])
  return (

    <PageContainer
    >
      <ProCard>
        <ProForm
          formRef={form}
          onFinish={async (values) => {
            console.log(values);
            message.success('提交成功');
          }}
          submitter={{
            render: (props, doms) => {
              return [
                <Button type='primary' htmlType="button" onClick={handleUpdate} key="edit">
                  保存
                </Button>
              ];
            },
          }}
        >
          <ProFormText
            width="md"
            name="title"
            label="商户品牌名称"
            tooltip="最长为 16 字"
            placeholder="请输入名称"
          />
          <ProFormSelect
            options={[
              {
                value: 1,
                label: '餐饮',
              },
              {
                value: 2,
                label: '娱乐',
              },
              {
                value: 3,
                label: '日用',
              },
              {
                value: 4,
                label: '出行',
              },
              {
                value: 5,
                label: '服装',
              },
              {
                value: 6,
                label: '运动',
              },
            ]}
            width="md"
            name="type"
            label="商户类目"
          />


          <ProFormTextArea
            width="md"
            name="hint"
            label="商户简介"
            tooltip="最长为 128 字"
            placeholder="请输入名称"
          />
          <ProFormUploadButton
            width="md"
            name="header"
            label="商户品牌Logo"
            max={1}
            placeholder="请输入名称"
            onChange={handleUploadChange}
            fieldProps={{
              name: 'file',
              listType: 'picture-card',
            }}
          />
        </ProForm>
      </ProCard>

    </PageContainer>
  );
};