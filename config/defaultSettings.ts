import { Settings as LayoutSettings } from '@ant-design/pro-layout';

const Settings: LayoutSettings & { pwa?: boolean; logo?: string } = {
  navTheme: 'dark', // 主题
  // 拂晓蓝
  primaryColor: '#1890ff',
  layout: 'side',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  pwa: false,
  iconfontUrl: '',
  title: '当贝运营中心系统',
};

export default Settings;
