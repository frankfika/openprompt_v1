"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { PromptCard } from "@/components/prompt-card";
import { Clock, TrendingUp, Hash, Sparkles } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { api } from "@/trpc/react";
import { useSearchParams } from "next/navigation";
import { HeroSection } from "@/components/hero-section";
import { AutoComplete } from "@/components/auto-complete";
import { cn } from "@/lib/utils";

type SortType = "time" | "popular";

export default function Home() {
  const [sortType, setSortType] = useState<SortType>("time");
  const [searchQuery, setSearchQuery] = useState("");
  const searchParams = useSearchParams();
  const tagFilter = searchParams.get('tag');
  const resultsRef = useRef<HTMLDivElement>(null);

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
    ? [...prompts].filter(prompt => {
        if (!searchQuery) return true;
        return (
          prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          prompt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          prompt.tags?.some(tag => 
            tag.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
        );
      }).sort((a, b) => {
        if (sortType === "time") {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
        return b.copiedTimes - a.copiedTimes;
      })
    : [];

  return (
    <MainLayout>
      <div className="relative min-h-screen">
        {/* 优化的背景设计 */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          {/* 主背景渐变 */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a] via-[#0c1222] to-black" />
          
          {/* 动态渐变球 - 左上 */}
          <div className="absolute -left-20 -top-20 w-[600px] h-[600px] animate-pulse">
            <div className="absolute inset-0 bg-[#0EA5E9] opacity-20 blur-[120px]" />
          </div>
          
          {/* 动态渐变球 - 右上 */}
          <div className="absolute -right-20 -top-20 w-[600px] h-[600px] animate-pulse delay-1000">
            <div className="absolute inset-0 bg-[#6366F1] opacity-20 blur-[120px]" />
          </div>
          
          {/* 动态渐变球 - 中央 */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                         w-[800px] h-[800px] animate-pulse delay-700">
            <div className="absolute inset-0 bg-gradient-to-br from-[#0EA5E9]/20 
                           via-[#6366F1]/20 to-[#8B5CF6]/20 opacity-30 blur-[120px]" />
          </div>

          {/* 网格背景 */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181B_1px,transparent_1px),linear-gradient(to_bottom,#18181B_1px,transparent_1px)]
                           bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
          </div>

          {/* 光点效果 */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_100%_200px,#0EA5E9,transparent_20%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_0%_300px,#6366F1,transparent_20%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_600px_at_50%_60%,#8B5CF6,transparent_20%)]" />
          </div>

          {/* 噪点纹理 */}
          <div className="absolute inset-0 opacity-20"
               style={{
                 backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
               }} />

          {/* 渐变叠加层 */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
        </div>

        {/* Main Content */}
        <div className="relative px-4 sm:px-6 lg:px-8 pb-16">
          {/* Hero Section */}
          <div className="max-w-screen-2xl mx-auto pt-24 pb-16">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 
                           bg-clip-text text-transparent bg-gradient-to-r 
                           from-white to-white/70">
                探索 AI 提示词的无限可能
              </h1>
              <p className="text-lg text-zinc-400 mb-8 max-w-2xl mx-auto">
                发现、分享和使用高质量的 AI 提示词，让 AI 更好地理解你的需求
              </p>
              <AutoComplete 
                onSelect={setSearchQuery} 
                resultsRef={resultsRef}
              />
            </div>

            <HeroSection />
          </div>

          {/* Tags Section */}
          <div className="max-w-screen-2xl mx-auto mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-2 px-4 py-1.5 rounded-full 
                           bg-gradient-to-r from-[#0EA5E9]/10 to-transparent">
                <Hash className="h-4 w-4 text-[#0EA5E9]" />
                <h2 className="text-sm font-medium text-white">热门标签</h2>
              </div>
            </div>
            
            <div className="relative">
              <div className="flex flex-wrap gap-2 max-h-[120px] overflow-y-auto 
                           custom-scrollbar pr-4">
                {isTagsLoading ? (
                  <div className="grid grid-cols-4 gap-2 w-full">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div
                        key={i}
                        className="h-8 rounded-lg bg-white/5 animate-pulse"
                        style={{ animationDelay: `${i * 0.1}s` }}
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
                               bg-white/5 hover:bg-white/10
                               border border-white/10 hover:border-[#0EA5E9]/30
                               transition-all duration-300
                               animate-fadeIn"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <span className="text-sm font-medium text-zinc-400 
                                   group-hover:text-white transition-colors">
                        #{tag.name}
                      </span>
                      <div className="flex items-center gap-1">
                        <div className="w-1 h-1 rounded-full bg-zinc-600 
                                    group-hover:bg-[#0EA5E9] transition-colors" />
                        <span className="text-xs text-zinc-500 
                                     group-hover:text-zinc-400 transition-colors">
                          {tag.count}
                        </span>
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Prompts Section */}
          <div ref={resultsRef} className="max-w-screen-2xl mx-auto">
            <div className="flex flex-col gap-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 px-4 py-1.5 rounded-full 
                               bg-gradient-to-r from-[#0EA5E9]/10 to-transparent">
                    <Sparkles className="h-4 w-4 text-[#0EA5E9]" />
                    <h2 className="text-sm font-medium text-white">
                      {searchQuery ? `搜索结果：${sortedPrompts.length}` : "精选提示词"}
                    </h2>
                  </div>
                </div>

                <div className="flex p-1 bg-white/5 rounded-xl border border-white/10">
                  <button
                    onClick={() => setSortType("time")}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors",
                      sortType === "time"
                        ? "bg-white/10 text-white"
                        : "text-zinc-400 hover:text-white"
                    )}
                  >
                    <Clock className="h-4 w-4" />
                    <span>最新</span>
                  </button>
                  <button
                    onClick={() => setSortType("popular")}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors",
                      sortType === "popular"
                        ? "bg-white/10 text-white"
                        : "text-zinc-400 hover:text-white"
                    )}
                  >
                    <TrendingUp className="h-4 w-4" />
                    <span>热门</span>
                  </button>
                </div>
              </div>

              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-[300px] rounded-xl bg-white/5 animate-pulse"
                    />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sortedPrompts.map((prompt, index) => (
                    <div
                      key={prompt.id}
                      className="animate-fadeInUp"
                      style={{ animationDelay: `${index * 0.1}s` }}
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
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
