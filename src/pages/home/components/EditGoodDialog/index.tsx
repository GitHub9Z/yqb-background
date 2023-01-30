import { Button, message } from 'antd';
import {
  ModalForm,
  ProFormText,
  ProFormTextArea,
  ProFormDigit,
  ProFormGroup,
  ProFormSelect,
  ProFormSwitch,
  ProFormUploadButton
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
      title="编辑单点商品"
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
      <ProFormText width="sm" name="id" label="爱奇艺ID" />
      <ProFormGroup >
        <ProFormText labelCol={{ span: 11 }} width="sm" name="id" label="影片ID" />
        <Button key="button" type="primary">
          检测
        </Button>
      </ProFormGroup>
      <ProFormText width="sm" name="id" label="影片名称" />
      <ProFormGroup style={{ position: 'relative', left: '-25px' }}>
        <ProFormUploadButton
          name="upload"
          title="海报"
          max={1}
          label="上传"
          width="sm"
          labelCol={{
            span: 14
          }}
          wrapperCol={{
            span: 20
          }}
          fieldProps={{
            name: 'file',
            listType: 'picture-card',
          }}
          action="/upload.do"
        />
        <ProFormUploadButton
          name="upload"
          title="背景"
          max={1}
          style={{ paddingLeft: '200px' }}
          fieldProps={{
            name: 'file',
            listType: 'picture-card',
          }}
          action="/upload.do"
        />
      </ProFormGroup>
      <ProFormGroup >
        <ProFormDigit labelCol={{ span: 11 }} wrapperCol={{ span: 14 }} label="初始价" name="input-number" width="sm" min={1} max={10} /><span style={{ lineHeight: '30px' }}>元</span>
        <ProFormSwitch name="switch" label="启用会员价" labelCol={{ span: 21 }} width="sm"/>
      </ProFormGroup>
      <ProFormGroup >
        <ProFormDigit labelCol={{ span: 11 }} wrapperCol={{ span: 14 }} label="会员价" name="input-number" width="sm" min={1} max={10} /><span style={{ lineHeight: '30px' }}>元</span>
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