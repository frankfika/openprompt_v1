"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Terminal, X } from "lucide-react";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { PromptGenerator } from "@/components/prompt-generator";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const router = useRouter();

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen w-[420px] -translate-x-full transition-transform duration-300",
        "bg-[#18181B]/95 backdrop-blur-xl border-r border-[#27272A]",
        isOpen && "translate-x-0"
      )}
    >
      <div className="h-14 flex items-center justify-between px-4 border-b border-[#27272A]">
        <div className="flex items-center gap-3">
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

        <button
          onClick={() => setIsOpen(false)}
          className="p-2 rounded-lg hover:bg-[#27272A] transition-colors duration-200"
          aria-label="关闭侧边栏"
        >
          <X className="h-5 w-5 text-[#71717A]" />
        </button>
      </div>

      <div className="flex flex-col h-[calc(100vh-3.5rem)] overflow-hidden">
        <div className="p-4 flex-1 overflow-y-auto custom-scrollbar">
          <PromptGenerator />
        </div>
      </div>
    </aside>
  );
}