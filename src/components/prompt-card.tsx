"use client"

import * as React from "react"
import { Card } from "@/components/ui/card"
import { Sparkles, ArrowUpRight, Terminal } from "lucide-react"
import { PromptDialog } from "@/components/prompt-dialog"

interface PromptCardProps {
  id: string
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
  createdAt: string
}

export function PromptCard(props: PromptCardProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [isHovered, setIsHovered] = React.useState(false)
  const [tagDelays] = React.useState(() => 
    props.tags.slice(0, 3).map((_, i) => i * 0.05)
  )

  return (
    <>
      <Card 
        className="group cursor-pointer flex flex-col relative overflow-hidden"
        onClick={() => setIsOpen(true)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* 引用次数 */}
        <div className="absolute top-4 right-4 z-10">
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#1E1E21] border border-[#27272A] tech-border">
            <Sparkles className="h-3.5 w-3.5 text-[#0EA5E9] group-hover:animate-pulse" />
            <span className="text-xs font-mono text-[#A1A1AA] tabular-nums">
              {props.copiedCount || 0}
            </span>
          </div>
        </div>

        {/* 内容区域 */}
        <div className="relative flex flex-col flex-1 p-6">
          {/* 标题和图标 */}
          <div className="flex items-start gap-3 mb-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#1E1E21] p-2 border border-[#27272A] tech-border">
              <Terminal className="h-4 w-4 text-[#0EA5E9]" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-medium font-mono text-[#E5E5E5] group-hover:text-[#0EA5E9] transition-colors duration-300 line-clamp-2">
                {props.title}
              </h3>
              <div className="text-xs text-[#71717A] handwritten">
                AI Prompt
              </div>
            </div>
          </div>

          {/* 描述 */}
          <div className="relative pl-11">
            <div className="absolute left-[11px] top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[#27272A] to-transparent" />
            <p className="text-sm font-mono text-[#A1A1AA] line-clamp-3 leading-relaxed">
              {props.description}
            </p>
          </div>

          {/* 标签和查看详情 */}
          <div className="mt-auto pt-4 space-y-4">
            <div className="flex flex-wrap gap-2">
              {props.tags.slice(0, 3).map((tag, index) => (
                <span 
                  key={tag} 
                  className="tag-base shine-effect"
                  style={{
                    transform: isHovered ? 'translateY(-2px)' : 'none',
                    transition: `transform 0.3s ease ${tagDelays[index]}s`
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-end">
              <div className="flex items-center gap-2 text-xs text-[#A1A1AA] group-hover:text-[#0EA5E9] transition-colors duration-300">
                <span className="handwritten">View Details</span>
                <ArrowUpRight className="h-4 w-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
              </div>
            </div>
          </div>
        </div>

        {/* 背景效果 */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 tech-grid opacity-[0.02]" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0EA5E9]/5 via-transparent to-[#6366F1]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* 边框发光效果 */}
        <div className="absolute -inset-[1px] bg-gradient-to-r from-[#0EA5E9]/20 to-[#6366F1]/20 rounded-xl opacity-0 group-hover:opacity-100 blur-[2px] transition-opacity duration-500" />
      </Card>

      <PromptDialog
        open={isOpen}
        onOpenChange={setIsOpen}
        prompt={props}
      />
    </>
  )
} 