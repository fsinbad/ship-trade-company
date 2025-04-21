import Image from 'next/image';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function Products() {
  const { t } = useTranslation('common');
  const [searchTerm, setSearchTerm] = useState('');
  const [inputValue, setInputValue] = useState('');

  const products = t('products.items', { returnObjects: true });

  const filteredProducts = products.filter(product => 
    product.name.includes(searchTerm) || product.type.includes(searchTerm)
  );

  const handleSearch = () => {
    setSearchTerm(inputValue);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="flex-grow">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="product-img"
        ></motion.div>
      </div>

      <main className="flex-grow py-20">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl font-bold mb-8 text-center text-blue-900"
          >
            {t('products.title')}
          </motion.h2>

          <div className="mb-8 text-right flex justify-end items-center">
            <motion.input
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              type="text"
              placeholder={t('products.search_placeholder')}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="p-2 border border-gray-300 rounded-lg w-1/4 mr-2"
            />
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              onClick={handleSearch}
              className="p-2 bg-blue-600 text-white rounded-lg pl-4 pr-4"
            >
              {t('products.search_button')}
            </motion.button>
          </div>

          {filteredProducts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center text-red-500 mb-4"
              style={{ minHeight: '100px' }}
            >
              {t('products.no_results')}
            </motion.div>
          )}

          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 ${filteredProducts.length === 0 ? 'min-h-screen' : ''}`} 
               style={{ paddingBottom: filteredProducts.length === 0 ? '100px' : '0' }}>
            {filteredProducts.map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                whileHover={{ scale: 1.05, rotateY: 5 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <Image 
                  src={`/images/product-img${index < 9 ? '0' + (index + 1) : index + 1}.webp`}
                  alt={product.name}
                  width={300}
                  height={200}
                  loading="lazy"
                  className="w-full object-cover"
                  style={{ height: "300px" }}
                />
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="p-4"
                >
                  <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-2">
                    {t('products.type')}{product.type}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
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