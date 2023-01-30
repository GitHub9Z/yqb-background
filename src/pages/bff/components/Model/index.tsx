import { Button, message } from 'antd';
import {
  ModalForm,
  ProFormText,
  ProFormTextArea,
  ProFormSelect,
  ProFormInstance
} from '@ant-design/pro-form';
import { PlusOutlined } from '@ant-design/icons';
import { useCallback, useEffect, useRef } from 'react';
import * as API_git from '@/services/api/docs'

const handleFinish = async (e, id, reload) => {
  if (id) {
    await API_git.update({
      ...e,
      tag: e?.tag?.toLocaleLowerCase(),
      id
    })
  } else {
    await API_git.create(e)
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
      <ProFormTextArea name="title" label="题干" />
      <ProFormTextArea name="answer" label="题解" />
      <ProFormText name="url" label="参考" />
      <ProFormText width="sm" name="tag" label="标签" />
      <ProFormSelect options={[{
        label: '简单',
        value: 1
      }, {
        label: '一般',
        value: 2
      }, {
        label: '困难',
        value: 3
      }, {
        label: '极难',
        value: 4
      }]} width="sm" name="dif" label="难度" />
    </ModalForm>
  );
};