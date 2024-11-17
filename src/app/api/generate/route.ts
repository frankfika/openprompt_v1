import { NextResponse } from "next/server";
import { generatePrompt } from "@/lib/deepseek";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

// 不同类型的系统提示词
const SYSTEM_PROMPTS = {
  text: `You are a prompt engineering expert specializing in creating text generation prompts. 
Your task is to help users create effective prompts for language models.
- Analyze user requirements carefully
- Create clear and structured prompts
- Focus on key elements like context, tone, and desired outcome
- Provide explanations for your choices
- Suggest improvements when possible`,

  image: `You are a prompt engineering expert specializing in text-to-image prompts. 
Your task is to help users create effective prompts for image generation models like Midjourney or DALL-E.
- Help users describe their desired images in detail
- Include important aspects like:
  * Subject matter and composition
  * Art style (e.g., realistic, anime, oil painting)
  * Lighting and atmosphere
  * Color palette and mood
  * Camera angle and perspective
  * Quality modifiers (e.g., highly detailed, 4K, professional)
- Suggest improvements to make the image more vivid
- Format the prompt in a way that works well with image generation models`
};

export async function POST(req: Request) {
  try {
    const { type, prompt, messages } = await req.json();

    // 构建对话历史
    const conversationHistory = messages
      .map((msg: Message) => ({
        role: msg.role === "user" ? "user" : "assistant",
        content: msg.content,
      }))
      .slice(-5); // 只保留最近5条消息作为上下文

    // 添加系统提示词
    const fullMessages = [
      {
        role: "system",
        content: SYSTEM_PROMPTS[type as keyof typeof SYSTEM_PROMPTS],
      },
      ...conversationHistory,
      {
        role: "user",
        content: prompt,
      },
    ];

    // 使用 deepseek.ts 中的函数生成提示词
    const result = await generatePrompt(
      JSON.stringify({
        context: fullMessages,
        request: prompt
      }),
      type as "text" | "image"
    );

    return NextResponse.json({ result });
  } catch (error) {
    console.error("Generation failed:", error);
    return NextResponse.json(
      { error: "Failed to generate prompt" },
      { status: 500 }
    );
  }
} 