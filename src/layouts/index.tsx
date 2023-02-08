import { PageContainer, ProLayout, SettingDrawer } from '@ant-design/pro-components';
import { LikeOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Popconfirm, Descriptions, Result, Space, Statistic } from 'antd';
import route from '../../config/routes'
import { useEffect, useState } from 'react';
import { setInfo } from '@/redux/action/index'
import * as API_cloud from '@/services/api/cloud'
import store from '@/redux/store'
import { history } from 'umi';

const Layout = (props) => {
    let { location: { query: { token = localStorage.getItem('token') } } } = props
    const fetchInfo = async () => {
        let { data } = await API_cloud.getLoginUserInfo()
        setInfo(data)
    }
    const [info, setI] = useState({})
    useEffect(() => {
        store.subscribe(() => {
            setI(store.getState()?.user?.info)
        })
        if (token) {
            localStorage.setItem('token', token)
            fetchInfo()
        }
    }, [])
    const handleLogoutClick = () => {
        setI({})
        localStorage.removeItem('token')
        setInfo(null)
    }

    const handleLoginClick = async () => {
        history.replace('/login')
    }
    return (
        <ProLayout
            contentStyle={{
                margin: '0'
            }}
            rightContentRender={() => {
                if (info?.userName) {
                    return (<Popconfirm
                        title="是否确认退出?"
                        onConfirm={handleLogoutClick}
                        onCancel={() => { }}
                        okText="Yes"
                        cancelText="No"
                        placement="topRight"
                    >
                        <div style={{ cursor: 'pointer' }}>
                            <Avatar shape="square" size="small" style={{ backgroundColor: '#f56a00' }}>{info?.userName?.at(-1)}</Avatar>
                        </div>
                    </Popconfirm>)
                } else {
                    return (<div style={{ cursor: 'pointer' }} onClick={handleLoginClick}><Avatar shape="square" size="small" icon={<UserOutlined/>}>1</Avatar></div>)
                }
            }}
            menuRender={false}>
            {props.children}
        </ProLayout>
    )
}

export default Layout