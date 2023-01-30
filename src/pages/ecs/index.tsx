import React, { useRef, useState, useCallback, useMemo, useEffect } from 'react';
import { CloseOutlined, PauseCircleFilled, BackwardOutlined, PlayCircleFilled, ForwardOutlined } from '@ant-design/icons';
import { Menu, message, Progress, Button, Avatar, Breadcrumb, Input, Popconfirm, Upload, Image, Drawer, Dropdown, Card } from 'antd';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { ProList } from '@ant-design/pro-components';
import { PageContainer } from '@ant-design/pro-layout';
import DbSwitch from '@/components/DbSwitch';
import Field from '@ant-design/pro-field';
import * as API_ecs from '@/services/api/ecs'
import { LinkOutlined } from '@ant-design/icons';
import Style from './index.less';
import OSS from 'ali-oss'
import request from 'umi-request';
import { marked } from 'marked'
import store from '@/redux/store'

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true, // 允许 Git Hub标准的markdown.
  pedantic: false, // 不纠正原始模型任何的不良行为和错误（默认为false）
  sanitize: false, // 对输出进行过滤（清理），将忽略任何已经输入的html代码（标签）
  tables: true, // 允许支持表格语法（该选项要求 gfm 为true）
  breaks: false, // 允许回车换行（该选项要求 gfm 为true）
  smartLists: true, // 使用比原生markdown更时髦的列表
  smartypants: false, // 使用更为时髦的标点
})

function sizeTostr(size) {
  if (!size) return '0KB'
  var data = "";
  if (size < 0.1 * 1024) { //如果小于0.1KB转化成B  
    data = size.toFixed(2) + "B";
  } else if (size < 0.1 * 1024 * 1024) {//如果小于0.1MB转化成KB  
    data = (size / 1024).toFixed(2) + "KB";
  } else if (size < 0.1 * 1024 * 1024 * 1024) { //如果小于0.1GB转化成MB  
    data = (size / (1024 * 1024)).toFixed(2) + "MB";
  } else { //其他转化成GB  
    data = (size / (1024 * 1024 * 1024)).toFixed(2) + "GB";
  }
  var sizestr = data + "";
  var len = sizestr.indexOf("\.");
  var dec = sizestr.substr(len + 1, 2);
  if (dec == "00") {//当小数点后为00时 去掉小数部分  
    return sizestr.substring(0, len) + sizestr.substr(len + 3, 2);
  }
  return sizestr;
}

// function parseNameToType({ mode, name,  }) {
//   if (mode !== 16877) {
//     return name.split('.').pop()
//   } else {
//     return 'folder'
//   }
// }

