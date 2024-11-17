"use client";

import { useState } from "react";
import { Sidebar } from "./sidebar";
import { Sparkles, X } from "lucide-react";
import { cn } from "../../lib/utils";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#09090B]">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className={cn(
          "fixed left-6 top-6 z-50 group",
          "flex items-center gap-3 px-4 py-2.5 rounded-xl",
          "bg-gradient-to-r from-[#0EA5E9]/10 to-[#6366F1]/10",
          "border border-[#27272A] hover:border-[#0EA5E9]/50",
          "transition-all duration-300",
          "focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]",
          isSidebarOpen && "translate-x-[420px]"
        )}
        aria-label={isSidebarOpen ? "关闭提示词生成器" : "打开提示词生成器"}
      >
        <div className="relative">
          {isSidebarOpen ? (
            <X className="h-5 w-5 text-[#0EA5E9]" />
          ) : (
            <>
              <Sparkles className="h-5 w-5 text-[#0EA5E9] animate-pulse" />
              <div className="absolute inset-0 animate-ping-slow">
                <Sparkles className="h-5 w-5 text-[#0EA5E9] opacity-50" />
              </div>
            </>
          )}
        </div>
        <span className="text-sm font-mono text-[#E5E5E5] group-hover:text-[#0EA5E9]
                       transition-colors duration-300 whitespace-nowrap">
          {isSidebarOpen ? "关闭生成器" : "生成提示词"}
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0EA5E9]/5 to-[#6366F1]/5
                       opacity-0 group-hover:opacity-100 rounded-xl
                       transition-opacity duration-300" />
      </button>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <main className="relative min-h-screen pl-[72px]">
        {children}
      </main>
    </div>
  );
} 