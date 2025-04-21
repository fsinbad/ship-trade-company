import { Wrench, Zap, Package } from 'lucide-react';
import Image from 'next/image';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function About() {
  const { t } = useTranslation('common');
  const services = t('about.services', { returnObjects: true });

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="flex-grow">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="header-about"
        ></motion.div>
      </div>

      <main className="flex-grow py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-center"
          >
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="md:w-1/2 mb-8 md:mb-0"
            >
              <Image
                src="/images/company-overview.webp"      
                alt={t('about.company_image_alt')}
                width={500}
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
              className="md:w-1/2"
            >
              {t('about.company_description', { returnObjects: true }).map((paragraph, index) => (
                <p key={index} className="text-lg mb-4">
                  {paragraph}
                </p>
              ))}
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <h3 className="text-3xl font-bold mb-8 text-center main-color">
              {t('about.services_title')}
            </h3>
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
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export async function getStaticProps(context) {
  const locale = context.locale || 'zh' // 添加fallback
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  }
}