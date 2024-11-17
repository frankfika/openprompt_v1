"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { PromptCard } from "@/components/prompt-card";
import { Search, Clock, TrendingUp, Hash } from "lucide-react";
import { useState, useEffect } from "react";
import { api } from "@/trpc/react";
import { useSearchParams } from "next/navigation";
import { HeroSection } from "@/components/hero-section";

type SortType = "time" | "popular";

export default function Home() {
  const [sortType, setSortType] = useState<SortType>("time");
  const [searchQuery, setSearchQuery] = useState("");
  const searchParams = useSearchParams();
  const tagFilter = searchParams.get('tag');

  const { data: popularTags, isLoading: isTagsLoading } = api.tags.getTopTags.useQuery(undefined, {
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  const { data: prompts, isLoading } = api.promptinfo.getallprompts.useQuery({
    take: 100,
    skip: 0,
    searchQuery: tagFilter || undefined,
  });

  useEffect(() => {
    if (tagFilter) {
      setSearchQuery(tagFilter);
    }
  }, [tagFilter]);

  const handleTagClick = (tagName: string) => {
    setSearchQuery(tagName);
  };

  const sortedPrompts = prompts
    ? [...prompts]
        .filter(prompt => {
          if (!searchQuery) return true;
          return (
            prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            prompt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            prompt.tags?.some(tag => 
              tag.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
          );
        })
        .sort((a, b) => {
          if (sortType === "time") {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          }
          return b.copiedTimes - a.copiedTimes;
        })
    : [];

  return (
    <MainLayout>
      <div className="min-h-screen flex flex-col items-center py-8 px-4 sm:px-8">
        <div className="w-full max-w-[1200px] space-y-8">
          <HeroSection />
          <div className="relative mb-8">
            <div className="flex items-center gap-6 mb-6">
              <div className="flex items-center gap-2">
                <Hash className="h-4 w-4 text-[#0EA5E9]" />
                <h2 className="text-sm font-medium font-mono text-[#E5E5E5]">热门标签</h2>
              </div>
              <div className="flex-1 h-[1px] bg-gradient-to-r from-[#27272A] to-transparent" />
            </div>
            
            <div className="relative">
              <div className="flex flex-wrap gap-2 max-h-[120px] overflow-y-auto custom-scrollbar pr-4">
                {isTagsLoading ? (
                  <div className="grid grid-cols-4 gap-2 w-full">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div
                        key={i}
                        className="h-8 rounded-lg bg-[#27272A]/50 animate-pulse"
                        style={{
                          animationDelay: `${i * 0.1}s`,
                        }}
                      />
                    ))}
                  </div>
                ) : (
                  popularTags?.map((tag, index) => (
                    <button
                      key={tag.id}
                      onClick={() => handleTagClick(tag.name)}
                      className="group relative inline-flex items-center gap-2
                               px-3 py-1.5 rounded-lg
                               bg-[#18181B] hover:bg-[#27272A]
                               border border-[#27272A] hover:border-[#0EA5E9]/50
                               transition-all duration-300
                               animate-fadeIn"
                      style={{
                        animationDelay: `${index * 0.05}s`,
                      }}
                    >
                      <span className="text-sm font-mono text-[#A1A1AA] group-hover:text-[#E5E5E5]
                                     transition-colors duration-300">
                        #{tag.name}
                      </span>
                      <div className="flex items-center gap-1">
                        <div className="w-1 h-1 rounded-full bg-[#3F3F46] group-hover:bg-[#0EA5E9]
                                      transition-colors duration-300" />
                        <span className="text-xs font-mono text-[#71717A] group-hover:text-[#A1A1AA]
                                       transition-colors duration-300">
                          {tag.count}
                        </span>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-r from-[#0EA5E9]/5 to-[#6366F1]/5 
                                     opacity-0 group-hover:opacity-100 rounded-lg
                                     transition-opacity duration-300" />
                    </button>
                  ))
                )}
              </div>
              <div className="absolute right-0 top-0 bottom-0 w-16 pointer-events-none
                            bg-gradient-to-l from-[#09090B] to-transparent" />
            </div>
          </div>

          <div className="flex items-center gap-4">
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

          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0EA5E9]" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" role="list">
              {sortedPrompts.map((prompt, index) => (
                <div 
                  key={prompt.id}
                  className="animate-fadeInUp"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    opacity: 0
                  }}
                  role="listitem"
                >
                  <PromptCard 
                    id={prompt.id}
                    title={prompt.title}
                    description={prompt.description}
                    content={prompt.content}
                    author={{
                      name: "AI Prompt",
                      image: `https://api.dicebear.com/7.x/avataaars/svg?seed=${prompt.id}`
                    }}
                    tags={prompt.tags?.map(tag => tag.name) ?? []}
                    copiedCount={prompt.copiedTimes}
                    createdAt={prompt.createdAt.toISOString()}
                    likes={prompt.copiedTimes}
                    comments={0}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="fixed inset-0 pointer-events-none -z-1" aria-hidden="true">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64">
            <div className="absolute inset-0 bg-[#0EA5E9]/3 blur-[120px] rounded-full animate-pulse" />
          </div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64">
            <div className="absolute inset-0 bg-[#6366F1]/3 blur-[120px] rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
