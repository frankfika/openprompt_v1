"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "outline" | "glow" | "cyber"
  size?: "sm" | "default" | "lg"
}

const Tag = React.forwardRef<HTMLSpanElement, TagProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-lg",
          "font-mono transition-all duration-300",
          "relative overflow-hidden",
          {
            // 默认样式
            "bg-[#18181B] border border-[#27272A] text-[#A1A1AA] hover:text-[#E5E5E5]": 
              variant === "default",
            
            // 轮廓样式
            "bg-transparent border border-[#27272A] text-[#A1A1AA] hover:border-[#0EA5E9] hover:text-[#0EA5E9]": 
              variant === "outline",
            
            // 发光样式
            "bg-gradient-to-r from-[#0EA5E9] to-[#6366F1] text-white": 
              variant === "glow",

            // 赛博朋克风格
            "bg-[#18181B] text-[#0EA5E9] border border-[#0EA5E9] tech-border": 
              variant === "cyber",
          },
          {
            "px-2 py-1 text-xs": size === "sm",
            "px-2.5 py-1 text-sm": size === "default",
            "px-3 py-1.5 text-base": size === "lg",
          },
          // 悬浮效果
          variant === "default" && "hover:border-[#0EA5E9]/30 hover:shadow-[0_0_10px_rgba(14,165,233,0.2)]",
          // 发光效果
          variant === "glow" && "shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:shadow-[0_0_30px_rgba(14,165,233,0.5)]",
          // 赛博朋克效果
          variant === "cyber" && "hover:bg-[#0EA5E9]/10 hover:shadow-[0_0_30px_rgba(14,165,233,0.3)]",
          className
        )}
        {...props}
      >
        {/* 扫光效果 */}
        {variant === "cyber" && (
          <div className="absolute inset-0 shine-effect pointer-events-none" />
        )}
        
        {/* 渐变边框效果 */}
        {variant === "glow" && (
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#0EA5E9] to-[#6366F1] opacity-0 group-hover:opacity-20 transition-opacity" />
        )}

        {/* 内容 */}
        <span className="relative flex items-center gap-1">
          {props.children}
        </span>
      </span>
    )
  }
)
Tag.displayName = "Tag"

export { Tag } 