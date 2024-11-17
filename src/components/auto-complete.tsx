"use client";

import { Search, Command } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";

interface Suggestion {
  id: string;
  title: string;
  description: string | null;
}

interface AutoCompleteProps {
  onSelect: (value: string) => void;
  resultsRef?: React.RefObject<HTMLDivElement>;
}

export const AutoComplete = ({ onSelect, resultsRef }: AutoCompleteProps) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { data: suggestions } = api.promptinfo.searchSuggestions.useQuery(
    { query },
    { enabled: query.length > 0 }
  );

  const scrollToResults = () => {
    if (resultsRef?.current) {
      const yOffset = -100; // 偏移量，考虑固定导航栏的高度
      const y = resultsRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
      
      window.scrollTo({
        top: y,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // 如果有建议项，处理上下键和选择
    if (suggestions?.length) {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex(prev => 
            prev < suggestions.length - 1 ? prev + 1 : prev
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
          break;
      }
    }

    // 无论是否有建议项，都处理 Enter 和 Escape
    switch (e.key) {
      case "Enter":
        e.preventDefault();
        if (suggestions?.length && selectedIndex >= 0) {
          handleSelect(suggestions[selectedIndex].title);
        } else if (query.trim()) {
          // 如果有输入内容但没有选中建议项，直接使用输入的查询
          handleSelect(query.trim());
        }
        break;
      case "Escape":
        setIsOpen(false);
        break;
    }
  };

  const handleSelect = (value: string) => {
    setQuery(value);
    onSelect(value);
    setIsOpen(false);
    setSelectedIndex(-1);
    // 选择后滚动到结果部分
    setTimeout(scrollToResults, 100); // 给一点时间让结果渲染出来
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl mx-auto">
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0EA5E9] to-[#6366F1] 
                     opacity-[0.15] blur-md transition-all duration-500
                     group-hover:opacity-[0.25] group-focus-within:opacity-[0.25]
                     rounded-xl" />
        <div className="relative flex items-center">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
              setSelectedIndex(-1);
            }}
            onKeyDown={handleKeyDown}
            placeholder="搜索提示词..."
            className="w-full h-14 pl-14 pr-20 rounded-xl 
                     bg-white/5 backdrop-blur-sm border border-white/10
                     text-[15px] text-white placeholder-zinc-500
                     transition-all duration-300
                     focus:outline-none focus:border-[#0EA5E9]/50
                     focus:ring-[1px] focus:ring-[#0EA5E9]/50
                     hover:border-white/20 hover:bg-white/[0.07]
                     focus:bg-white/[0.07]"
          />
          <Search className="absolute left-5 h-5 w-5 text-zinc-500" />
          <kbd className="absolute right-5 hidden h-5 select-none items-center gap-1 
                       rounded border border-white/10 bg-white/5 px-1.5
                       font-mono text-[10px] font-medium text-zinc-500
                       sm:flex">
            <Command className="h-3 w-3" /> K
          </kbd>
        </div>
      </div>

      {isOpen && suggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 py-2
                      bg-[#18181B]/90 border border-white/10 rounded-xl
                      shadow-xl backdrop-blur-sm
                      max-h-[300px] overflow-y-auto">
          {suggestions.map((item: Suggestion, index: number) => (
            <button
              key={item.id}
              onClick={() => handleSelect(item.title)}
              onMouseEnter={() => setSelectedIndex(index)}
              className={cn(
                "w-full px-4 py-3 text-left transition-colors",
                "hover:bg-white/5",
                index === selectedIndex && "bg-white/5",
                "focus:outline-none focus:bg-white/5"
              )}
            >
              <div className="text-[15px] text-white mb-0.5">{item.title}</div>
              {item.description && (
                <div className="text-xs text-zinc-500 line-clamp-1">
                  {item.description}
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}; 