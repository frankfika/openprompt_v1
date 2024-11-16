"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "glow" | "cyber"
  size?: "default" | "sm" | "lg"
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", loading = false, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={loading || props.disabled}
        className={cn(
          "inline-flex items-center justify-center rounded-lg",
          "font-medium font-mono transition-all duration-300",
          "disabled:opacity-50 disabled:pointer-events-none",
          "relative overflow-hidden",
          {
            // 默认样式
            "bg-[#18181B] text-[#E5E5E5] hover:text-white border border-[#27272A] hover:border-[#3F3F46]": 
              variant === "default",
            
            // 轮廓样式
            "bg-transparent border-2 border-[#27272A] text-[#A1A1AA] hover:border-[#0EA5E9] hover:text-[#0EA5E9]": 
              variant === "outline",
            
            // 幽灵样式
            "hover:bg-[#18181B] text-[#A1A1AA] hover:text-white": 
              variant === "ghost",
            
            // 发光样式
            "bg-gradient-to-r from-[#0EA5E9] to-[#6366F1] text-white": 
              variant === "glow",

            // 赛博朋克风格
            "bg-[#18181B] text-[#0EA5E9] border border-[#0EA5E9] tech-border": 
              variant === "cyber",
          },
          {
            "h-10 px-4 py-2 text-sm": size === "default",
            "h-8 px-3 text-xs": size === "sm",
            "h-12 px-6 text-base": size === "lg",
          },
          // 发光效果
          variant === "glow" && "shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:shadow-[0_0_30px_rgba(14,165,233,0.5)]",
          // 赛博朋克效果
          variant === "cyber" && "hover:bg-[#0EA5E9]/10 hover:shadow-[0_0_30px_rgba(14,165,233,0.3)]",
          className
        )}
        {...props}
      >
        {/* 加载状态 */}
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-inherit">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#A1A1AA] border-t-[#0EA5E9]" />
          </div>
        )}

        {/* 扫光效果 */}
        {variant === "cyber" && !loading && (
          <div className="absolute inset-0 shine-effect pointer-events-none" />
        )}
        
        {/* 渐变边框效果 */}
        {variant === "glow" && !loading && (
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#0EA5E9] to-[#6366F1] opacity-0 group-hover:opacity-20 transition-opacity" />
        )}

        {/* 内容 */}
        <span className={cn("relative flex items-center gap-2", loading && "opacity-0")}>
          {props.children}
        </span>
      </button>
    )
  }
)
Button.displayName = "Button"

export { Button }