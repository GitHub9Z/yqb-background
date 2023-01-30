import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Spin, Card, message, Collapse } from 'antd';
import type {
  ProFormInstance
} from '@ant-design/pro-form';
import {
  ProForm,
  ProFormText,
  ProFormDigit,
  ProFormGroup,
  ProFormRadio,
  ProFormUploadButton,
  ProFormTextArea,
  ProFormFieldSet,
  ProFormSelect
} from '@ant-design/pro-form';
import { rules } from './setting';
import { history } from 'umi';
import { Button, Checkbox } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import * as API_app from '@/services/api/app'

const ComboModal: React.FC<{}> = ({ match }) => {
  const propsUploadPublic: any = {
    accept: '.png, .jpg',
    listType: "picture-card",
    action: '/dbfe/app/uploadimg',
    headers: {
      ContentType: 'multipart/form-data'
    },
    data: (file: any) => {
      return {
        file
      };
    },
    onChange(info: { file: any; fileList: any }) {
      if (info.file.status === 'done') {
        message.success(`${info.file.name} 上传成功`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} 上传失败`);
      }
    },
  };

  const { id } = JSON.parse(atob(match?.params?.id))

  const form = useRef<
    ProFormInstance<{
      date: string;
    }>
  >();
  const [loading, setLoading] = useState(false)

  useEffect(async (e) => {
    form.current?.resetFields()
    if (id) {
      setLoading(true)
      let { data } = await API_app.getappInfo({
        id
      })
      data.icon = [{
        name: data.icon,
        url: data.icon
      }]
      data.pics = JSON.parse(data.pics || '[]').map(_i => ({
        name: _i,
        url: _i
      }))
      form.current?.setFieldsValue(data)
      setLoading(false)
    }
  }, [id])

  const onFinishCallback = useCallback(async (e) => {
    e.icon = e.icon[0]?.response || e.icon[0]?.url
    e.pics = JSON.stringify(e.pics.map(_i => _i.response || _i.url))
    if (id) {
      await API_app.update({
        id,
        ...e
      })
    } else {
      await API_app.create(e)
    }
    history.goBack()
  }, []);

  return (
    <PageContainer>
      <Spin spinning={loading}>
        <Card>
          <ProForm style={{ width: '900px' }} formRef={form} onFinish={onFinishCallback} onFinishFailed={() => message.error('表单数据格式有误')} submitter={{
            render: (props, doms) => {
              return [
                doms[1],
                <Button htmlType="button" onClick={() => history.goBack()} key="edit">
                  取消
                </Button>
              ];
            },
          }}>
            <ProFormText name="title" rules={rules.title} label="应用名称" width="lg" />
            <ProFormSelect name="type" rules={rules.type} options={[
              {
                label: "影音",
                value: 1
              },
              {
                label: "生活",
                value: 2
              },
              {
                label: "游戏",
                value: 3
              },
              {
                label: "体育",
                value: 4
              },
              {
                label: "系统",
                value: 5
              }
            ]} label="所属标签" width="lg" />
            <ProFormTextArea name="intro" rules={rules.intro} label="应用简介" width="lg" />
            <ProFormUploadButton
              name="icon"
              rules={rules.icon}
              label="应用图标"
              fieldProps={propsUploadPublic}
              max={1}
            />
            <ProFormUploadButton
              name="pics"
              rules={rules.icon}
              label="宣传图"
              fieldProps={propsUploadPublic}
              max={6}
            />
          </ProForm>
        </Card>
      </Spin>
    </PageContainer>
  );
};

export default ComboModal;
