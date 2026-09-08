'use client'

import { useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import CertificateCard from './_components/CertificateCard'
import VerificationPanel from './_components/VerificationPanel'
import OcascLogo from './_components/OcascLogo'
import { findCertificate } from './_data/certificates'

function Header() {
  return (
    <header className="relative z-10 border-b border-white/10 print:hidden">
      <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">
        <a href="https://aisafety-cn.com/" target="_blank" rel="noreferrer" className="flex items-center gap-3 group">
          <span className="flex h-9 w-9 items-center justify-center">
            <OcascLogo size={34} color="#d4b878" />
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-semibold text-slate-100 group-hover:text-amber-200 transition-colors">
              AI 安全开放社区
            </span>
            <span className="block text-[11px] text-slate-400 tracking-widest">OCASC · aisafety-cn.com</span>
          </span>
        </a>
        <nav className="text-xs text-slate-400 tracking-widest hidden sm:block">
          证书验证 · CERTIFICATE VERIFICATION
        </nav>
      </div>
    </header>
  )
}

function NotFound({ id }: { id: string }) {
  return (
    <div className="relative z-10 max-w-md mx-auto mt-24 text-center border border-white/10 bg-white/[0.03] rounded-xl p-10">
      <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-red-400/10">
        <svg className="w-7 h-7 text-red-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M15 9l-6 6M9 9l6 6" />
        </svg>
      </div>
      <h2 className="text-lg font-semibold text-slate-100 mb-2">未找到该证书</h2>
      <p className="text-sm text-slate-400 leading-6 mb-1">
        证书编号 <span className="font-mono text-red-300/90">{id}</span> 不存在或尚未签发。
      </p>
      <p className="text-sm text-slate-500 leading-6">
        请核对链接是否完整；如有疑问请联系 OCASC 课程委员会。
      </p>
      <a
        href="https://aisafety-cn.com/"
        target="_blank"
        rel="noreferrer"
        className="inline-block mt-6 rounded-md border border-white/15 hover:border-white/30 px-5 py-2 text-sm text-slate-200 transition-colors"
      >
        返回 aisafety-cn.com
      </a>
    </div>
  )
}

export default function CertificatePage() {
  const searchParams = useSearchParams()
  const rawId = searchParams.get('id')
  const record = useMemo(() => findCertificate(rawId), [rawId])

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-slate-200 flex flex-col print:bg-white">
      <Header />

      <main className="relative z-10 flex-1 w-full max-w-6xl mx-auto px-5 py-10 sm:py-14">
        {rawId && !record ? (
          <NotFound id={rawId} />
        ) : record ? (
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start">
            <CertificateCard record={record} />
            <VerificationPanel record={record} />
          </div>
        ) : null}
      </main>

      <footer className="relative z-10 border-t border-white/10 print:hidden">
        <div className="max-w-6xl mx-auto px-5 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500">
          <p>© 2026 AI安全开放社区（OCASC）</p>
          <p className="tracking-widest">TOWARD A SAFER FUTURE FOR AI</p>
        </div>
      </footer>
    </div>
  )
}
