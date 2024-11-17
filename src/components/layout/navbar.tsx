"use client";

import { Github, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  {
    path: "/",
    label: "探索",
  },
  {
    path: "/collections",
    label: "收藏",
  },
  {
    path: "/community",
    label: "社区",
  },
] as const;

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* 毛玻璃背景 */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent backdrop-blur-[12px]" />

      <div className="relative">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between gap-4">
            {/* Logo & Navigation */}
            <div className="flex items-center gap-8">
              <Link 
                href="/" 
                className="flex items-center gap-2 transition-opacity hover:opacity-80"
              >
                <div className="relative h-8 w-8">
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-[#0EA5E9] to-[#6366F1]" />
                  <div className="absolute inset-[1px] rounded-lg bg-black" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-bold text-white">P</span>
                  </div>
                </div>
                <span className="text-lg font-semibold text-white">
                  Prompts
                </span>
              </Link>

              <nav className="hidden md:flex items-center gap-1">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={cn(
                      "relative px-4 py-2 text-sm font-medium transition-colors",
                      pathname === item.path
                        ? "text-white"
                        : "text-zinc-400 hover:text-white"
                    )}
                  >
                    {item.label}
                    {pathname === item.path && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#0EA5E9] to-[#6366F1]" />
                    )}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <Link
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="group flex h-9 w-9 items-center justify-center rounded-lg 
                         bg-white/5 transition-colors hover:bg-white/10"
              >
                <Github className="h-5 w-5 text-zinc-400 transition-colors group-hover:text-white" />
              </Link>

              <button className="flex h-9 w-9 items-center justify-center rounded-lg 
                              bg-white/5 transition-colors hover:bg-white/10 md:hidden">
                <Menu className="h-5 w-5 text-zinc-400" />
              </button>
            </div>
          </div>
        </div>

        {/* 底部渐变线 */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r 
                     from-transparent via-zinc-800 to-transparent" />
      </div>
    </header>
  );
}; 