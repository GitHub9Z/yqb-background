import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
import routes from './routes';

export default defineConfig({
  base: '/',
  hash: true, // 打包的时候采用hash
  layout: {
    // https://umijs.org/zh-CN/plugins/plugin-layout
    locale: false, // 国际化
    siderWidth: 208, // 左侧菜单宽度
    disableMobile: true,
    ...defaultSettings,
  },
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [routes],
  proxy,
  openAPI: [
    // oneapi.json 里为mock数据
    /*  {
       requestLibPath: "import { request } from 'umi'",
       // 或者使用在线的版本
       schemaPath: "http://tp6.admin.com/swagger.json",
       mock: false,
       projectName: 'api'
     }, */
    {
      requestLibPath: "import { request } from 'umi'",
      // 或者使用在线的版本
      // schemaPath: "http://dev-newos.com/swagger/output",
      schemaPath: "http://bigtestadmin.dangbei.net/swagger/output",
      mock: false,
      projectName: 'api'
    },
  ],
  qiankun: {
    slave: {},
  },
  locale: {},
  fastRefresh: {},
  dynamicImport: {
    loading: '@ant-design/pro-layout/es/PageLoading',
  },
  // mfsu: {}
});
