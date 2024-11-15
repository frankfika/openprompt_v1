import "@/styles/globals.css";
import type { Metadata } from "next";
import { Kalam } from 'next/font/google';

const kalam = Kalam({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-kalam',
});

export const metadata: Metadata = {
  title: "Prompt Hub - AI Prompts Collection",
  description: "发现和分享优质的 AI 提示词，让 AI 创作更加简单高效。",
  keywords: "AI, Prompts, ChatGPT, Midjourney, DALL-E, AI绘画, AI写作",
  authors: [{ name: "Prompt Hub Team" }],
  openGraph: {
    title: "Prompt Hub - AI Prompts Collection",
    description: "发现和分享优质的 AI 提示词，让 AI 创作更加简单高效。",
    type: "website",
    locale: "zh_CN",
    siteName: "Prompt Hub",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prompt Hub - AI Prompts Collection",
    description: "发现和分享优质的 AI 提示词，让 AI 创作更加简单高效。",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  themeColor: "#0EA5E9",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh" className={kalam.variable} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          rel="preload"
          href="/fonts/mono.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <div className="relative min-h-screen">
          {/* 背景装饰 */}
          <div className="fixed inset-0 -z-10 pointer-events-none">
            <div className="absolute inset-0 bg-[#0F0F0F]" />
            <div className="absolute inset-0 tech-grid opacity-5" />
            <div className="absolute inset-0 bg-gradient-to-br from-[#0EA5E9]/5 via-transparent to-[#6366F1]/5 opacity-30" />
          </div>
          
          {children}
        </div>
      </body>
    </html>
  );
}
