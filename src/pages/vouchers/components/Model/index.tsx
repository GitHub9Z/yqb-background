import { Button, message } from 'antd';
import {
  ModalForm,
  ProFormText,
  ProFormTextArea,
  ProFormSelect,
  ProFormInstance,
  ProFormDigit,
  ProFormSwitch
} from '@ant-design/pro-form';
import { PlusOutlined } from '@ant-design/icons';
import { useCallback, useEffect, useRef } from 'react';
import * as API_vouchers from '@/services/api/vouchers'
import * as API_protocal from '@/services/api/protocal'

const handleFinish = async (e, id, reload) => {
  if (id) {
    await API_vouchers.update({
      ...e,
      id
    })
  } else {
    await API_vouchers.create({
      ...e,
      task_num: {
        1: e.times,
        2: e.money,
        3: e.time
      }
    })
  }
  reload()
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
      <ProFormSelect
            name="protocals"
            label="适用协议"
            request={async () => {
              let { data } = await API_protocal.findProtocals({
                page_size: 999
              })
              return data.data.map(_i => ({
                value: _i.id,
                label: _i.title
              }))
            }}
            fieldProps={{
              mode: 'multiple',
            }}
            placeholder="Please select favorite colors"
            rules={[
              { required: true, message: 'Please select your favorite colors!', type: 'array' },
            ]}
          />
      <ProFormDigit name="sum" label="发行量" />
      <ProFormDigit name="times" label="核销次数" />
      <ProFormDigit name="money" label="核销金额" />
      <ProFormDigit name="time" label="核销时长" />
    </ModalForm>
  );
};
