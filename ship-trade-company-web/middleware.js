// middleware.js
import { NextResponse } from 'next/server'

export function middleware(request) {
  const pathname = request.nextUrl.pathname
  const locales = ['en', 'zh']
  
  // 如果直接访问根路径，重定向到默认语言
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/zh', request.url))
  }

  // 确保路径包含有效语言前缀
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (!pathnameHasLocale) {
    const locale = 'zh' // 默认语言
    return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url))
  }

  return NextResponse.next()
}