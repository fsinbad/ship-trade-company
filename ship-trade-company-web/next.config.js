const { i18n } = require('./next-i18next.config');
const withPlugins = require('next-compose-plugins');
const bundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withPlugins([
  bundleAnalyzer,
  {
    i18n,
    async redirects() {
      return [
        {
          source: '/',
          destination: '/zh',
          permanent: false,
          locale: false // 禁用locale自动处理
        }
      ]
    },
    // 移除 next-optimized-images 相关配置，使用 Next.js 内置图像优化
    images: {
      // 内置图像优化配置（可选）
      // domains: ['your-image-domain.com'], // 添加需要信任的图片域名
      // remotePatterns: [{ protocol: 'https', hostname: 'picsum.photos' }], // 现代图像优化配置
      // 不需要 disableStaticImages（Next.js 13+ 已废弃此选项）
    },
    eslint: {
      ignoreDuringBuilds: true,
    },
    typescript: {
      ignoreBuildErrors: true,
    },
    webpack: (config) => {
      return config;
    },
  },
]);
    