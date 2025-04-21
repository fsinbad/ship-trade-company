import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { appWithTranslation } from 'next-i18next';
import nextI18NextConfig from '../../next-i18next.config'; // 确保路径正确
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    // 只在客户端执行
    if (typeof window !== 'undefined') {
      // 检查是否根路径且无语言前缀
      const path = router.asPath;
      const hasNoLocale = !path.startsWith('/zh') && !path.startsWith('/en');
      console.log(path, hasNoLocale,"000000000");
      
      // 如果是根路径且没有语言前缀，强制跳转到中文
      if (path === '/' && hasNoLocale) {
        router.replace('/', undefined, { locale: 'zh', shallow: true });
      }
    }
  }, [router.asPath]); // 监听路由变化

  return <Component {...pageProps} />;
}

// 使用 appWithTranslation 包裹并传入配置
export default appWithTranslation(MyApp, nextI18NextConfig);