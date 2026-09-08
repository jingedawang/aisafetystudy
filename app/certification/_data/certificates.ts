import studentsData from './students.json'

export type Track = 'technical' | 'governance'

export interface CertificateRecord {
  /** 证书唯一编号，同时作为 URL 查询参数 id */
  id: string
  /** 学员姓名（中文或拉丁字母） */
  nameZh: string
  /** 学员英文/拼音姓名（可选） */
  nameEn?: string
  /** 学习方向 */
  track: Track
  /** 期次，如「第一期」 */
  cohort: string
  /** 签发日期（ISO） */
  issuedAt: string
}

/** 本期统一属性：期次与签发日期（新一期开课时在这里改） */
const COHORT = '第一期'
const ISSUED_AT = '2026-09-07'

/** 说明段开头（两个方向共用），后接各方向的 descZh / descEn */
export const INTRO_ZH =
  '本课程由AI安全开放社区（OCASC）制作，内容借鉴了BlueDot Impact的国际版课程。学员于2026年7月6日至8月23日完成为期六周、约30小时的研读与苏格拉底式小组研讨。'

export const INTRO_EN =
  "This course is developed by the Open Community for AI Safety China (OCASC), drawing on BlueDot Impact's international curriculum. From July 6 to August 23, 2026, the earner completed six weeks of study and Socratic group discussions totaling approximately 30 hours."

export const TRACK_INFO: Record<
  Track,
  { zh: string; en: string; descZh: string; descEn: string }
> = {
  technical: {
    zh: 'AI安全技术方向',
    en: 'Technical AI Safety Track',
    descZh:
      '学员系统研习了AI安全领域的核心技术挑战与研究路线图，涵盖安全模型训练（数据过滤、RLHF 与可扩展监督）、危险能力评估、模型可解释性、AI控制等议题，并完成个人技术方向的规划，与研究导师和国际AI安全社区建立联系。',
    descEn:
      'The earner has systematically studied the core technical challenges and research roadmaps of AI safety, including safe model training (data filtering, RLHF and scalable oversight), dangerous-capability evaluations, interpretability, and AI Control, and has charted a personal direction connecting with research mentors and the global AI Safety communities.',
  },
  governance: {
    zh: '前沿AI治理方向',
    en: 'Frontier AI Governance Track',
    descZh:
      '学员系统研习了前沿AI治理中的权力结构、政策窗口与依赖关系，评估了不同治理提案的愿景与冲突，探讨了极限条件下的AI竞赛与治理、开放权重与国际治理等争议性问题，并明确了个人在该领域的切入点，与治理导师和国际AI安全社区建立联系。',
    descEn:
      'The earner has systematically studied power structures, policy windows and interdependencies in frontier AI governance, evaluated competing governance proposals, debated open-weights, development-speed and international-governance questions, and identified a personal entry point in the field, building networks with governance mentors and the global AI safety community.',
  },
}

interface StudentEntry {
  id: string
  nameZh: string
  nameEn?: string
  track: Track
}

/**
 * 证书登记簿：学员名单在 src/data/students.json（已被 .gitignore 排除，方便直接修改）。
 * 生产环境可替换为后端接口或 Airtable 查询，页面逻辑保持不变：通过 URL 参数 ?id= 检索记录。
 */
export const CERTIFICATES: CertificateRecord[] = (studentsData as StudentEntry[]).map((s) => ({
  id: s.id,
  nameZh: s.nameZh,
  nameEn: s.nameEn,
  track: s.track,
  cohort: COHORT,
  issuedAt: ISSUED_AT,
}))

export function findCertificate(id: string | null): CertificateRecord | undefined {
  if (!id) return CERTIFICATES[0]
  return CERTIFICATES.find((c) => c.id.toLowerCase() === id.trim().toLowerCase())
}

export function formatDateZh(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number)
  return `${y} 年 ${m} 月 ${d} 日`
}

export function formatDateEn(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number)
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ]
  return `${months[m - 1]} ${d}, ${y}`
}
