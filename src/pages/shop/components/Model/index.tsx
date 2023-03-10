import { Button, message } from 'antd';
import {
  ModalForm,
  ProFormText,
  ProFormTextArea,
  ProFormSelect,
  ProFormInstance,
  ProFormDigit
} from '@ant-design/pro-form';
import { PlusOutlined } from '@ant-design/icons';
import { useCallback, useEffect, useRef } from 'react';
import * as API_shop from '@/services/api/shop'

const handleFinish = async (e, id, reload) => {
  if (id) {
    await API_shop.update({
      ...e,
      id
    })
  } else {
    await API_shop.create(e)
  }
  reload?.()
  return true
};

export default ({ init, reload }) => {
  const form = useRef<
    ProFormInstance<{
      date: string;
    }>
  >();

  const handleInit = useCallback(() => {
    setTimeout(() => {
      form.current?.resetFields()
      if (!init) {
        return
      }
      form.current?.setFieldsValue(init)
    })
  }, [init])

  return (
    <ModalForm<{
      name: string;
      company: string;
    }>
      formRef={form}
      title={init ? "编辑" : "新建"}
      trigger={
        init ? <a onClick={handleInit}>编辑</a> : <Button key="button" icon={<PlusOutlined />} type="primary">
          新建
        </Button>
      }
      layout="horizontal"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      autoFocusFirstInput
      modalProps={{
        onCancel: () => console.log('run'),
      }}
      onFinish={e => handleFinish(e, init?.id, reload)}
    >
      <ProFormText name="title" label="门店名称" />
      <ProFormText name="phone" label="联系方式" />
      <ProFormDigit name="longitude" label="经度" />
      <ProFormDigit name="latitude" label="纬度" />
    </ModalForm>
  );
};