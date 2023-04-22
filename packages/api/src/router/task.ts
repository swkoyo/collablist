import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const taskRouter = createTRPCRouter({
  all: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.task.findMany({
      where: { userId: ctx.session.user.id },
      orderBy: { id: "desc" },
    });
  }),
  create: protectedProcedure
    .input(
      z.object({
        title: z.string().min(2),
        description: z.string().min(2).nullish(),
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
  delete: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const task = await ctx.prisma.task.findFirst({
        where: { id: input },
        select: {
          id: true,
          userId: true,
        },
      });
      if (!task) throw new TRPCError({ code: "NOT_FOUND" });
      if (task.userId !== ctx.session.user.id)
        throw new TRPCError({ code: "UNAUTHORIZED" });
      return ctx.prisma.task.delete({ where: { id: task.id } });
    }),
});
