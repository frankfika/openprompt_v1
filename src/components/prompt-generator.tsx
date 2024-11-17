"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { PenLine, Image, Loader2, RotateCcw, MessageSquarePlus } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface PromptGeneratorProps {
  className?: string;
}

export function PromptGenerator({ className }: PromptGeneratorProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState("");
  const [activeTab, setActiveTab] = useState<"text" | "image">("text");
  const [messages, setMessages] = useState<Message[]>([]);

  const handleGenerate = async () => {
    if (!input.trim()) return;
    
    setIsLoading(true);
    try {
      // 添加用户消息到历史记录
      const userMessage: Message = {
        role: "user",
        content: input,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, userMessage]);

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: activeTab,
          prompt: input,
          messages: messages, // 传递历史消息以支持上下文
        }),
      });

      const data = await response.json();
      
      // 添加助手回复到历史记录
      const assistantMessage: Message = {
        role: "assistant",
        content: data.result,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setInput(""); // 清空输入框，准备下一轮对话
    } catch (error) {
      console.error("Generation failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setMessages([]);
    setInput("");
  };

  const handleContinue = (message: Message) => {
    setInput(message.content);
  };

  return (
    <div className={cn("w-full max-w-3xl mx-auto", className)}>
      <Tabs
        defaultValue="text"
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as "text" | "image")}
        className="w-full"
      >
        <TabsList className="grid grid-cols-2 bg-[#18181B] border border-[#27272A]">
          <TabsTrigger
            value="text"
            className="data-[state=active]:bg-[#27272A] data-[state=active]:text-[#0EA5E9]"
          >
            <PenLine className="h-4 w-4 mr-2" />
            Text Prompt
          </TabsTrigger>
          <TabsTrigger
            value="image"
            className="data-[state=active]:bg-[#27272A] data-[state=active]:text-[#0EA5E9]"
          >
            <Image className="h-4 w-4 mr-2" />
            Image Prompt
          </TabsTrigger>
        </TabsList>

        <div className="mt-4 space-y-4">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "p-4 rounded-lg",
                  message.role === "user"
                    ? "bg-[#27272A] ml-8"
                    : "bg-[#18181B] border border-[#27272A] mr-8"
                )}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-[#A1A1AA]">
                    {message.role === "user" ? "你" : "AI助手"}
                  </span>
                  <span className="text-xs font-mono text-[#71717A]">
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                </div>
                <p className="text-sm text-[#E5E5E5] whitespace-pre-wrap">
                  {message.content}
                </p>
                {message.role === "assistant" && (
                  <div className="flex justify-end gap-2 mt-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleContinue(message)}
                      className="text-[#0EA5E9] hover:text-[#0EA5E9] hover:bg-[#0EA5E9]/10"
                    >
                      <MessageSquarePlus className="h-4 w-4 mr-2" />
                      继续优化
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex gap-4">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                activeTab === "text"
                  ? "描述你想要生成的文本提示词..."
                  : "描述你想要生成的图像提示词..."
              }
              className="min-h-[120px] bg-[#18181B] border-[#27272A] focus:border-[#0EA5E9] focus:ring-[#0EA5E9]"
            />
          </div>

          <div className="flex gap-2">
            <Button
              onClick={handleGenerate}
              disabled={isLoading || !input.trim()}
              className="flex-1 bg-gradient-to-r from-[#0EA5E9] to-[#6366F1] hover:from-[#0EA5E9]/90 hover:to-[#6366F1]/90"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  生成中...
                </>
              ) : (
                "生成提示词"
              )}
            </Button>

            {messages.length > 0 && (
              <Button
                onClick={handleReset}
                variant="outline"
                className="border-[#27272A] hover:bg-[#27272A]"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                重新开始
              </Button>
            )}
          </div>
        </div>
      </Tabs>
    </div>
  );
} 