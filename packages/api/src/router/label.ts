import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { createTRPCRouter, protectedProcedure } from '../trpc';

export const labelRouter = createTRPCRouter({
  all: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.label.findMany({
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
      return ctx.prisma.label.create({
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
      const label = await ctx.prisma.label.findFirst({
        where: { id },
        select: { id: true, userId: true },
      });
      if (!label) throw new TRPCError({ code: 'NOT_FOUND' });
      if (label.userId !== ctx.session.user.id)
        throw new TRPCError({ code: 'UNAUTHORIZED' });
      return ctx.prisma.label.update({
        where: { id: label.id },
        data: { name, color },
      });
    }),
  delete: protectedProcedure
    .input(z.string().nonempty())
    .mutation(async ({ ctx, input }) => {
      const label = await ctx.prisma.label.findFirst({
        where: { id: input },
        select: {
          id: true,
          userId: true,
        },
      });
      if (!label) throw new TRPCError({ code: 'NOT_FOUND' });
      if (label.userId !== ctx.session.user.id)
        throw new TRPCError({ code: 'UNAUTHORIZED' });
      return ctx.prisma.label.delete({ where: { id: label.id } });
    }),
});
