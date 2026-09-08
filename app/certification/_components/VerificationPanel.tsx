import { useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import {
  TRACK_INFO,
  formatDateZh,
  type CertificateRecord,
} from '../_data/certificates'

interface VerificationPanelProps {
  record: CertificateRecord
}

const BASE_URL = 'https://aisafety-cn.com/certification'

export default function VerificationPanel({ record }: VerificationPanelProps) {
  const [copied, setCopied] = useState(false)
  const verifyUrl =
    typeof window !== 'undefined' && window.location.hostname === 'localhost'
      ? `${window.location.origin}${window.location.pathname}?id=${record.id}`
      : `${BASE_URL}?id=${record.id}`

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(verifyUrl)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = verifyUrl
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const track = TRACK_INFO[record.track]

  return (
    <aside className="w-full lg:w-80 shrink-0 space-y-5 print:hidden">
      {/* 验证状态 */}
      <div className="border border-white/10 bg-white/[0.03] rounded-lg p-5">
        <div className="flex items-center gap-2.5 mb-4">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-300/15">
            <svg className="text-amber-200" viewBox="0 0 20 20" fill="currentColor" width="18" height="18">
              <path
                fillRule="evenodd"
                d="M16.7 5.3a1 1 0 010 1.4l-8 8a1 1 0 01-1.4 0l-4-4a1 1 0 111.4-1.4L8 12.6l7.3-7.3a1 1 0 011.4 0z"
                clipRule="evenodd"
              />
            </svg>
          </span>
          <div>
            <p className="text-slate-100 font-semibold text-sm">证书有效</p>
            <p className="text-slate-400 text-xs">Certificate Verified</p>
          </div>
        </div>
        <dl className="space-y-2.5 text-sm">
          {[
            ['持证人', `${record.nameZh}${record.nameEn ? ` · ${record.nameEn}` : ''}`],
            ['课程', `前沿 AI 安全课程 · ${record.cohort}`],
            ['方向', track.zh],
            ['签发日期', formatDateZh(record.issuedAt)],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between gap-4">
              <dt className="text-slate-400 shrink-0">{k}</dt>
              <dd className="text-slate-200 text-right">{v}</dd>
            </div>
          ))}
          <div className="flex justify-between gap-4">
            <dt className="text-slate-400 shrink-0">证书编号</dt>
            <dd className="font-mono text-amber-200/90 text-right text-[13px]">{record.id}</dd>
          </div>
        </dl>
      </div>

      {/* 二维码 */}
      <div className="border border-white/10 bg-white/[0.03] rounded-lg p-5 flex items-center gap-4">
        <div className="bg-white p-2 rounded">
          <QRCodeSVG value={verifyUrl} size={88} level="M" />
        </div>
        <div className="text-xs text-slate-400 leading-5">
          <p className="text-slate-200 font-medium mb-1">扫码验证真伪</p>
          <p className="break-all">{verifyUrl}</p>
        </div>
      </div>

      {/* 分享操作 */}
      <div className="grid grid-cols-2 gap-2.5">
        <button
          onClick={copyLink}
          className="rounded-md bg-amber-300/90 hover:bg-amber-300 text-[#1a1408] text-sm font-semibold py-2.5 transition-colors"
        >
          {copied ? '✓ 已复制' : '复制证书链接'}
        </button>
        <button
          onClick={() => window.print()}
          className="rounded-md border border-white/15 hover:border-white/30 text-slate-200 text-sm py-2.5 transition-colors"
        >
          打印 / 存为 PDF
        </button>
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(verifyUrl)}`}
          target="_blank"
          rel="noreferrer"
          className="rounded-md border border-white/15 hover:border-white/30 text-slate-200 text-sm py-2.5 text-center transition-colors"
        >
          分享到 LinkedIn
        </a>
        <a
          href="https://aisafety-cn.com/"
          target="_blank"
          rel="noreferrer"
          className="rounded-md border border-white/15 hover:border-white/30 text-slate-200 text-sm py-2.5 text-center transition-colors"
        >
          访问 aisafety-cn.com
        </a>
      </div>

      <p className="text-[11px] leading-5 text-slate-500">
        本证书由 AI安全开放社区（OCASC）签发，可通过上方链接或二维码核验。如有疑问请联系课程委员会。
      </p>
    </aside>
  )
}
