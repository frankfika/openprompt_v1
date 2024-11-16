"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Terminal, Hash } from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const popularTags = [
  { name: "Midjourney", count: 1234 },
  { name: "ChatGPT", count: 890 },
  { name: "代码生成", count: 756 },
  { name: "文案创作", count: 645 },
  { name: "角色扮演", count: 534 },
  { name: "图像生成", count: 432 },
  { name: "数据分析", count: 321 },
  { name: "写作助手", count: 289 },
  { name: "创意设计", count: 245 },
  { name: "AI绘画", count: 198 },
  { name: "内容优化", count: 187 },
  { name: "SEO优化", count: 176 },
  { name: "产品文案", count: 165 },
  { name: "营销文案", count: 154 },
  { name: "技术文档", count: 143 },
  { name: "学术写作", count: 132 },
  { name: "故事创作", count: 121 },
  { name: "对话系统", count: 110 },
  { name: "数据可视化", count: 98 },
  { name: "代码注释", count: 87 },
] as const;

export function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen w-72 -translate-x-full transition-transform duration-300",
        "bg-[#18181B]/95 backdrop-blur-xl border-r border-[#27272A]",
        isOpen && "translate-x-0"
      )}
    >
      <div className="h-14 flex items-center gap-3 px-4 border-b border-[#27272A]">
        <div className="relative h-8 w-8 rounded-xl bg-gradient-to-br from-[#0EA5E9] to-[#6366F1] p-2 glow-effect">
          <Terminal className="h-4 w-4 text-white" />
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#0EA5E9]/10 to-[#6366F1]/10 animate-pulse" />
        </div>
        <div className="space-y-0.5">
          <h1 className="text-base font-medium font-mono bg-gradient-to-r from-white to-[#A1A1AA] bg-clip-text text-transparent">
            Prompt Hub
          </h1>
          <div className="text-xs text-[#71717A] font-mono">AI Prompts Collection</div>
        </div>
      </div>
      <div className="flex flex-col h-[calc(100vh-3.5rem)]">
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#27272A]">
          <div className="flex items-center gap-2">
            <Hash className="h-4 w-4 text-[#0EA5E9]" />
            <h2 className="text-sm font-medium font-mono text-[#E5E5E5]">热门标签</h2>
          </div>
          <span className="text-xs font-mono text-[#71717A] px-2 py-0.5 rounded-md bg-[#27272A]">
            {popularTags.length}
          </span>
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="p-2 space-y-0.5">
            {popularTags.map((tag) => (
              <button
                key={tag.name}
                className="group w-full flex items-center justify-between px-3 py-2 rounded-lg
                         transition-all duration-200 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-[#27272A] opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative text-sm font-mono text-[#A1A1AA] group-hover:text-[#E5E5E5]">
                  {tag.name}
                </span>
                <span className="relative text-xs font-mono tabular-nums px-2 py-0.5 rounded-md
                               bg-[#27272A] text-[#71717A] group-hover:bg-[#3F3F46] group-hover:text-[#A1A1AA]">
                  {tag.count}
                </span>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0EA5E9]/20 to-[#6366F1]/20" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-[#18181B] to-transparent" />
      </div>
    </aside>
  );
}