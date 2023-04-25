import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { createTRPCRouter, protectedProcedure } from '../trpc';

export const tagRouter = createTRPCRouter({
  all: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.tag.findMany({
      where: { userId: ctx.session.user.id },
      orderBy: { id: 'desc' },
    });
  }),
  create: protectedProcedure
    .input(
      z.object({
        name: z.string().nonempty(),
        color: z.string().nullish(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.tag.create({
        data: {
          ...input,
          userId: ctx.session.user.id,
        },
      });
    }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.string().nonempty(),
        name: z.string().nonempty(),
        color: z.string().nullish(),
      }),
    )
    .mutation(async ({ ctx, input: { id, name, color } }) => {
      const tag = await ctx.prisma.tag.findFirst({
        where: { id },
        select: { id: true, userId: true },
      });
      if (!tag) throw new TRPCError({ code: 'NOT_FOUND' });
      if (tag.userId !== ctx.session.user.id)
        throw new TRPCError({ code: 'UNAUTHORIZED' });
      return ctx.prisma.tag.update({
        where: { id: tag.id },
        data: { name, color },
      });
    }),
  delete: protectedProcedure
    .input(z.string().nonempty())
    .mutation(async ({ ctx, input }) => {
      const tag = await ctx.prisma.tag.findFirst({
        where: { id: input },
        select: {
          id: true,
          userId: true,
        },
      });
      if (!tag) throw new TRPCError({ code: 'NOT_FOUND' });
      if (tag.userId !== ctx.session.user.id)
        throw new TRPCError({ code: 'UNAUTHORIZED' });
      return ctx.prisma.tag.delete({ where: { id: tag.id } });
    }),
});
