import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

type RouterOutput = {
  id: string;
  title: string;
  description: string;
  content: string;
  isPublic: boolean;
  copiedTimes: number;
  createdAt: Date;
  updatedAt: Date;
  tags?: {
    id: string;
    name: string;
  }[];
};

interface TagType {
  tag: {
    id: string;
    name: string;
  }
}

export const promptInfoRouter = createTRPCRouter({
  getallprompts: publicProcedure
    .input(
      z.object({
        skip: z.number().min(0).default(0),
        take: z.number().min(1).max(100).default(10),
        searchQuery: z.string().optional(),
      }).optional()
    )
    .query(async ({ ctx, input }) => {
      const skip = input?.skip ?? 0;
      const take = input?.take ?? 10;
      const searchQuery = input?.searchQuery;

      const where = searchQuery
        ? {
            OR: [
              { description: { contains: searchQuery, mode: 'insensitive' } },
              { content: { contains: searchQuery, mode: 'insensitive' } },
              { title: { contains: searchQuery, mode: 'insensitive' } },
            ],
          }
        : undefined;

      const prompts = await ctx.db.promptInfo.findMany({
        skip,
        take,
        where,
        orderBy: {
          created_at: 'desc',
        },
        include: {
          tags: {
            include: {
              tag: true,
            },
          },
        },
      });

      if (!prompts || prompts.length === 0) {
        throw new Error("No prompts found");
      }

      return prompts.map((prompt: {
        id: string;
        title: string;
        description: string | null;
        content: string;
        is_public: boolean;
        copied_times: number;
        created_at: Date;
        updated_at: Date;
        tags: {
          tag: {
            id: string;
            name: string;
          }
        }[];
      }): RouterOutput => ({
        id: prompt.id,
        title: prompt.title,
        description: prompt.description ?? "",
        content: prompt.content,
        isPublic: prompt.is_public,
        copiedTimes: prompt.copied_times,
        createdAt: prompt.created_at,
        updatedAt: prompt.updated_at,
        tags: prompt.tags.map((pt: TagType) => ({
          id: pt.tag.id,
          name: pt.tag.name,
        })),
      }));
    }),

  getlatest: publicProcedure
    .query(async ({ ctx }) => {
      const prompt = await ctx.db.promptInfo.findFirst({
        orderBy: {
          created_at: 'desc',
        },
        include: {
          tags: {
            include: {
              tag: true,
            },
          },
        },
      });

      if (!prompt) {
        throw new Error("No prompts found");
      }

      const result: RouterOutput = {
        id: prompt.id,
        title: prompt.title,
        description: prompt.description ?? "",
        content: prompt.content,
        isPublic: prompt.is_public,
        copiedTimes: prompt.copied_times,
        createdAt: prompt.created_at,
        updatedAt: prompt.updated_at,
        tags: prompt.tags.map((pt: TagType) => ({
          id: pt.tag.id,
          name: pt.tag.name,
        })),
      };

      return result;
    }),

  incrementCopyCount: publicProcedure
    .input(z.object({
      promptId: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      const updatedPrompt = await ctx.db.promptInfo.update({
        where: {
          id: input.promptId,
        },
        data: {
          copied_times: {
            increment: 1,
          },
        },
      });

      return {
        success: true,
        copiedTimes: updatedPrompt.copied_times,
      };
    }),
});
