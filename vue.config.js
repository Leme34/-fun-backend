const path = require("path");
const resolve = dir => path.join(__dirname, dir);

module.exports = {
  devServer: {
    proxy: {
      "/api": {
        // 不要直接修改这里
        // 如果要修改API路径，应在项目根目录下创建".env.local"文件
        // 然后写入本地变量PROXY_API_URL
        // 例如：PROXY_API_URL = http://demo.open.renren.io/renren-fast-server/
        // 注意：".env.local"文件不需要添加到Git
        // 具体参考 https://cli.vuejs.org/zh/guide/mode-and-env.html
        target: process.env.PROXY_API_URL,
        pathRewrite: { "^/api": "" }
      }
    }
  },
  runtimeCompiler: true, // 运行时template编译支持
  chainWebpack: config => {
    // 配置svg打包规则忽略icons目录
    config.module
      .rule("svg")
      .exclude.add(resolve("src/icons"))
      .end();

    // 新增icons打包规则
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader");

    // 配置ueditor导入
    config.externals({ ueditor: "UE" });
  }
};
