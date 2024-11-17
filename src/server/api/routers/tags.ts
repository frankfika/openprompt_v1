import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const tagsRouter = createTRPCRouter({
  // 获取所有tags
  getAll: publicProcedure.query(async ({ ctx }) => {
    const tags = await ctx.db.tags.findMany({
      orderBy: { name: "asc" },
    });
    return tags;
  }),

  // 创建新tag
  create: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.tags.create({
        data: {
          name: input.name,
        },
      });
    }),




  // 获取最新tag - 只按照name排序，因为没有createdAt字段
  getLatest: publicProcedure.query(async ({ ctx }) => {
    const tag = await ctx.db.tags.findFirst({
      orderBy: { name: "desc" },
    });

    return tag ?? null;
  }),

  // 获取最常用的50个tags
  getTopTags: publicProcedure.query(async ({ ctx }) => {
    // 1. 首先统计每个tag_id出现的次数
    const topTagIds = await ctx.db.promptAndTag.groupBy({
      by: ['tag_id'],
      _count: {
        tag_id: true
      },
      orderBy: {
        _count: {
          tag_id: 'desc'
        }
      },
      take: 50
    });

    // 2. 提取tag_id数组
    const tagIds = topTagIds.map(item => item.tag_id);

    // 3. 查询对应的tag信息
    const topTags = await ctx.db.tags.findMany({
      where: {
        id: {
          in: tagIds
        }
      },
      select: {
        id: true,
        name: true
      }
    });

    // 4. 按照使用频率排序并包含count信息
    const tagCountMap = new Map(
      topTagIds.map(item => [
        item.tag_id, 
        item._count.tag_id
      ])
    );

    return topTags
      .sort((a, b) => {
        const countA = tagCountMap.get(a.id) ?? 0;
        const countB = tagCountMap.get(b.id) ?? 0;
        return Number(countB) - Number(countA);
      })
      .map(tag => ({
        id: tag.id,
        name: tag.name,
        count: tagCountMap.get(tag.id) ?? 0  // 添加count字段
      }));
  }),
});

// const allTags = await api.tags.getTopTags.query();  // 注意这里是tags不是tag