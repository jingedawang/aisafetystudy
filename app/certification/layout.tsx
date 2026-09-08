import type { Metadata } from "next";
import "./certification.css";

export const metadata: Metadata = {
  title: "结课证书 · OCASC 前沿 AI 安全课程",
  description:
    "OCASC 前沿 AI 安全课程结课证书验证页。Verify a certificate of completion for the OCASC Frontier AI Safety course.",
};

/**
 * 证书路由独立布局：不继承主站导航，仅加载证书专用字体与样式。
 * 字体沿用原证书站的 Google Fonts 运行时加载（next/font 需在构建期联网下载，
 * 服务器在国内构建不稳定，故保持 link 方式；React 19 会将 link 提升至 <head>）。
 */
export default function CertificationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,500&family=Noto+Serif+SC:wght@400;600;700;900&display=swap"
        rel="stylesheet"
      />
      {children}
    </>
  );
}
