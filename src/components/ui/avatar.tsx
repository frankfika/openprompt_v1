import * as React from "react"
import { cn } from "@/lib/utils"

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

interface AvatarImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  className?: string;
}

interface AvatarFallbackProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function Avatar({ className, ...props }: AvatarProps) {
  return (
    <div 
      className={cn(
        "relative flex shrink-0 overflow-hidden rounded-lg",
        "bg-[#27272A] tech-border",
        "transition-all duration-300",
        "hover:scale-105",
        "shadow-[0_0_0_1px_rgba(14,165,233,0.1)]",
        "hover:shadow-[0_0_15px_rgba(14,165,233,0.2)]",
        className
      )}
      {...props}
    />
  )
}

export function AvatarImage({ className, alt = "", ...props }: AvatarImageProps) {
  return (
    <img
      className={cn(
        "aspect-square h-full w-full object-cover",
        "transition-transform duration-300",
        "hover:scale-110",
        className
      )}
      alt={alt}
      {...props}
    />
  )
}

export function AvatarFallback({ className, ...props }: AvatarFallbackProps) {
  return (
    <div
      className={cn(
        "flex h-full w-full items-center justify-center",
        "bg-[#18181B]",
        "text-sm font-mono text-[#A1A1AA]",
        "transition-colors duration-300",
        "hover:text-[#0EA5E9]",
        className
      )}
      {...props}
    />
  )
}