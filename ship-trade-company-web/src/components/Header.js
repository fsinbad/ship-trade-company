import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
    const { t } = useTranslation('common');
    const router = useRouter();

    const createLocalizedLink = (path, locale) => {
      // 标准化路径（确保以/开头）
      let normalizedPath = path.startsWith('/') ? path : `/${path}`
      
      // 移除所有可能存在的语言前缀
      normalizedPath = normalizedPath.replace(/^\/(en|zh)(\/|$)/, '')
      
      // 处理空路径情况
      if (normalizedPath === '') normalizedPath = '/'
      
      // 确保路径不以/结尾（除非是根路径）
      normalizedPath = normalizedPath !== '/' ? normalizedPath.replace(/\/$/, '') : normalizedPath
      
      return `/${locale}${normalizedPath}`
    }

    return (
        <motion.header
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-blue-900 sticky top-0 z-50 bg-white bg-opacity-60"
        >
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center space-x-2"
                >
                    <Link href={createLocalizedLink('/', router.locale)} passHref className="flex items-center space-x-2">
                        <Image
                            src="/images/logo.webp"
                            width={100}
                            height={35}
                            loading="lazy"
                            alt={t('header.logo_alt')}
                        />
                        <h1 className="text-2xl font-bold main-color" style={{ marginLeft: '20px' }}>
                            {t('company_name')}
                        </h1>
                    </Link>
                </motion.div>
                <nav>
                    <motion.ul
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="flex space-x-16"
                    >
                        <motion.li whileHover={{ scale: 1.1 }} className="relative group">
                            <Link href={createLocalizedLink('/', router.locale)} passHref legacyBehavior>
                                <a className="hover:text-blue-600 transition duration-300 main-color font-medium">
                                    {t('nav.home')}
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                                </a>
                            </Link>
                        </motion.li>

                        <motion.li whileHover={{ scale: 1.1 }} className="relative group">
                            <Link href={createLocalizedLink('/products', router.locale)} passHref legacyBehavior>
                                <a className="hover:text-blue-600 transition duration-300 main-color font-medium">
                                    {t('nav.products')}
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                                </a>
                            </Link>
                        </motion.li>

                        <motion.li whileHover={{ scale: 1.1 }} className="relative group">
                            <Link href={createLocalizedLink('/about', router.locale)} passHref legacyBehavior>
                                <a className="hover:text-blue-600 transition duration-300 main-color font-medium">
                                    {t('nav.about_us')}
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                                </a>
                            </Link>
                        </motion.li>

                        <motion.li whileHover={{ scale: 1.1 }} className="relative group">
                            <Link href={createLocalizedLink('/ContactUs', router.locale)} passHref legacyBehavior>
                                <a className="hover:text-blue-600 transition duration-300 main-color font-medium">
                                    {t('nav.contact_us')}
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                                </a>
                            </Link>
                        </motion.li>
                    </motion.ul>
                </nav>
                <LanguageSwitcher />
            </div>
        </motion.header>
    );
}    