export default () => {
  const [currentFile, setCurrentFile] = useState(undefined);
  const [picVisible, setPicVisible] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [drawer, setDrawer] = useState(undefined);
  const [preview, setPreview] = useState(undefined);
  const [audio, setAudio] = useState(undefined)
  const [path, setP] = useState(['根目录'])
  const [files, setF] = useState([
  ])
  const [searchInput, setSearchInput] = useState('')
  const actionRef = useRef()
  const _path = useMemo(() => {
    return (path.length > 1 ? '/' : '') + path.filter((_i, index) => index).join('/') + '/'
  }, [path])

  const type_enum = useMemo(() => {
    return {
      'md': {
        icon: () => <Avatar shape="square" src={require("@/assets/markdown.png")}></Avatar>,
        actions: (text, row) => [<a href={`/dbfe/ecs/download?path=${_path + row.name}`} key="view">下载（{sizeTostr(row?.size)}）</a>],
        onClick: async (file) => {
          let { data } = await API_ecs.readFile({
            path: _path + file.name
          })
          setDrawerVisible(true)
          setDrawer({
            data,
            path: _path + file.name,
            title: file.name
          })
        }
      },
      'zip': {
        icon: () => <Avatar shape="square" src={require("@/assets/zip.png")}></Avatar>,
        actions: (text, row) => [<a href={`/dbfe/ecs/download?path=${_path + row.name}`} key="view">下载（{sizeTostr(row?.size)}）</a>]
      },
      'conf': {
        icon: (text, row) => <Avatar shape="square" src={require("@/assets/conf.png")}></Avatar>,
        actions: (text, row) => [<a href={`/dbfe/ecs/download?path=${_path + row.name}`} key="view">下载（{sizeTostr(row?.size)}）</a>],
        onClick: async (file) => {
          let { data } = await API_ecs.readFile({
            path: _path + file.name
          })
          setDrawerVisible(true)
          setDrawer({
            data,
            path: _path + file.name,
            title: file.name
          })
        }
      },
      'css': {
        icon: (text, row) => <Avatar shape="square" src={require("@/assets/css.png")}></Avatar>,
        actions: (text, row) => [<a href={`/dbfe/ecs/download?path=${_path + row.name}`} key="view">下载（{sizeTostr(row?.size)}）</a>],
        onClick: async (file) => {
          let { data } = await API_ecs.readFile({
            path: _path + file.name
          })
          setDrawerVisible(true)
          setDrawer({
            data,
            path: _path + file.name,
            title: file.name
          })
        }
      },
      'json': {
        icon: (text, row) => <Avatar shape="square" src={require("@/assets/json.png")}></Avatar>,
        actions: (text, row) => [<a href={`/dbfe/ecs/download?path=${_path + row.name}`} key="view">下载（{sizeTostr(row?.size)}）</a>],
        onClick: async (file) => {
          let { data } = await API_ecs.readFile({
            path: _path + file.name
          })
          setDrawerVisible(true)
          setDrawer({
            data,
            path: _path + file.name,
            title: file.name
          })
        }
      },
      'xml': {
        icon: (text, row) => <Avatar shape="square" src={require("@/assets/xml.png")}></Avatar>,
        actions: (text, row) => [<a href={`/dbfe/ecs/download?path=${_path + row.name}`} key="view">下载（{sizeTostr(row?.size)}）</a>],
        onClick: async (file) => {
          let { data } = await API_ecs.readFile({
            path: _path + file.name
          })
          setDrawerVisible(true)
          setDrawer({
            data,
            path: _path + file.name,
            title: file.name
          })
        }
      },
      'js': {
        icon: (text, row) => <Avatar shape="square" src={require("@/assets/js.png")}></Avatar>,
        actions: (text, row) => [<a href={`/dbfe/ecs/download?path=${_path + row.name}`} key="view">下载（{sizeTostr(row?.size)}）</a>],
        onClick: async (file) => {
          let { data } = await API_ecs.readFile({
            path: _path + file.name
          })
          setDrawerVisible(true)
          setDrawer({
            data,
            path: _path + file.name,
            title: file.name
          })
        }
      },
      'html': {
        icon: (text, row) => <Avatar shape="square" src={require("@/assets/html.png")}></Avatar>,
        actions: (text, row) => [<a href={`/dbfe/ecs/download?path=${_path + row.name}`} key="view">下载（{sizeTostr(row?.size)}）</a>],
        onClick: async (file) => {
          let { data } = await API_ecs.readFile({
            path: _path + file.name
          })
          setDrawerVisible(true)
          setDrawer({
            data,
            path: _path + file.name,
            title: file.name
          })
        }
      },
      'png': {
        icon: (text, row) => <Avatar shape="square" src={`/dbfe/ecs/download?path=${_path + row.name}`}></Avatar>,
        actions: (text, row) => [<a href={`/dbfe/ecs/download?path=${_path + row.name}`} key="view">下载（{sizeTostr(row?.size)}）</a>],
        onClick: async (file) => {
          setPreview(`/dbfe/ecs/download?path=${_path + file.name}`)
          setPicVisible(true)
        }
      },
      'jpg': {
        icon: (text, row) => <Avatar shape="square" src={`/dbfe/ecs/download?path=${_path + row.name}`}></Avatar>,
        actions: (text, row) => [<a href={`/dbfe/ecs/download?path=${_path + row.name}`} key="view">下载（{sizeTostr(row?.size)}）</a>],
        onClick: async (file) => {
          setPreview(`/dbfe/ecs/download?path=${_path + file.name}`)
          setPicVisible(true)
        }
      },
      'jpeg': {
        icon: (text, row) => <Avatar shape="square" src={`/dbfe/ecs/download?path=${_path + row.name}`}></Avatar>,
        actions: (text, row) => [<a href={`/dbfe/ecs/download?path=${_path + row.name}`} key="view">下载（{sizeTostr(row?.size)}）</a>],
        onClick: async (file) => {
          setPreview(`/dbfe/ecs/download?path=${_path + file.name}`)
          setPicVisible(true)
        }
      },
      'mp3': {
        icon: (text, row) => <Avatar shape="square" src={require("@/assets/mp3.png")}></Avatar>,
        actions: (text, row) => [<a href={`/dbfe/ecs/download?path=${_path + row.name}`} key="view">下载（{sizeTostr(row?.size)}）</a>],
        onClick: async (file) => {
          if (audio) {
            audio.destroy()
          }
          let instance = new Audio(`/dbfe/ecs/download?path=${_path + file.name}`)
          const timeupdateHandler = function (e) {
            setAudio({
              ...static_,
              playing: true,
              rate: 100 * instance.currentTime / instance.duration
            })
          }
          const pauseHandler = function (e) {
            setAudio({
              ...static_,
              playing: false,
              rate: 100 * instance.currentTime / instance.duration
            })
          }
          const endedHandler = function () {
            instance.currentTime = 0
            instance.play()
          }
          let static_ = {
            instance,
            file: file,
            destroy: () => {
              instance.pause()
              instance.removeEventListener('timeupdate', timeupdateHandler)
              instance.removeEventListener('pause', pauseHandler)
              instance.removeEventListener('ended', endedHandler)
              setTimeout(() => {
                setAudio(undefined)
              })
            }
          }
          instance.addEventListener('timeupdate', timeupdateHandler, false);
          instance.addEventListener('pause', pauseHandler, false);
          instance.addEventListener('ended', endedHandler, false);
          instance.play()
          setAudio({
            ...static_,
            rate: 0,
            playing: true
          })
        }
      },
      // 'link': {
      //   icon: () => <Avatar shape="square" src={require("@/assets/link.png")}></Avatar>,
      //   actions: (text, row) => [],
      //   onClick: (file) => {
      //     window.open(file.url)
      //   }
      // },
      'folder': {
        icon: () => <Avatar shape="square" src={require("@/assets/folder.png")}></Avatar>,
        actions: (text, row) => [],
        onClick: (file) => {
          path.push(file.name)
          setP(JSON.parse(JSON.stringify(path)))
        }
      },
    }
  }, [path, audio])

  const fetchFileList = useCallback(async (keyword = undefined) => {
    if (!keyword) {
      setSearchInput('')
    }
    actionRef.current?.reloadAndRest()
    setLoading(true)
    let { data } = await API_ecs.getFilesList({
      path: '/' + path.filter((_i, index) => index).join('/')
    })

    setF(data.sort((a, b) => (new Date(b.birthtime).valueOf() - new Date(a.birthtime).valueOf()) || (a.size - b.size)).map(_i => ({
      ..._i,
      name: _i.name,
      desc: `创建于${_i.birthtime} ` + (_i.child ? `共${_i.child}个文件` : ''),
    })).filter(_i => keyword ? _i.name.includes(keyword) : true))
    setLoading(false)
  }, [path])

  useEffect(fetchFileList, [path])

  const handleCreateFolder = async () => {
    let name = prompt('请输入文件夹名称')
    if (!name) return
    await API_ecs.createFile({
      path: _path + name,
    })
    fetchFileList()
  }

  const handleRename = async ({ name }) => {
    let input_name = prompt('重命名', name)
    if (!input_name) return
    await API_ecs.renameFile({
      new_path: _path + input_name,
      old_path: _path + name
    })
    fetchFileList()
  }

  const handlePathPop = useCallback((folder) => {
    while (path.length > 0 && path.at(-1) !== folder) {
      path.pop()
    }
    setP(JSON.parse(JSON.stringify(path)))
  }, [path])

  const handleFileClick = useCallback(async (file) => {
    setCurrentFile(file)
    type_enum[file?.type]?.onClick(file)
  }, [path, type_enum])

  const [uploading, setUploading] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleUploadChange = useCallback(async ({ file: { originFileObj } }) => {
    if (!window.upload_pool ) window.upload_pool  =[]
    if (!window.upload_pool.length) {
      setUploading(true)
      setLoading(true)
    }
    if (window.upload_pool.includes(originFileObj.webkitRelativePath)) return
    window.upload_pool.push(originFileObj.webkitRelativePath)


    let filedata = new FormData();
    filedata.append('file', originFileObj)
    console.log(path, originFileObj)
    filedata.append('path', _path + (originFileObj.webkitRelativePath || originFileObj.name))
    await API_ecs.uploadFile(filedata)

    window.upload_pool = window.upload_pool.filter(_i => _i !== originFileObj.webkitRelativePath)
    if (!window.upload_pool.length) {
      setUploading(false)
      setLoading(false)
      message.success('上传成功')
      fetchFileList()
    }
  }, [path])

  const props = {
    onChange(info) {
      handleUploadChange(info)
    },
  };


  const legal_path = ['/home', '/etc/nginx']
  const handleDeleteClick = async (file) => {
    if (legal_path.every(_i => !_path.includes(_i))) {
      message.error('权限不足')
      return  
    }
    await API_ecs.deleteFile({
      path: _path + file.name
    })
    fetchFileList()
  }

  const header = useMemo(() => {
    return <Breadcrumb>
      {path.map(_i => <Breadcrumb.Item onClick={() => handlePathPop(_i)}><a>{_i}</a></Breadcrumb.Item>)}
    </Breadcrumb>
  }, [path, handlePathPop])

  // const handleInput = ({ target: { value } }) => {
  //   setDrawer({
  //     origin: value,
  //     output: marked.parse(value),
  //     title: drawer.title
  //   })
  // }

  const handleSaveClick = async () => {
    await API_ecs.updateFile({
      path: drawer?.path,
      data: drawer?.data,
    })
    setDrawerVisible(false)
    fetchFileList()
  }

  const menu = (
    <Menu>
      <Menu.SubMenu title="快捷路径">
        <Menu.Item onClick={() => setP(['根目录', 'etc', 'nginx', 'vhosts'])}>Nginx配置</Menu.Item>
        <Menu.Item onClick={() => setP(['根目录', 'home', 'www'])}>静态文件目录</Menu.Item>
        <Menu.Item onClick={() => setP(['根目录', 'home', 'db-server'])}>Koa2服务</Menu.Item>
      </Menu.SubMenu>
      <Menu.SubMenu title="快捷命令">
        <Menu.Item onClick={async () => {
          await API_ecs.exec({
            command: 'nginx -s reload'
          })
          message.success('命令执行成功')
        }}>重启 Nginx</Menu.Item>
      </Menu.SubMenu>
    </Menu>
  );

  const uploadMenu = (
    <Menu>
      <Upload {...props} showUploadList={false}>
        <Menu.Item>文件</Menu.Item>
      </Upload>
      <Upload {...props} showUploadList={false} directory>
        <Menu.Item>文件夹</Menu.Item>
      </Upload>
    </Menu>
  );

  return (
    <PageContainer
    >
      <ProList<any>
        loading={loading}
        actionRef={actionRef}
        style={{
          height: '100%'
        }}
        pagination={{
          pageSize: 5,
        }}
        direction="rtl"
        toolBarRender={() => {
          return [
            <Input.Search value={searchInput} onChange={({ target: { value } }) => {
              setSearchInput(value)
              fetchFileList(value)
            }} placeholder="输入搜索关键字" enterButton />,
            <Button key="create" onClick={handleCreateFolder}>
              新建文件夹
            </Button>,
            <Dropdown overlay={menu}>
              <Button key="link" icon={<LinkOutlined />}>
              </Button>
            </Dropdown>
            ,
            <Dropdown overlay={uploadMenu}>
              <Button key="add" type="primary" loading={uploading}>
                上传
              </Button>
            </Dropdown>
          ];
        }}
        onRow={(record: any) => {
          return {
            // onMouseEnter: () => {
            //   console.log(record);
            // },
            onClick: () => {
              handleFileClick(record)
            },
          };
        }}
        rowKey="_id"
        headerTitle={header}
        dataSource={files}
        metas={{
          title: {
            dataIndex: 'name',
            render: (text, file) => {
              return (
                <span onClick={(e) => {
                  e.stopPropagation()
                  handleRename(file)
                }}>{text}</span>
              );
            },
          },
          avatar: {
            render: (text, file) => {
              return (
                type_enum[file?.type]?.icon(text, file) || <Avatar shape="square" src={require("@/assets/unknown.png")}></Avatar>
              );
            },
          },
          description: {
            dataIndex: 'desc',
          },
          // subTitle: {
          //   render: () => {
          //     return (
          //       <Space size={0}>
          //         <Tag color="blue">Ant Design</Tag>
          //         <Tag color="#5BD8A6">TechUI</Tag>
          //       </Space>
          //     );
          //   },
          // },
          actions: {
            render: (text, row) => [
              ...(type_enum[row?.type]?.actions(text, row) || []),
              <Popconfirm
                title="是否确认删除?"
                onConfirm={() => handleDeleteClick(row)}
                onCancel={() => { }}
                okText="Yes"
                cancelText="No"
                placement="topRight"
              >
                <a target="_blank" rel="noopener noreferrer" key="view">
                  删除
                </a>
              </Popconfirm>
            ],
          },
        }}
      />
      <Image
        width={200}
        style={{ display: 'none' }}
        preview={{
          visible: picVisible,
          src: preview,
          onVisibleChange: value => {
            setPicVisible(value);
          },
        }}
      />
      <Drawer title={drawer?.title} placement="bottom" height={'100%'} onClose={() => setDrawerVisible(false)} visible={drawerVisible}>
        <div style={{
          display: 'flex',
          height: '100%'
        }}>
          <div style={{ flex: '1', display: 'flex', flexDirection: 'column' }}>
            <Input.TextArea style={{ flex: '1', background: '#EBEEF5', marginBottom: '20px' }} rows={4} value={drawer?.data} onChange={({ target: { value } }) => {
              setDrawer({
                data: value,
                path: drawer?.path,
                title: drawer?.title
              })
            }} />
            <Button type='primary' onClick={handleSaveClick}>保存</Button>
          </div>
        </div>
      </Drawer>
      {
        audio ? <div style={{ position: 'fixed', bottom: '20px', right: 'calc(50% - 150px)' }}>
          <Card
            style={{ width: 300 }}
            actions={[
              <BackwardOutlined style={{ fontSize: '30px' }} onClick={() => audio.instance.currentTime -= audio.instance.duration / 30} />,
              audio?.playing ? <PauseCircleFilled style={{ fontSize: '30px' }} onClick={() => audio.instance.pause()} /> : <PlayCircleFilled style={{ fontSize: '30px' }} onClick={() => audio.instance.play()} />,
              <ForwardOutlined style={{ fontSize: '30px' }} onClick={() => audio.instance.currentTime += audio.instance.duration / 30} />,
            ]}
          >
            <CloseOutlined onClick={() => audio.destroy()} style={{ color: 'gray', position: 'absolute', right: '18px', top: '18px' }} />
            <Card.Meta
              avatar={<Avatar shape="square" src={require("@/assets/mp3.png")} />}
              title={<span>{audio?.file?.name}</span>}
              description={<Progress strokeLinecap="butt" percent={audio?.rate} showInfo={false} />}
            ></Card.Meta>

          </Card>
        </div> : undefined
      }
    </PageContainer>
  );
};