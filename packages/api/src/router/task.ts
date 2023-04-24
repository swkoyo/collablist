import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { createTRPCRouter, protectedProcedure } from '../trpc';

export const taskRouter = createTRPCRouter({
  all: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.task.findMany({
      where: { userId: ctx.session.user.id },
      orderBy: { id: 'desc' },
    });
  }),
  create: protectedProcedure
    .input(
      z.object({
        title: z.string().nonempty(),
        description: z.string().nullish(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.task.create({
        data: {
          ...input,
          userId: ctx.session.user.id,
        },
      });
    }),
  toggle: protectedProcedure
    .input(z.string().nonempty())
    .mutation(async ({ ctx, input }) => {
      const task = await ctx.prisma.task.findFirst({
        where: { id: input },
        select: { id: true, userId: true, isDone: true },
      });
      if (!task) throw new TRPCError({ code: 'NOT_FOUND' });
      if (task.userId !== ctx.session.user.id)
        throw new TRPCError({ code: 'UNAUTHORIZED' });
      return ctx.prisma.task.update({
        where: { id: task.id },
        data: { isDone: !task.isDone },
      });
    }),
  delete: protectedProcedure
    .input(z.string().nonempty())
    .mutation(async ({ ctx, input }) => {
      const task = await ctx.prisma.task.findFirst({
        where: { id: input },
        select: {
          id: true,
          userId: true,
        },
      });
      if (!task) throw new TRPCError({ code: 'NOT_FOUND' });
      if (task.userId !== ctx.session.user.id)
        throw new TRPCError({ code: 'UNAUTHORIZED' });
      return ctx.prisma.task.delete({ where: { id: task.id } });
    }),
});

// import { z } from "zod";

// import { createTRPCRouter, publicProcedure } from "../trpc";

// export const postRouter = createTRPCRouter({
//   all: publicProcedure.query(({ ctx }) => {
//     return ctx.prisma.post.findMany({ orderBy: { id: "desc" } });
//   }),
//   byId: publicProcedure
//     .input(z.object({ id: z.string() }))
//     .query(({ ctx, input }) => {
//       return ctx.prisma.post.findFirst({ where: { id: input.id } });
//     }),
//   create: publicProcedure
//     .input(
//       z.object({
//         title: z.string().min(1),
//         content: z.string().min(1),
//       }),
//     )
//     .mutation(({ ctx, input }) => {
//       return ctx.prisma.post.create({ data: input });
//     }),
//   delete: publicProcedure.input(z.string()).mutation(({ ctx, input }) => {
//     return ctx.prisma.post.delete({ where: { id: input } });
//   }),
// });
