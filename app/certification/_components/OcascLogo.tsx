interface OcascLogoProps {
  size?: number
  color?: string
  className?: string
}

/**
 * OCASC 官方 logo 的 SVG 复刻（按原图逐像素测量重建）：
 * - 圆环由四段不等长圆弧组成（约 74° / 72° / 66° / 71°），
 *   四个正方向的缺口大小不等（约 18° / 20° / 24° / 15°）；
 * - 每个缺口处有一对长短刻度线，整体呈 180° 旋转对称。
 * 共享的 Mark 供徽章等场景嵌套缩放使用。
 */
export function OcascLogoMark({ color = 'currentColor' }: { color?: string }) {
  return (
    <>
      <g fill="none" stroke={color} strokeWidth="9">
        <path d="M 82.2 45.5 A 32.5 32.5 0 0 0 54.5 17.8" />
        <path d="M 44.4 18.0 A 32.5 32.5 0 0 0 17.8 45.5" />
        <path d="M 18.2 56.8 A 32.5 32.5 0 0 0 43.2 81.8" />
        <path d="M 56.8 81.8 A 32.5 32.5 0 0 0 82.3 53.9" />
      </g>
      <g stroke={color} strokeWidth="3" strokeLinecap="round">
        {/* 顶部：长刻度在右 */}
        <line x1="51" y1="6" x2="51" y2="18" />
        <line x1="47.5" y1="9" x2="47.5" y2="15" />
        {/* 底部：长刻度在左（180° 旋转对称） */}
        <line x1="49" y1="82" x2="49" y2="94" />
        <line x1="52.5" y1="85" x2="52.5" y2="91" />
        {/* 左侧：长刻度在上 */}
        <line x1="6" y1="48.5" x2="18" y2="48.5" />
        <line x1="9" y1="51.5" x2="15" y2="51.5" />
        {/* 右侧：长刻度在下 */}
        <line x1="82" y1="51" x2="94" y2="51" />
        <line x1="85" y1="47.5" x2="91" y2="47.5" />
      </g>
    </>
  )
}

export default function OcascLogo({ size = 36, color = 'currentColor', className = '' }: OcascLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      role="img"
      aria-label="OCASC logo"
    >
      <OcascLogoMark color={color} />
    </svg>
  )
}
