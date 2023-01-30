import ReactDOM from 'react-dom';
import type { RunTimeLayoutConfig, RequestConfig } from 'umi';
import type { Settings as LayoutSettings } from '@ant-design/pro-layout';
import { message } from 'antd';

// 是否为微前端子应用
let isQiankunChildren = false;

// http 请求异常处理函数
const requestErrorHandler = (error: any) => {
  if (!error.response && error.message === '取消请求') return
  const { status, headers } = error.response;

  const contentType = headers?.get('Content-Type');

  let msg = `接口"${status}"异常`;

  if (contentType && contentType?.includes('application/json')) {
    const data = error.data;
    msg = data?.errorMessage;
  }
  switch(status) {
    case 403: {
      localStorage.removeItem('token')
      break
    }
  }
};

const requestHandler = (url: any, options: any) => {
  options.headers['sc-token'] = localStorage.getItem('token')
  return {
    url,
    options,
  };
};

// http 请求配置
export const request: RequestConfig = {
  errorConfig: {
    adaptor: (resData) => {
      return {
        ...resData,
      };
    },
  },
  errorHandler: requestErrorHandler,
  requestInterceptors: [requestHandler],
};

export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
}> {
  // fetchUserInfo: undefined,
  return {
    settings: {},
  };
}

// content: initialState?.currentUser?.name,
export const layout: RunTimeLayoutConfig = ({ initialState }) => {
  const layoutSettings: any = {
    rightContentRender: () => null,
    disableContentMargin: true,
    waterMarkProps: {},
    onPageChange: () => {},
    links: [],
    headerRender: false,
    headerContentRender: false,
    menuHeaderRender: false,
  };

  // 不是为微前端的情况下的配置
  if (!isQiankunChildren) {
  }
  return {
    ...layoutSettings,
    ...initialState?.settings,
  };
};

export const qiankun = {
  // 应用加载之前
  async bootstrap(props: any) {
    isQiankunChildren = true;
    return Promise.resolve(props);
  },
  // 应用 render 之前触发
  async mount(props: any) {
    return Promise.resolve(props);
  },
  // 应用卸载之后触发
  async unmount(props: any) {
    console.log('子应用[app-common] unmount', props);
    const { container } = props;

    ReactDOM.unmountComponentAtNode(container ? container.querySelector('#root') : document.querySelector('#root'));
    return Promise.resolve(props);
  },
};
