"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { PromptCard } from "@/components/prompt-card";
import { Search, Clock, TrendingUp } from "lucide-react";
import { useState } from "react";

type SortType = "time" | "popular";

const mockPrompts = [
  {
    title: "AI 艺术生成专家",
    description: "一个全面的提示词，用于使用 Midjourney 和 DALL-E 等 AI 工具生成详细的艺术图像。",
    content: `1. 场景描述：[描述你想要的场景]
2. 风格选择：[选择艺术风格，如印象派、赛博朋克等]
3. 光线氛围：[描述光线效果]
4. 构图要求：[说明构图偏好]
5. 色彩倾向：[指定主要色调]
6. 细节要求：[强调重要细节]
7. 参考艺术家：[列举参考艺术家]`,
    author: {
      name: "陈小明",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
    },
    tags: ["Midjourney", "DALL-E", "AI绘画", "艺术创作", "视觉设计"],
    copiedCount: 234,
    createdAt: "2024-03-20T10:00:00Z",
    likes: 234,
    comments: 45
  },
  {
    title: "代码��助手",
    description: "帮助开发者重构和优化代码的专业提示词，支持多种编程语言和常见架构模式。",
    content: `1. 代码分析：[描述当代码问题]
2. 重构目标：[说明期望达到的效果]
3. 性能要求：[指定性能指标]
4. 设计模式：[建议使用的设计模式]
5. 最佳实践：[编码规范和建议]`,
    author: {
      name: "李大伟",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=John"
    },
    tags: ["代码优化", "重构", "设计模式", "编程", "开发工具"],
    copiedCount: 156,
    createdAt: "2024-03-19T10:00:00Z",
    likes: 156,
    comments: 23
  },
  {
    title: "营销文案生成器",
    description: "为各类产品和服务生成引人注目的营销文案，包括标题、描述和号召性用语。",
    content: `1. 产品特点：[描述产品主要特点]
2. 目标受众：[定义目标用户群]
3. 文案风格：[指定文案语气]
4. 核心卖点：[强调产品优势]
5. 情感诉求：[设定情感基调]`,
    author: {
      name: "张雨",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily"
    },
    tags: ["营销", "文案", "广告", "内容创作", "品牌"],
    copiedCount: 189,
    createdAt: "2024-03-18T10:00:00Z",
    likes: 189,
    comments: 34
  }
];

export default function Home() {
  const [sortType, setSortType] = useState<SortType>("time");
  const [searchQuery, setSearchQuery] = useState("");

  const sortedPrompts = [...mockPrompts]
    .filter(prompt => 
      prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortType === "time") {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      return b.copiedCount - a.copiedCount;
    });

  return (
    <MainLayout>
      <div className="relative max-w-[1800px] mx-auto px-8">
        <div className="relative flex flex-col gap-8 py-8">
          <div className="flex items-center gap-4 max-w-3xl mx-auto w-full">
            <div className="relative flex-1">
              <div className="absolute left-7 top-1/2 -translate-y-1/2 flex items-center gap-3">
                <Search className="h-5 w-5 text-[#0EA5E9]" />
                <div className="h-4 w-[1px] bg-[#27272A]" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search prompts..."
                className="w-full h-14 pl-14 pr-20 rounded-xl 
                         bg-[#18181B] border border-[#27272A]
                         text-[15px] text-white placeholder-[#71717A] font-mono
                         transition-all duration-300
                         focus:outline-none focus:border-[#0EA5E9]
                         focus:ring-1 focus:ring-[#0EA5E9]
                         focus:shadow-[0_0_20px_rgba(14,165,233,0.2)]"
                aria-label="搜索提示词"
              />
              <div className="absolute right-7 top-1/2 -translate-y-1/2 flex items-center gap-2">
                <kbd className="px-2 py-1 text-xs bg-[#27272A] rounded-md font-mono
                             border border-[#3F3F46] text-[#A1A1AA]
                             shadow-[0_2px_0_#18181B]">
                  ⌘K
                </kbd>
              </div>
            </div>

            <div className="flex p-1.5 bg-[#18181B] rounded-xl border border-[#27272A] tech-border">
              <button
                onClick={() => setSortType("time")}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-mono transition-all duration-300 ${
                  sortType === "time"
                    ? "bg-[#27272A] text-[#0EA5E9]"
                    : "text-[#A1A1AA] hover:text-white"
                }`}
                aria-pressed={sortType === "time"}
              >
                <Clock className="h-4 w-4" />
                <span>最新</span>
              </button>
              <button
                onClick={() => setSortType("popular")}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-mono transition-all duration-300 ${
                  sortType === "popular"
                    ? "bg-[#27272A] text-[#0EA5E9]"
                    : "text-[#A1A1AA] hover:text-white"
                }`}
                aria-pressed={sortType === "popular"}
              >
                <TrendingUp className="h-4 w-4" />
                <span>热门</span>
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" role="list">
            {sortedPrompts.map((prompt, index) => (
              <div 
                key={index}
                className="animate-fadeInUp"
                style={{
                  animationDelay: `${index * 0.1}s`,
                  opacity: 0
                }}
                role="listitem"
              >
                <PromptCard {...prompt} />
              </div>
            ))}
          </div>
        </div>

        <div className="fixed inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64">
            <div className="absolute inset-0 bg-[#0EA5E9]/10 blur-[120px] rounded-full animate-pulse" />
          </div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64">
            <div className="absolute inset-0 bg-[#6366F1]/10 blur-[120px] rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
