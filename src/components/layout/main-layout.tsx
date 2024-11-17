"use client";

import { useState } from "react";
import { Sidebar } from "./sidebar";
import { Sparkles, X, Star, Wand2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Navbar } from "./navbar";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cn(
          "fixed left-6 bottom-6 z-50",
          "group flex items-center gap-3 px-5 py-3 rounded-2xl",
          "transition-all duration-500 hover:scale-105",
          isSidebarOpen && "translate-x-[420px]"
        )}
        aria-label={isSidebarOpen ? "关闭提示词生成器" : "打开提示词生成器"}
      >
        {/* 主背景 */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#0EA5E9] to-[#6366F1] opacity-90" />
        
        {/* 星星装饰 */}
        <div className="absolute -top-1 -right-1">
          <Star className="h-3 w-3 text-yellow-300 animate-twinkle" />
        </div>
        <div className="absolute -bottom-1 -left-1">
          <Star className="h-2 w-2 text-yellow-300 animate-twinkle delay-300" />
        </div>

        {/* 魔法光环效果 */}
        <div className={cn(
          "absolute inset-0 rounded-2xl",
          "bg-gradient-to-r from-[#0EA5E9] to-[#6366F1]",
          "opacity-0 blur-xl transition-opacity duration-500",
          "group-hover:opacity-50"
        )} />

        {/* 动态边框 */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden">
          <div className={cn(
            "absolute inset-0",
            "bg-[length:200%_200%]",
            "animate-border-shine",
            "bg-[linear-gradient(115deg,transparent_25%,rgba(255,255,255,0.2)_45%,rgba(255,255,255,0.4)_50%,rgba(255,255,255,0.2)_55%,transparent_75%)]"
          )} />
        </div>

        {/* 内容容器 */}
        <div className="relative flex items-center gap-3">
          <div className="relative">
            {isSidebarOpen ? (
              <X className="h-5 w-5 text-white transition-transform duration-300 
                          group-hover:rotate-90" />
            ) : (
              <div className="relative">
                <Wand2 className="h-5 w-5 text-white animate-bounce" />
                {/* 魔法星星效果 */}
                {isHovered && (
                  <>
                    <div className="absolute -top-1 -right-1">
                      <Sparkles className="h-3 w-3 text-yellow-300 animate-ping-slow" />
                    </div>
                    <div className="absolute -bottom-1 -left-1">
                      <Sparkles className="h-3 w-3 text-yellow-300 animate-ping-slow delay-150" />
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
          <span className={cn(
            "text-sm font-medium text-white whitespace-nowrap",
            "transition-all duration-300",
            "group-hover:tracking-wider"
          )}>
            {isSidebarOpen ? "关闭生成器" : "生成提示词"}
          </span>
        </div>

        {/* 悬浮时的魔法粒子效果 */}
        {isHovered && !isSidebarOpen && (
          <div className="absolute inset-0 -z-10">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute h-1 w-1 rounded-full animate-magic-particle"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  backgroundColor: i % 2 === 0 ? '#0EA5E9' : '#6366F1',
                  animationDelay: `${Math.random() * 1500}ms`,
                }}
              />
            ))}
          </div>
        )}
      </button>

      {/* 背景遮罩 - 添加魔法效果 */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30"
          onClick={() => setIsSidebarOpen(false)}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(14,165,233,0.1),transparent_50%)]" />
        </div>
      )}

      <main className="relative min-h-screen pt-16">
        {children}
      </main>
    </div>
  );
}; 