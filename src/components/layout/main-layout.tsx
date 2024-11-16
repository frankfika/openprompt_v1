"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { Sidebar } from "./sidebar";
import { Menu } from "lucide-react";

export function MainLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-[#0F0F0F] tech-grid">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      <main className={cn(
        "flex-1 transition-all duration-300 relative",
        isSidebarOpen ? "ml-72" : "ml-0"
      )}>
        <div className="fixed top-4 left-4 z-40">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl
                     bg-[#1E1E21] hover:bg-[#27272A] transition-all duration-200
                     border border-[#27272A] tech-border
                     hover:shadow-[0_0_20px_rgba(14,165,233,0.2)]"
            aria-label={isSidebarOpen ? "收起侧边栏" : "展开侧边栏"}
          >
            <Menu className="h-5 w-5 text-[#A1A1AA]" />
          </button>
        </div>

        <div className="relative min-h-screen pt-4">
          {children}
          
          <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] to-transparent" />
          </div>
        </div>

        <div className="fixed inset-0 -z-10 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0EA5E9]/5 via-transparent to-[#6366F1]/5 opacity-30" />
          <div className="absolute inset-0 tech-grid opacity-10" />
        </div>
      </main>
    </div>
  );
} 