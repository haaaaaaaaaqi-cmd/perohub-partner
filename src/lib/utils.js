import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * 合并 Tailwind CSS 类名工具函数
 * 基于 clsx 和 tailwind-merge，自动处理类名冲突
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

// 头像渐变色板（柔和、适合做圆形背景）
const AVATAR_GRADIENTS = [
  ['#f472b6', '#fb7185'], // 粉-玫红
  ['#60a5fa', '#818cf8'], // 蓝-靛
  ['#34d399', '#22d3ee'], // 绿-青
  ['#fbbf24', '#fb923c'], // 黄-橙
  ['#a78bfa', '#c084fc'], // 紫
  ['#f87171', '#fbbf24'], // 红-黄
  ['#22d3ee', '#3b82f6'], // 青-蓝
  ['#4ade80', '#a3e635'], // 绿-黄绿
  ['#fb923c', '#f43f5e'], // 橙-红
  ['#a3e635', '#22d3ee']  // 黄绿-青
]

/**
 * 简单字符串哈希，用于稳定地选取渐变色板
 */
function hashString(str) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash)
}

/**
 * 取名字的首字（中文取第一个字，英文取首字母大写）
 */
function getInitial(name) {
  if (!name) return '?'
  const trimmed = name.trim()
  if (!trimmed) return '?'
  // 中文取第一个字符
  const first = trimmed.charAt(0)
  if (/[\u4e00-\u9fa5]/.test(first)) return first
  // 英文取首字母大写
  const match = trimmed.match(/[a-zA-Z]/)
  return match ? match[0].toUpperCase() : first.toUpperCase()
}

/**
 * 根据名字生成纯本地 SVG 头像 data URI（不依赖外网）
 * @param {string} name 拍档名称
 * @param {string} seed 用于稳定选色的种子（默认用 name）
 * @returns {string} SVG data URI
 */
export function getAvatarDataUri(name, seed) {
  const s = (seed || name || '?').toString()
  const pair = AVATAR_GRADIENTS[hashString(s) % AVATAR_GRADIENTS.length]
  const initial = getInitial(name)
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 150 150">` +
    `<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">` +
    `<stop offset="0%" stop-color="${pair[0]}"/>` +
    `<stop offset="100%" stop-color="${pair[1]}"/>` +
    `</linearGradient></defs>` +
    `<rect width="150" height="150" rx="75" fill="url(#g)"/>` +
    `<text x="75" y="75" dominant-baseline="central" text-anchor="middle" ` +
    `font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" ` +
    `font-size="64" font-weight="600" fill="#ffffff">${initial}</text>` +
    `</svg>`
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg)
}

/**
 * 判断头像 URL 是否是外网 pravatar 图片（在沙箱/离线环境下不可用）
 */
export function isRemoteAvatar(url) {
  return !!url && /pravatar\.cc|i\.pravatar|pravatar/.test(url)
}
