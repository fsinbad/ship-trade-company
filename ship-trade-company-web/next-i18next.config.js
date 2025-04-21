// 文件位置: next-i18next.config.js
module.exports = {
  i18n: {
    defaultLocale: 'zh',
    locales: ['en', 'zh'],
    localeDetection: false, // 禁用浏览器语言自动检测
  },
  reloadOnPrerender: process.env.NODE_ENV === 'development', // 开发环境热重载
  // 其他可选配置
  interpolation: {
    escapeValue: false, // React已经处理了XSS防护
  },
  serializeConfig: false, // 优化性能
}