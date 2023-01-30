import { Button, Upload } from 'antd';
import {
  ModalForm,
  ProFormText,
  ProFormTextArea,
  ProFormSelect,
  ProFormInstance
} from '@ant-design/pro-form';
import { PlusOutlined } from '@ant-design/icons';
import { useCallback, useState, useRef } from 'react';
import * as API_app from '@/services/api/app'
import * as API_edition from '@/services/api/edition'
import Style from './index.less';
import { UploadOutlined } from '@ant-design/icons';
import JSZip from 'jszip'
import OSS from 'ali-oss'

const levalAdd = (code) => {
  code = Number((code + '').split('.').join('')) || 99
  code ++
  return (code + '').split('').join('.')
}

const zipFiles = async (files, name, id) => {
  var zip = new JSZip();
  let modified_filename_func = (name, domain) => {
    let list = name.split('/')
    list[0] = domain
    return list.join('/')
  }
  let { data: { title: domain } } = await API_app.getappInfo({
    id
  })
  //添加需要压缩的文件 file对象
  files.forEach(_i => {
    zip.file(modified_filename_func(_i.webkitRelativePath, domain), _i);
  })
  //zip.file("mimetype", "application/zip");

  //return promise对象   该方法是异步方法 需要注意！上传和修改文件内容需要在此方法中，我就是因为这个坑浪费三四个小时
  let res = await zip.generateAsync({ type: "Blob", compression: "DEFLATE" })
  return new File([res], name, { type: "zip" });
}

export default ({ reload, app }) => {
  const name = `${app.id}-${levalAdd(app.code)}.dpk`
  const form = useRef<
    ProFormInstance<{
      date: string;
    }>
  >();
  const [dpk, setDpk] = useState(null)

  const handleUploadChange = useCallback(async (e) => {
    try {
      if (window.uploading) return
      window.uploading = true
      let files = e?.fileList.map(_i => _i.originFileObj)
      let dpk = await zipFiles(files, name, app.id)
      let url = "http://oss.imgker.com/" + name
      form.current?.setFieldsValue({
        url
      })
      setDpk(dpk)
      window.uploading = false
    } catch (e) {
      console.log(e)
    }
  }, [])

  const handleUploadFinish = useCallback(async (e) => {
    const client = new OSS({
      region: 'oss-cn-beijing',
      accessKeyId: 'LTAI5tAg9BTerrZLPSZaDYdr',
      accessKeySecret: 'FqPIESeDeYWglFPIiYecl58Lgqk9O0',
      bucket: 'jsonote'
    });
    await client.multipartUpload(name, dpk)
    await API_edition.create({
      ...e,
      app: app?.id
    })
    await reload()
    form.current?.resetFields()
    return true
  }, [dpk, reload, app])


  return (
    <ModalForm<{
      name: string;
      company: string;
    }>
      width={600}
      formRef={form}
      title="发布"
      trigger={
        <Button key="button" icon={<PlusOutlined />} type="primary">
          发布
        </Button>
      }
      layout="horizontal"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      autoFocusFirstInput
      modalProps={{
        onCancel: () => console.log('run'),
      }}
      onFinish={handleUploadFinish}
    >
            <ProFormText
        name="url"
        label="链接"
      />
      <div className={Style['upload']}>
        <Upload directory onChange={handleUploadChange}>
          <UploadOutlined style={{ color: "white", fontSize: '20px' }} />
        </Upload>
      </div>
      <ProFormText name="code" label="版本号" disabled initialValue={levalAdd(app.code)}/>
      <ProFormTextArea name="intro" label="更新内容" />
    </ModalForm>
  );
};