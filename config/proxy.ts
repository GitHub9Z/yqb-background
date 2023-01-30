const { REACT_APP_ENV = 'dev' } = process.env;
export default {
  '/yqb': {
    // target: 'http://fe.dangbei.net:8118/',
    target: 'http://localhost:824/',
    changeOrigin: true,
    pathRewrite: { '^/yqb': '/yqb' },
  }
};
