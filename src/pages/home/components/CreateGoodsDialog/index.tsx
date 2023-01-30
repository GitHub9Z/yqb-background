import { Button, message } from 'antd';
import {
  ModalForm,
  ProFormText,
  ProFormTextArea,
  ProFormDateTimeRangePicker,
  ProFormDigit,
  ProFormGroup,
  ProFormSelect,
  ProFormSwitch
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
      title="新建商品"
      trigger={
        <Button key="button" icon={<PlusOutlined />} type="primary">
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
      onFinish={async (values) => {
        await waitTime(2000);
        console.log(values.name);
        message.success('提交成功');
        return true;
      }}
    >
      <ProFormText width="sm" name="id" label="商品名称" />
      <ProFormText width="sm" name="id" label="权益编号" />
      <ProFormDateTimeRangePicker name="dateTimeRange" label="有效时间" />
      <ProFormGroup >
        <ProFormDigit labelCol={{ span: 11 }} wrapperCol={{ span: 14 }} label="建议价" name="input-number" width="sm" min={1} max={10} /><span style={{ lineHeight: '30px' }}>元</span>
      </ProFormGroup>
      <ProFormGroup >
        <ProFormDigit labelCol={{ span: 11 }} wrapperCol={{ span: 14 }} label="有效期" width="sm" name="input-number" min={1} max={10} />
        <ProFormSelect
          request={async () => [
            {
              value: 'chapter',
              label: '日',
            },
            {
              value: '111',
              label: '月',
            },
            {
              value: 'ch222apter',
              label: '周',
            },
          ]}
          name="useMode"
        />
      </ProFormGroup>
      <ProFormTextArea name="project" label="备注" />
      <ProFormSwitch name="switch" label="启用" />
    </ModalForm>
  );
};
