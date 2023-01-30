import React from 'react';
import { Button, message } from 'antd';
import ProForm, {
  ModalForm,
  ProFormText,
  ProFormTextArea,
  ProFormDateRangePicker,
  ProFormSelect,
} from '@ant-design/pro-form';
import { PlusOutlined } from '@ant-design/icons';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default () => {
  return (
    <ModalForm<{
      name: string;
      company: string;
    }>
      title="编辑原始卡"
      trigger={
        <a>
          编辑
        </a>
      }
      layout="horizontal"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      autoFocusFirstInput
      modalProps={{
        onCancel: () => console.log('run'),
      }}
      onFinish={async (values) => {
        await waitTime(2000);
        console.log(values.name);
        message.success('提交成功');
        return true;
      }}
    >
      <ProFormSelect
        request={async () => [
          {
            value: 'chapter',
            label: '爱奇艺',
          },
          {
            value: '111',
            label: '芒果TV',
          },
          {
            value: 'ch222apter',
            label: '华数',
          },
        ]}
        width="xs"
        name="useMode"
        label="商户方"
      />
      <ProFormText width="sm" name="id" label="权益编号" />
      <ProFormTextArea name="project" label="备注" />
    </ModalForm>
  );
};
