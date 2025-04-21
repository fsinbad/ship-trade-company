import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function ContactUs() {
  const { t } = useTranslation('common');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    details: '',
    confirmContent: false,
    captchaInput: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    subject: '',
    details: '',
    captcha: ''
  });

  const [captchaText, setCaptchaText] = useState('');

  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789';
    let text = '';
    for (let i = 0; i < 6; i++) {
      text += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaText(text);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const sanitizeInput = (input) => {
    return input.replace(/[<>;'"()]/g, '');
  };

  const validateForm = () => {
    let newErrors = {};
    let isValid = true;

    formData.name = sanitizeInput(formData.name);
    formData.email = sanitizeInput(formData.email);
    formData.subject = sanitizeInput(formData.subject);
    formData.details = sanitizeInput(formData.details);
    formData.captchaInput = sanitizeInput(formData.captchaInput);

    if (formData.name.length > 20) {
      newErrors.name = t('contact.errors.name_length');
      isValid = false;
    }

    if (!formData.email.includes('@') || formData.email.length > 30) {
      newErrors.email = t('contact.errors.email_invalid');
      isValid = false;
    }

    if (formData.subject.length > 20) {
      newErrors.subject = t('contact.errors.subject_length');
      isValid = false;
    }

    if (formData.details.length > 300) {
      newErrors.details = t('contact.errors.details_length');
      isValid = false;
    }

    if (formData.captchaInput?.toLowerCase() !== captchaText.toLowerCase()) {
      newErrors.captcha = t('contact.errors.captcha_invalid');
      isValid = false;
      generateCaptcha();
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.confirmContent) {
      alert(t('contact.confirm_alert'));
      return;
    }

    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch('/api/sendMail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert(t('contact.success_alert'));
        setFormData({
          name: '',
          email: '',
          subject: '',
          details: '',
          confirmContent: false,
          captchaInput: '',
        });
        generateCaptcha();
        setErrors({});
      } else {
        alert(t('contact.error_alert'));
      }
    } catch (error) {
      console.error('Error:', error);
      alert(t('contact.error_alert'));
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
          className="header-contact"
        ></motion.div>
      </div>

      <main className="flex-grow py-20">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="container mx-auto px-4"
        >
          <h2 className="text-3xl font-bold mb-8 text-center main-color">
            {t('contact.title')}
          </h2>
          
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                {t('contact.labels.name')}
              </label>
              <motion.input
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                {t('contact.labels.email')}
              </label>
              <motion.input
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                {t('contact.labels.subject')}
              </label>
              <motion.input
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
            </div>

            <div className="mb-1">
              <label htmlFor="details" className="block text-sm font-medium text-gray-700">
                {t('contact.labels.details')}
              </label>
              <motion.textarea
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                id="details"
                name="details"
                value={formData.details}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.details && <p className="text-red-500 text-sm mt-1">{errors.details}</p>}
            </div>
            
            <div className="flex mb-1 justify-end">
              <small className="text-gray-500">{t('contact.char_limit')}</small>
            </div>

            <div className="mb-4">
              <label htmlFor="captchaInput" className="block text-sm font-medium text-gray-700">
                {t('contact.labels.captcha')}
              </label>
              <div className="flex items-center space-x-4">
                <motion.input
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                  type="text"
                  id="captchaInput"
                  name="captchaInput"
                  value={formData.captchaInput}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-3/4 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                <div 
                  className="text-xl font-bold bg-gray-100 p-2 rounded-md cursor-pointer ml-2 pl-4 pr-4 w-1/4 flex justify-center"
                  onClick={generateCaptcha}
                >
                  {captchaText}
                </div>
              </div>
              {errors.captcha && <p className="text-red-500 text-sm mt-1">{errors.captcha}</p>}
              <small className="text-gray-500">{t('contact.refresh_captcha')}</small>
            </div>

            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                id="confirmContent"
                name="confirmContent"
                checked={formData.confirmContent}
                onChange={handleChange}
                required
                className="mr-2"
              />
              <label htmlFor="confirmContent" className="text-sm text-gray-700">
                {t('contact.labels.confirm')}
              </label>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-full font-bold hover:bg-blue-700 transition duration-300"
            >
              {t('contact.submit')}
            </motion.button>
          </form>
        </motion.div>
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