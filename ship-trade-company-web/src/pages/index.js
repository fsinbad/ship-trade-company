import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Image from 'next/image';
import { Wrench, Zap, Package } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Carousel } from 'react-responsive-carousel';
import { motion } from 'framer-motion';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Head from 'next/head';

const createLocalizedLink = (path, locale) => {
  // 标准化路径（确保以/开头）
  let normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  // 移除所有可能存在的语言前缀
  normalizedPath = normalizedPath.replace(/^\/(en|zh)(\/|$)/, '');
  
  // 处理空路径情况
  if (normalizedPath === '') normalizedPath = '/';
  
  // 确保路径不以/结尾（除非是根路径）
  normalizedPath = normalizedPath !== '/' ? normalizedPath.replace(/\/$/, '') : normalizedPath;
  
  return `/${locale}${normalizedPath}`;
};

export default function Home() {
    const { t } = useTranslation('common');
    const router = useRouter();

    const services = t('home.services', { returnObjects: true });
    const shorePowerContent = t('home.shore_power.content', { returnObjects: true });
    const products = t('home.products.items', { returnObjects: true });

    return (
        <div className="flex flex-col min-h-screen">
            <Head>
                <title>{t('company_name')}</title>
                <meta name="description" content={t('company_description')} />
                <link rel="icon" href="/images/favicon.ico" />
            </Head>

            <Header />

            <div className="relative" style={{ top: '0px' }}>
                <section id="home" className="py-20 min-h-[calc(100vh)]">
                    <div className="container mx-auto px-4 text-center">
                        <motion.h1
                            initial={{ opacity: 0, y: -50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                            className="text-5xl font-bold mb-4 text-white"
                        >
                            {t('home.hero_title')}
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 1 }}
                            className="text-xl mb-6 text-white font-bold"
                        >
                            {t('home.hero_subtitle')}
                        </motion.p>

                        <Link
                            href={createLocalizedLink('/ContactUs', router.locale)}
                            className="inline-flex items-center justify-center px-6 py-3 bg-blue-500 text-white text-base font-medium rounded-full shadow-md hover:bg-blue-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-all duration-300 ease-in-out transform hover:scale-105"
                        >
                            <motion.div
                                initial={{ opacity: 0, y: -50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 1 }}
                            >
                                {t('contact_us')}
                            </motion.div>
                        </Link>
                    </div>
                </section>
                <Carousel
                    autoPlay
                    infiniteLoop
                    showThumbs={false}
                    showStatus={false}
                    showArrows={true}
                    interval={5000}
                    height="600px"
                >
                    {[1, 2, 3].map((item) => (
                        <div key={item} style={{ position: 'relative', height: '600px' }}>
                            <Image
                                src={`/images/home${item}.webp`}
                                alt={t(`carousel.alt${item}`)}
                                layout="fill"
                                objectFit={item === 3 ? "fill" : "cover"}
                                quality={100}
                                loading="lazy"
                            />
                        </div>
                    ))}
                </Carousel>
            </div>

            <main className="flex-grow">
                <section id="services" className="bg-gray-100 py-20">
                    <div className="container mx-auto px-4">
                        <motion.h2
                            initial={{ opacity: 0, y: -50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                            viewport={{ once: true }}
                            className="text-3xl font-bold mb-8 text-center main-color"
                        >
                            {t('home.services_title')}
                        </motion.h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                            {services.map((service, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.5 }}
                                    viewport={{ once: true }}
                                    className="bg-white p-6 rounded-lg shadow-md flex flex-col items-start max-h-[300px]"
                                >
                                    <div className='flex items-center mb-4'>
                                        {index === 0 && <Wrench className="h-6 w-6 text-blue-800 mr-3" />}
                                        {index === 1 && <Zap className="h-6 w-6 text-blue-800 mr-3" />}
                                        {index === 2 && <Package className="h-6 w-6 text-blue-800 mr-3" />}
                                        <h3 className="text-2xl font-bold">{service.title}</h3>
                                    </div>
                                    <p className="text-lg text-gray-700">{service.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                        <div className="text-center mt-8">
                            <Link href={createLocalizedLink('/about', router.locale)} className="text-blue-600 hover:underline">
                                {t('home.view_all_services')}
                            </Link>
                        </div>
                    </div>
                </section>

                <section id="shore-power" className="py-10">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        viewport={{ once: true }}
                        className="container mx-auto px-4"
                    >
                        <h2 className="text-3xl font-bold main-color flex justify-center py-10">
                            {t('home.shore_power.title')}
                        </h2>
                        <div className="flex flex-col md:flex-row items-start justify-between">
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 1 }}
                                viewport={{ once: true }}
                                className="mb-8 md:mb-0 md:w-1/2"
                            >
                                <Image
                                    src="/images/andian.webp"
                                    alt={t('home.shore_power.image_alt')}
                                    width={800}
                                    height={300}
                                    className="rounded-lg shadow-lg object-cover"
                                    loading="lazy"
                                />
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1 }}
                                viewport={{ once: true }}
                                className="md:pl-8 md:w-1/2"
                                style={{ height: '500px', overflowY: 'auto' }}
                            >
                                {shorePowerContent.map((paragraph, index) => (
                                    <p key={index} className="text-lg mb-1">
                                        {paragraph}
                                    </p>
                                ))}
                            </motion.div>
                        </div>
                    </motion.div>
                </section>

                <section id="products" className="py-10">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold mb-8 text-center main-color">
                            {t('home.products.title')}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {products.map((product, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5 }}
                                    whileHover={{ scale: 1.05, rotateY: 10 }}
                                    viewport={{ once: true }}
                                    className="bg-white rounded-lg shadow-md overflow-hidden"
                                >
                                    <Image
                                        src={`/images/product-img${index < 9 ? '0' + (index + 1) : index + 1}.webp`}
                                        alt={product.name}
                                        width={280}
                                        height={200}
                                        className="w-full object-cover"
                                        loading="lazy"
                                        style={{ height: "300px" }}
                                    />
                                    <div className="p-4">
                                        <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                                        <p className="text-gray-600 mb-2">
                                            {t('home.products.type')}{product.type}
                                        </p>
                                        <Link href={createLocalizedLink('/products', router.locale)} className="text-blue-600 hover:underline">
                                            <motion.div whileHover={{ color: "#1E90FF" }}>
                                                {t('home.products.view_details')}
                                            </motion.div>
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}

export async function getStaticProps(context) {
    const locale = context.locale || 'zh';
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
        },
    };
}    