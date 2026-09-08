import { OcascLogoMark } from './OcascLogo'

interface SealProps {
  size?: number
  className?: string
}

/**
 * OCASC 证书徽章：烫金双环 + 环形文字 + 中心 OCASC logo。
 * 中心 logo 放大至徽章内环，保证四对长短刻度清晰可辨。
 */
export default function Seal({ size = 128, className = '' }: SealProps) {
  const id = `seal-${size}`
  const gold = '#b8934a'
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      className={className}
      role="img"
      aria-label="OCASC 证书徽章"
    >
      <defs>
        <path id={`${id}-top`} d="M 100,100 m -74,0 a 74,74 0 1,1 148,0 a 74,74 0 1,1 -148,0" />
      </defs>

      {/* 外圈双环 + 内环 */}
      <circle cx="100" cy="100" r="97" fill="none" stroke={gold} strokeWidth="2.5" />
      <circle cx="100" cy="100" r="91" fill="none" stroke={gold} strokeWidth="1" />
      <circle cx="100" cy="100" r="52" fill="none" stroke={gold} strokeWidth="1" />

      {/* 环形文字 */}
      <text
        fill={gold}
        fontSize="12.5"
        fontFamily="'Cormorant Garamond', 'Noto Serif SC', serif"
        letterSpacing="2.5"
      >
        <textPath href={`#${id}-top`}>
          OCASC · AI 安全开放社区 · FRONTIER AI SAFETY ·
        </textPath>
      </text>

      {/* 中心：OCASC logo（放大至内环，刻度清晰可见） */}
      <svg x="48" y="48" width="104" height="104" viewBox="0 0 100 100">
        <OcascLogoMark color={gold} />
      </svg>
    </svg>
  )
}
