import { useEffect, useRef, useState } from 'react'
import Seal from './Seal'
import {
  INTRO_EN,
  INTRO_ZH,
  TRACK_INFO,
  formatDateEn,
  formatDateZh,
  type CertificateRecord,
} from '../_data/certificates'

interface CertificateCardProps {
  record: CertificateRecord
}

/** 证书画布尺寸：A4 竖版 210×297mm 在 96dpi 下的精确像素 */
export const CARD_W = 794
export const CARD_H = 1123

/**
 * 证书本体：固定 A4 比例画布，网页端按容器宽度等比缩放，
 * 打印时 1:1 输出（PDF 页面尺寸 = 证书尺寸，无任何背景留白）。
 */
export default function CertificateCard({ record }: CertificateCardProps) {
  const track = TRACK_INFO[record.track]
  const outerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const el = outerRef.current
    if (!el) return
    const update = () => setScale(Math.min(1, el.clientWidth / CARD_W))
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return (
    <div
      ref={outerRef}
      className="w-full max-w-[794px] mx-auto print:h-auto! print:max-w-none"
      style={{ height: CARD_H * scale }}
    >
      <div
        id="certificate-card"
        className="relative bg-[#faf6ec] text-[#2b2418] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] origin-top-left print:transform-none! print:shadow-none"
        style={{ width: CARD_W, height: CARD_H, transform: `scale(${scale})` }}
      >
        {/* 烫金外框 */}
        <div className="absolute inset-3 border-2 border-[#b8934a]/70 pointer-events-none" />
        <div className="absolute inset-[18px] border border-[#b8934a]/40 pointer-events-none" />
        {/* 四角饰花 */}
        {['top-1.5 left-1.5', 'top-1.5 right-1.5 rotate-90', 'bottom-1.5 right-1.5 rotate-180', 'bottom-1.5 left-1.5 -rotate-90'].map(
          (pos) => (
            <svg key={pos} className={`absolute ${pos} w-7 h-7 text-[#b8934a]`} viewBox="0 0 24 24" fill="none">
              <path d="M2 22 V8 Q2 2 8 2 H22" stroke="currentColor" strokeWidth="1.6" />
              <path d="M6 22 V12 Q6 6 12 6 H22" stroke="currentColor" strokeWidth="0.9" />
            </svg>
          ),
        )}

        {/* 水印 */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.05]">
          <Seal size={460} />
        </div>

        <div className="relative h-full flex flex-col justify-between px-16 py-14 text-center text-autospace">
          {/* 顶部：徽章 + 机构 + 标题 */}
          <div>
            <div className="flex justify-center mb-6">
              <Seal size={140} />
            </div>
            <p className="tracking-[0.5em] text-xs text-[#8f6f2e] font-medium mb-1.5">
              AI安全开放社区 · OCASC
            </p>
            <p className="tracking-[0.3em] text-[10px] text-[#8f6f2e]/70 uppercase">
              Open Community for AI Safety · China
            </p>
            <h1 className="font-serif-sc text-[42px] leading-tight font-bold tracking-[0.2em] mt-7 mb-2">
              结课证书
            </h1>
            <p className="font-serif-en italic text-base text-[#6b5a3a] tracking-[0.25em] uppercase">
              Certificate of Completion
            </p>
          </div>

          {/* 中部：授予对象 */}
          <div>
            <div className="w-24 h-px bg-[#b8934a]/60 mx-auto mb-7" />
            <p className="text-sm text-[#6b5a3a] mb-1.5">兹证明</p>
            <p className="font-serif-en italic text-xs text-[#6b5a3a]/80 mb-5">This is to certify that</p>
            <p className="font-serif-sc text-[54px] leading-tight font-bold tracking-[0.15em] text-[#1f1a10]">
              {record.nameZh}
            </p>
            {record.nameEn && (
              <p className="font-serif-en text-xl text-[#6b5a3a] mt-2 tracking-wide">{record.nameEn}</p>
            )}
            <div className="w-40 h-px bg-[#b8934a]/50 mx-auto mt-6 mb-6" />
            <p className="text-[15px] leading-relaxed mb-3">
              {'已完成'}<span className="font-semibold">{'OCASC前沿AI安全课程（'}{record.cohort}{'）'}</span>
            </p>
            <p>
              <span className="inline-block border border-[#b8934a]/60 text-[#8f6f2e] px-4 py-1 tracking-widest text-sm">
                {track.zh}
              </span>
            </p>
          </div>

          {/* 说明段 */}
          <div className="max-w-[620px] mx-auto">
            <p className="text-[15px] leading-[2.05] text-[#4a3f2b] text-justify mb-5">
              {INTRO_ZH}
              {track.descZh}
            </p>
            <p className="font-serif-en italic text-[12.5px] leading-[1.9] text-[#6b5a3a]/85">
              {INTRO_EN} {track.descEn}
            </p>
          </div>

          {/* 底部：日期 / 编号 / 签名 */}
          <div className="grid grid-cols-3 gap-4 items-end text-left max-w-[620px] w-full mx-auto">
            <div>
              <p className="text-[10px] tracking-widest text-[#8f6f2e] uppercase mb-1.5">签发日期 · Issued</p>
              <p className="text-sm font-medium">{formatDateZh(record.issuedAt)}</p>
              <p className="font-serif-en italic text-[11px] text-[#6b5a3a] mt-0.5">{formatDateEn(record.issuedAt)}</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] tracking-widest text-[#8f6f2e] uppercase mb-1.5">证书编号 · Certificate ID</p>
              <p className="font-mono text-sm font-semibold tracking-wider">{record.id}</p>
              <p className="text-[10px] text-[#6b5a3a]/70 mt-1">aisafety-cn.com</p>
            </div>
            <div className="text-right">
              <p className="font-serif-en italic text-xl text-[#4a3f2b] leading-none mb-1.5">OCASC</p>
              <div className="w-full h-px bg-[#2b2418]/40 mb-1.5" />
              <p className="text-[10px] tracking-widest text-[#8f6f2e] uppercase">课程委员会 · Faculty Board</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
