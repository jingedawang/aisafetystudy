import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 证书页历史链接带尾斜杠（/certification/），旧访问者浏览器缓存了到该地址的 301。
  // 关闭 Next 的尾斜杠 308 规范化，让两种形式都直接 200，避免与旧缓存形成重定向循环。
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
