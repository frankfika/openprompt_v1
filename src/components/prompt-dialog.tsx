"use client"

import * as React from "react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Copy, Terminal, Code2 } from "lucide-react"

interface PromptDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  prompt: {
    title: string
    description: string
    content: string
    tags: string[]
    copiedCount?: number
    author: {
      name: string
      image: string
    }
    likes: number
    comments: number
  }
}

export function PromptDialog({ open, onOpenChange, prompt }: PromptDialogProps) {
  const [isCopied, setIsCopied] = React.useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt.content)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden">
        {/* 为屏幕阅读器提供标题 */}
        <div className="sr-only">
          <DialogTitle>{prompt.title}</DialogTitle>
        </div>

        {/* 头部信息 */}
        <div className="p-8 border-b border-[#27272A] relative overflow-hidden">
          {/* 背景装饰 */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 tech-grid opacity-[0.02]" />
            <div className="absolute inset-0 bg-gradient-to-br from-[#0EA5E9]/5 via-transparent to-[#6366F1]/5" />
          </div>

          <div className="flex items-start justify-between gap-6">
            {/* 标题和描述 */}
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#1E1E21] p-2.5 border border-[#27272A] tech-border">
                  <Terminal className="h-5 w-5 text-[#0EA5E9]" />
                </div>
                <div className="space-y-1">
                  <h2 className="text-xl font-mono text-[#E5E5E5]">
                    {prompt.title}
                  </h2>
                  <div className="flex items-center gap-2">
                    <Code2 className="h-3.5 w-3.5 text-[#0EA5E9]" />
                    <span className="text-xs font-mono text-[#A1A1AA]">
                      {prompt.copiedCount || 0} 次引用
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-[#A1A1AA] font-mono leading-relaxed pl-[52px]">
                {prompt.description}
              </p>
            </div>
          </div>

          {/* 标签 */}
          <div className="flex flex-wrap gap-2 mt-6 pl-[52px]">
            {prompt.tags.map((tag) => (
              <span 
                key={tag} 
                className="tag-base shine-effect"
                role="note"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* 内容区域 */}
        <div className="relative">
          {/* 代码编辑器风格的内容区 */}
          <div className="bg-[#1E1E21] p-8">
            {/* 编辑器顶栏 */}
            <div className="flex items-center justify-between mb-6 px-4">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#EF4444]" />
                  <div className="w-3 h-3 rounded-full bg-[#F59E0B]" />
                  <div className="w-3 h-3 rounded-full bg-[#10B981]" />
                </div>
                <span className="text-xs font-mono text-[#71717A]">prompt.txt</span>
              </div>
              <button
                onClick={handleCopy}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-mono
                  transition-all duration-300 ${
                  isCopied 
                    ? 'bg-[#0EA5E9] text-white' 
                    : 'bg-[#27272A] text-[#A1A1AA] hover:text-white hover:bg-[#3F3F46]'
                }`}
                aria-label={isCopied ? "已复制提示词" : "复制提示词"}
              >
                <Copy className="h-4 w-4" />
                <span>{isCopied ? '已复制' : '复制提示词'}</span>
              </button>
            </div>

            {/* 内容区域 */}
            <div className="relative">
              {/* 行号装饰 */}
              <div className="absolute left-4 top-0 bottom-0 w-8 border-r border-[#27272A] opacity-30">
                {prompt.content.split('\n').map((_, i) => (
                  <div 
                    key={i}
                    className="text-xs font-mono text-[#71717A] text-right pr-3 leading-6"
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
              {/* 内容 */}
              <div className="pl-12 font-mono text-sm text-[#E5E5E5] whitespace-pre-wrap leading-6">
                {prompt.content}
              </div>
            </div>
          </div>

          {/* 底部渐变 */}
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#1E1E21] to-transparent pointer-events-none" />
        </div>
      </DialogContent>
    </Dialog>
  )
} 