import Link from 'next/link'
import { useRouter } from 'next/router'

export default function LocalizedLink({ href, children, ...props }) {
  const router = useRouter()
  const isCurrentLang = href.startsWith(`/${router.locale}`)
  
  return (
    <Link 
      href={isCurrentLang ? href : `/${router.locale}${href}`}
      {...props}
    >
      {children}
    </Link>
  )
}