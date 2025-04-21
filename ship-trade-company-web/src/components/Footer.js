import { Phone, Mail } from 'lucide-react';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';

export default function Footer() {
  const { t } = useTranslation('common');

  return (
    <footer 
      className="bg-gray-900 text-white py-16 bg-cover bg-center relative"
      style={{ backgroundImage: "url('/images/footer-bg.png')" }}
    >
      <div className="container mx-auto px-4 pb-8">
        <h2 className="text-3xl font-bold mb-8 text-center">
          {t('footer.contact_title')}
        </h2>
        <div className="text-center">
          <p className="mb-4">
            {t('footer.contact_description')}
          </p>
          <div className="flex justify-center items-center mb-2">
            <Phone className="h-5 w-5 mr-2" />
            <span>{t('footer.phone')}</span>
          </div>
          <div className="flex justify-center items-center">
            <Mail className="h-5 w-5 mr-2" />
            <span>{t('footer.email')}</span>
          </div>
        </div>
        
        <div className="bg-black py-4 mt-8 flex items-center justify-center absolute left-0 bottom-0 w-full">
          <p className="text-center text-sm">
            <span className="mr-4">
              {t('footer.copyright', { company: t('company_name') })}
            </span>
            <Image 
              src="/images/beian-logo.png" 
              alt={t('footer.beian_logo_alt')} 
              width={20} 
              height={22} 
              loading="lazy"  
              className="inline-block mr-1" 
            />
            <a 
              href="http://beian.miit.gov.cn" 
              className="text-center text-sm mr-4"
            >
              {t('footer.beian_number')}
            </a>
            <span>{t('footer.tech_support')}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}