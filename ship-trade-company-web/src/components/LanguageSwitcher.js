import { useRouter } from 'next/router';


export default function LanguageSwitcher() {
    const router = useRouter();

    const switchLanguage = (newLocale) => {
      const { pathname, query, asPath } = router;
      
      // 获取当前路径（不含语言前缀）
      const pathWithoutLocale = asPath.split('/').slice(2).join('/') || '/';
      
      // 构建新路径
      const newPath = {
        pathname: router.pathname, // 保持原路由
        query: { ...query },      // 保持原查询参数
      };
      
      // 使用Next.js内置方法切换语言
      router.push(
        newPath,
        pathWithoutLocale, 
        { locale: newLocale }
      );
    };

    return (
        <div className="flex space-x-2">
            <button
                onClick={() => switchLanguage('zh')}
                className={router.locale === 'zh' ? 'text-blue-600 font-bold' : 'text-gray-500'}
            >
                中文
            </button>
            <span className="text-gray-500">/</span>
            <button
                onClick={() => switchLanguage('en')}
                className={router.locale === 'en' ? 'text-blue-600 font-bold' : 'text-gray-500'}
            >
                English
            </button>
        </div>
    );
}