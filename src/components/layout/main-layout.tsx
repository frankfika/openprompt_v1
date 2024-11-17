"use client";

import { useState } from "react";
import { Sidebar } from "./sidebar";
import { Sparkles, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Navbar } from "./navbar";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className={cn(
          "fixed left-6 bottom-6 z-50 group",
          "flex items-center gap-3 px-4 py-2.5 rounded-xl",
          "bg-gradient-to-r from-[#0EA5E9] to-[#6366F1]",
          "shadow-lg shadow-blue-500/20",
          "transition-all duration-300",
          "hover:opacity-90 hover:shadow-blue-500/30",
          "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black",
          isSidebarOpen && "translate-x-[420px]"
        )}
        aria-label={isSidebarOpen ? "关闭提示词生成器" : "打开提示词生成器"}
      >
        <div className="relative">
          {isSidebarOpen ? (
            <X className="h-5 w-5 text-white" />
          ) : (
            <>
              <Sparkles className="h-5 w-5 text-white animate-pulse" />
              <div className="absolute inset-0 animate-ping-slow">
                <Sparkles className="h-5 w-5 text-white opacity-50" />
              </div>
            </>
          )}
        </div>
        <span className="text-sm font-medium text-white whitespace-nowrap">
          {isSidebarOpen ? "关闭生成器" : "生成提示词"}
        </span>
      </button>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <main className="relative min-h-screen pt-16">
        {children}
      </main>
    </div>
  );
}; 