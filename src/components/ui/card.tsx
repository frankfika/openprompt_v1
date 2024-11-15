import * as React from "react"
import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl bg-[#18181B] relative overflow-hidden",
      "border border-[#27272A]",
      "h-[260px]",
      "transition-all duration-500",
      "hover:scale-[1.02] hover:-translate-y-1",
      "shadow-[0_0_0_1px_rgba(14,165,233,0.1),0_4px_12px_rgba(0,0,0,0.2)]",
      "hover:shadow-[0_0_0_1px_rgba(14,165,233,0.2),0_12px_24px_rgba(0,0,0,0.3),0_0_40px_rgba(14,165,233,0.15)]",
      "before:absolute before:inset-0 before:bg-gradient-to-br before:from-[#0EA5E9]/5 before:to-[#6366F1]/5 before:opacity-0 before:transition-opacity before:duration-500",
      "hover:before:opacity-100",
      "after:absolute after:inset-0 after:-z-10 after:tech-grid after:opacity-5",
      "tech-border",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col space-y-1.5 p-5",
      "relative",
      "after:absolute after:bottom-0 after:left-5 after:right-5",
      "after:h-[1px]",
      "after:bg-gradient-to-r after:from-transparent after:via-[#27272A] after:to-transparent",
      className
    )}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div 
    ref={ref} 
    className={cn(
      "p-5 pt-4",
      "relative",
      className
    )} 
    {...props} 
  />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center p-5 pt-0",
      "relative",
      "before:absolute before:top-0 before:left-5 before:right-5",
      "before:h-[1px]",
      "before:bg-gradient-to-r before:from-transparent before:via-[#27272A] before:to-transparent",
      className
    )}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardContent, CardFooter } 