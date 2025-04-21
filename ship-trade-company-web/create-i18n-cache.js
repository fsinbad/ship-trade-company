// scripts/create-i18n-cache.js
const fs = require('fs')
const path = require('path')

const localesPath = path.join(__dirname, './public/locales')
const cachePath = path.join(__dirname, './.next/cache/i18n')

if (!fs.existsSync(cachePath)) {
  fs.mkdirSync(cachePath, { recursive: true })
}

// 复制语言文件到构建缓存
fs.cpSync(localesPath, cachePath, { recursive: true })