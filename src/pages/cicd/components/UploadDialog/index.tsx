import { Button, message, Upload } from 'antd';
import {
  ModalForm,
  ProFormText,
  ProFormSelect,
  ProFormUploadButton
} from '@ant-design/pro-form';
import { UploadOutlined } from '@ant-design/icons';
import Style from './index.less';
import { useCallback, useEffect, useRef, useState } from 'react';
import * as API_git from '@/services/api/git'
import OSS from 'ali-oss'

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default ({ reload, project, branch }) => {
  const form = useRef()
  const [commit, setC] = useState(new Date().valueOf())
  const [file_list, setFL] = useState([])

  const handleUploadChange = useCallback((e) => {
    try {
      let files = e?.fileList
      if (!files.length) return
      files = files.map(_i => _i.originFileObj)
      files.forEach((file) => {
        file.DIY = commit + "/" + (file.webkitRelativePath || file.name);
        if (file.name.includes("index.html")) {
          let url = "http://oss.imgker.com/" + file.DIY
          form.current?.setFieldsValue({
            url
          })
        }
      });
      setFL(files)
    } catch (e) {
      console.log(e)
    }
  }, [])
  const handleUploadFinish = useCallback(async (e) => {
    const upload_pool = []
    const client = new OSS({
      region: 'oss-cn-beijing',
      accessKeyId: 'LTAI5tAg9BTerrZLPSZaDYdr',
      accessKeySecret: 'FqPIESeDeYWglFPIiYecl58Lgqk9O0',
      bucket: 'jsonote'
    });
    if (file_list) {
      file_list.forEach(file => {
        upload_pool.push(client.multipartUpload(file.DIY, file))
      })
    }
    await Promise.all(upload_pool)
    await API_git.commit({
      ...e,
      author: '手动提交',
      progress: 100,
      commit
    })
    await reload()
    setC(new Date().valueOf())
    form.current?.resetFields()
    return true
  }, [file_list, commit, reload])

  console.log('夫妇', form)
  const init = useCallback(() => {
    setTimeout(() => {
      form.current?.setFieldsValue({
        project,
        branch
      })
    })
  }, [project, branch])
  return (
    <ModalForm
      formRef={form}
      title="手动上传"
      trigger={
        <Button onClick={init} style={{ marginLeft: '10px' }} type="primary" icon={<UploadOutlined />} size="default">
          手动上传
        </Button>
      }
      layout="horizontal"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 12 }}
      autoFocusFirstInput
      width={400}
      onFinish={handleUploadFinish}
    >
      <ProFormSelect
        request={async () => {
          let list = await API_git.getProjectList()
          return list.filter(_i => _i).map(_i => ({
            label: _i,
            value: _i
          }))
        }}
        name="project"
        label="项目"
      />
      <ProFormText
        name="branch"
        label="分支"
      />
      <ProFormText
        name="subject"
        label="描述"
      />
      <ProFormText
        name="url"
        label="链接"
      />
      <div className={Style['upload']}>
        <Upload directory onChange={handleUploadChange}>
          <UploadOutlined style={{ color: "white", fontSize: '20px' }} />
        </Upload>
      </div>
    </ModalForm>
  );
};
