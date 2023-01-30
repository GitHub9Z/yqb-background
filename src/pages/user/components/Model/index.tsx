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
import * as API_protocal from '@/services/api/protocal'

const handleFinish = async (e, id, reload) => {
  if (id) {
    await API_protocal.update({
      ...e,
      tag: e?.tag?.toLocaleLowerCase(),
      id
    })
  } else {
    await API_protocal.create(e)
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
      <ProFormText name="title" label="名称" />
      <ProFormTextArea name="hint" label="注释" />
      <ProFormDigit name="sum" label="周期数" />
      <ProFormDigit name="time" label="周期时长" />
      <ProFormSelect options={[{
        label: '次数',
        value: 1
      }, {
        label: '金额',
        value: 2
      }, {
        label: '时长',
        value: 3
      }]} width="sm" name="task_type" label="指标类型" />
      <ProFormDigit name="task_num" label="指标数" />
      <ProFormDigit name="bonus" label="合约金额" />
    </ModalForm>
  );
};
