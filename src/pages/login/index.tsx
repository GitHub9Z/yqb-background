import {
    AlipayOutlined,
    LockOutlined,
    MobileOutlined,
    TaobaoOutlined,
    UserOutlined,
    WeiboOutlined,
} from '@ant-design/icons';
import {
    LoginFormPage,
    ProForm,
    ProFormCaptcha,
    ProFormCheckbox,
    ProFormText,
} from '@ant-design/pro-components';
import { Button, Divider, message, Space, Tabs } from 'antd';
import { CSSProperties, useRef } from 'react';
import { useState } from 'react';
import * as API_login from '@/services/api/login'
import { history } from 'umi';

type LoginType = 'phone' | 'account';

const iconStyles: CSSProperties = {
    color: 'rgba(0, 0, 0, 0.2)',
    fontSize: '18px',
    verticalAlign: 'middle',
    cursor: 'pointer',
};

export default () => {
    const [loginType, setLoginType] = useState<LoginType>('phone');
    const form = useRef()
    return (
        <div style={{ backgroundColor: 'white', height: '100vh', position: 'fixed', width: '100vw', top: 0, left: 0, zIndex: 999, boxSizing: 'border-box' }}>
            <LoginFormPage
                backgroundImageUrl="https://gw.alipayobjects.com/zos/rmsportal/FfdJeJRQWjEeGTpqgBKj.png"
                logo={require('../../assets/logo.jpg')}
                title="易签多"
                subTitle="全球最大的在线签约平台"
                onFinish={async() => {
                    let res = await API_login.LOGIN({
                        phone: form.current.getFieldValue('mobile'),
                        sms: form.current.getFieldValue('captcha')
                    })
                    if (res?.data?.token) {
                        localStorage.setItem('token', res?.data?.token)
                        history.replace('/index')
                    } else {
                        form.current.resetFields()
                    }
                }}
                activityConfig={{
                    style: {
                        boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.2)',
                        color: '#fff',
                        borderRadius: 8,
                        backgroundColor: '#1677FF',
                    },
                    title: '活动标题，可配置图片',
                    subTitle: '活动介绍说明文字',
                    action: (
                        <Button
                            size="large"
                            style={{
                                borderRadius: 20,
                                background: '#fff',
                                color: '#1677FF',
                                width: 120,
                            }}
                        >
                            去看看
                        </Button>
                    ),
                }}
                actions={
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                        }}
                    >
                        <Divider plain>
                            <span style={{ color: '#CCC', fontWeight: 'normal', fontSize: 14 }}>
                                其他登录方式
                            </span>
                        </Divider>
                        <Space align="center" size={24} style={{ filter: 'grayscale(1)' }}>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'column',
                                    height: 40,
                                    width: 40,
                                    border: '1px solid #D4D8DD',
                                    borderRadius: '50%',
                                }}
                            >
                                <AlipayOutlined style={{ ...iconStyles, color: '#1677FF' }} />
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'column',
                                    height: 40,
                                    width: 40,
                                    border: '1px solid #D4D8DD',
                                    borderRadius: '50%',
                                }}
                            >
                                <TaobaoOutlined style={{ ...iconStyles, color: '#FF6A10' }} />
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'column',
                                    height: 40,
                                    width: 40,
                                    border: '1px solid #D4D8DD',
                                    borderRadius: '50%',
                                }}
                            >
                                <WeiboOutlined style={{ ...iconStyles, color: '#333333' }} />
                            </div>
                        </Space>
                    </div>
                }
            >
                <Tabs
                    centered
                    activeKey={loginType}
                    onChange={(activeKey) => setLoginType(activeKey as LoginType)}
                >
                    <Tabs.TabPane key={'account'} disabled tab={'账号密码登录'} />
                    <Tabs.TabPane key={'phone'} tab={'手机号登录'} />
                </Tabs>
                {loginType === 'account' && (
                    <>
                        <ProFormText
                            name="username"
                            fieldProps={{
                                size: 'large',
                                prefix: <UserOutlined className={'prefixIcon'} />,
                            }}
                            placeholder={'用户名: admin or user'}
                            rules={[
                                {
                                    required: true,
                                    message: '请输入用户名!',
                                },
                            ]}
                        />
                        <ProFormText.Password
                            name="password"
                            fieldProps={{
                                size: 'large',
                                prefix: <LockOutlined className={'prefixIcon'} />,
                            }}
                            placeholder={'密码: ant.design'}
                            rules={[
                                {
                                    required: true,
                                    message: '请输入密码！',
                                },
                            ]}
                        />
                    </>
                )}
                {loginType === 'phone' && (
                    <ProForm formRef={form} submitter={{
                        render() {
                            return null
                        }
                    }}>
                        <ProFormText
                            fieldProps={{
                                size: 'large',
                                prefix: <MobileOutlined className={'prefixIcon'} />,
                            }}
                            name="mobile"
                            placeholder={'手机号'}
                            rules={[
                                {
                                    required: true,
                                    message: '请输入手机号！',
                                },
                                {
                                    pattern: /^1\d{10}$/,
                                    message: '手机号格式错误！',
                                },
                            ]}
                        />
                        <ProFormCaptcha
                            fieldProps={{
                                size: 'large',
                                prefix: <LockOutlined className={'prefixIcon'} />,
                            }}
                            captchaProps={{
                                size: 'large',
                            }}
                            placeholder={'请输入验证码'}
                            captchaTextRender={(timing, count) => {
                                if (timing) {
                                    return `${count} ${'获取验证码'}`;
                                }
                                return '获取验证码';
                            }}
                            name="captcha"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入验证码！',
                                },
                            ]}
                            onGetCaptcha={async () => {
                                let res = await API_login.SMS({
                                    phone: form.current.getFieldValue('mobile')
                                })
                                if (!res) throw new Error()
                            }}
                        />
                    </ProForm>
                )}
                <div
                    style={{
                        marginBlockEnd: 24,
                    }}
                >
                    <ProFormCheckbox noStyle name="autoLogin">
                        自动登录
                    </ProFormCheckbox>
                    <a
                        style={{
                            float: 'right',
                        }}
                    >
                        联系客服
                    </a>
                </div>
            </LoginFormPage>
        </div>
    );
};