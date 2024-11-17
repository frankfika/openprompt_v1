"use client";

import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const announcements = [
  {
    id: 1,
    title: "提示工程好技巧",
    description: "任務最後、正負面、預填充、鏈思考",
    image: "https://miro.medium.com/v2/resize:fit:4800/format:webp/0*VbFnlie5AI59-6u3",
    link: "https://medium.com/@bohachu/%E6%8F%90%E7%A4%BA%E5%B7%A5%E7%A8%8B%E5%A5%BD%E6%8A%80%E5%B7%A7-%E4%BB%BB%E5%8B%99%E6%9C%80%E5%BE%8C-%E6%AD%A3%E8%B2%A0%E9%9D%A2-%E9%A0%90%E5%A1%AB%E5%85%85-%E9%8F%88%E6%80%9D%E8%80%83-19e6bb3af734"
  },
  {
    id: 2,
    title: "掌握ChatGPT提示词四大玩法",
    description: "从基础到进阶",
    image: "https://miro.medium.com/v2/resize:fit:4800/format:webp/1*IbHribvRbYsvqlc7BVw12A.png",
    link: "https://medium.com/@h.zuomin/%E6%8E%8C%E6%8F%A1chatgpt%E6%8F%90%E7%A4%BA%E8%AF%8D%E5%9B%9B%E5%A4%A7%E7%8E%A9%E6%B3%95-%E4%BB%8E%E5%9F%BA%E7%A1%80%E5%88%B0%E8%BF%9B%E9%98%B6-62dfde86c9ec"
  },
  {
    id: 3,
    title: "一个写SD Prompt的Prompt：",
    description: "魔法提示词的实测与分享",
    image: "https://miro.medium.com/v2/resize:fit:1280/format:webp/0*uknkdyUYEzB10La9",
    link: "https://medium.com/@h.zuomin/%E4%B8%80%E4%B8%AA%E5%86%99sd-prompt%E7%9A%84prompt-%E9%AD%94%E6%B3%95%E6%8F%90%E7%A4%BA%E8%AF%8D%E7%9A%84%E5%AE%9E%E6%B5%8B%E4%B8%8E%E5%88%86%E4%BA%AB-3944f410a071"
  },
];

const news = [
  {
    id: 1,
    title: "Claude 3 发布：更强大的视觉理解能力",
    date: "2024-03-10"
  },
  {
    id: 2,
    title: "GPT-4 Turbo 更新：支持更长上下文",
    date: "2024-03-08"
  },
  {
    id: 3,
    title: "Midjourney V6 正式版发布",
    date: "2024-03-05"
  },
  {
    id: 4,
    title: "Google Gemini 开放 API 访问",
    date: "2024-03-01"
  },
];

export const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % announcements.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => 
      prev === 0 ? announcements.length - 1 : prev - 1
    );
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => 
      (prev + 1) % announcements.length
    );
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto mb-8 relative z-0">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 轮播区域 */}
        <div className="lg:col-span-2 relative group">
          <div className="relative h-[300px] overflow-hidden rounded-2xl">
            {announcements.map((announcement, index) => (
              <div
                key={announcement.id}
                className={cn(
                  "absolute inset-0 transition-all duration-500 ease-in-out",
                  index === currentSlide
                    ? "translate-x-0 opacity-100"
                    : index < currentSlide
                    ? "-translate-x-full opacity-0"
                    : "translate-x-full opacity-0"
                )}
              >
                <div className="absolute inset-0">
                  <img
                    src={announcement.image}
                    alt={announcement.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {announcement.title}
                  </h3>
                  <p className="text-zinc-300 mb-4">
                    {announcement.description}
                  </p>
                  <Link
                    href={announcement.link}
                    target="_blank"
                    className="inline-flex items-center gap-2 text-[#0EA5E9] hover:text-[#0EA5E9]/80 transition-colors"
                  >
                    <span>了解更多</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* 轮播控制按钮 */}
          <button
            onClick={handlePrevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full 
                     bg-black/30 hover:bg-black/50 backdrop-blur
                     flex items-center justify-center
                     text-white/70 hover:text-white
                     transition-all duration-200
                     opacity-0 group-hover:opacity-100"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={handleNextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full 
                     bg-black/30 hover:bg-black/50 backdrop-blur
                     flex items-center justify-center
                     text-white/70 hover:text-white
                     transition-all duration-200
                     opacity-0 group-hover:opacity-100"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* 轮播指示器 */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {announcements.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  index === currentSlide
                    ? "w-6 bg-white"
                    : "w-1.5 bg-white/50"
                )}
              />
            ))}
          </div>
        </div>

        {/* 新闻列表 */}
        <div className="relative">
          <div className="absolute inset-0 rounded-2xl border border-[#27272A] bg-[#18181B]/50 backdrop-blur-sm" />
          <div className="relative p-6">
            <h3 className="text-lg font-semibold text-white mb-4">AI 最新动态</h3>
            <div className="space-y-4">
              {news.map((item) => (
                <Link
                  key={item.id}
                  href="#"
                  target="_blank"
                  className="group block"
                >
                  <div className="flex items-start justify-between gap-4">
                    <h4 className="text-sm text-zinc-300 group-hover:text-white transition-colors line-clamp-2">
                      {item.title}
                    </h4>
                    <time className="text-xs text-zinc-500 whitespace-nowrap">
                      {item.date}
                    </time>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 