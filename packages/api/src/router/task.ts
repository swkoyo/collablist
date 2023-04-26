import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { type Prisma } from '@natodo/db';

import { createTRPCRouter, protectedProcedure } from '../trpc';

export const taskRouter = createTRPCRouter({
  all: protectedProcedure
    .input(
      z
        .object({
          isDone: z.boolean().optional(),
        })
        .optional(),
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.task.findMany({
        where: { userId: ctx.session.user.id, isDone: input?.isDone },
        include: {
          labels: {
            include: {
              label: true,
            },
          },
        },
        orderBy: { id: 'asc' },
      });
    }),
  create: protectedProcedure
    .input(
      z.object({
        title: z.string().nonempty(),
        description: z.string().nullish(),
        labelIds: z.array(z.string().nonempty()),
      }),
    )
    .mutation(async ({ ctx, input: { labelIds, ...input } }) => {
      if (labelIds.length > 0) {
        const labels = await ctx.prisma.label.findMany({
          where: {
            id: {
              in: labelIds,
            },
          },
        });
        if (labelIds.length !== labels.length)
          throw new TRPCError({ code: 'NOT_FOUND' });
        if (labels.some((label) => label.userId !== ctx.session.user.id))
          throw new TRPCError({ code: 'UNAUTHORIZED' });
      }
      return ctx.prisma.task.create({
        data: {
          ...input,
          userId: ctx.session.user.id,
          labels: {
            create: labelIds.map((id) => ({
              label: {
                connect: {
                  id,
                },
              },
            })),
          },
        },
        include: {
          labels: {
            include: {
              label: true,
            },
          },
        },
      });
    }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.string().nonempty(),
        title: z.string().nonempty(),
        description: z.string().nullable(),
        labelIds: z.array(z.string().nonempty()).max(1),
      }),
    )
    .mutation(async ({ ctx, input: { id, title, description, labelIds } }) => {
      const task = await ctx.prisma.task.findUnique({
        where: { id },
        include: { labels: true },
      });
      if (!task) throw new TRPCError({ code: 'NOT_FOUND' });
      if (task.userId !== ctx.session.user.id)
        throw new TRPCError({ code: 'UNAUTHORIZED' });

      const updateData: Prisma.TaskUpdateInput = {
        title,
        description,
      };

      if (labelIds.length > 0) {
        const labels = await ctx.prisma.label.findMany({
          where: {
            id: {
              in: labelIds,
            },
          },
        });
        if (labelIds.length !== labels.length)
          throw new TRPCError({ code: 'NOT_FOUND' });
        if (labels.some((label) => label.userId !== ctx.session.user.id))
          throw new TRPCError({ code: 'UNAUTHORIZED' });
      }

      if (task.labels.length > 0) {
        if (labelIds.length === 0) {
          await ctx.prisma.labelsOnTasks.deleteMany({
            where: {
              taskId: task.id,
            },
          });
        } else {
          if (task.labels[0]?.labelId !== labelIds[0]) {
            await ctx.prisma.labelsOnTasks.delete({
              where: {
                id: task.labels[0]?.id,
              },
            });

            updateData.labels = {
              create: labelIds.map((id) => ({
                label: {
                  connect: {
                    id,
                  },
                },
              })),
            };
          }
        }
      } else {
        updateData.labels = {
          create: labelIds.map((id) => ({
            label: {
              connect: {
                id,
              },
            },
          })),
        };
      }

      return ctx.prisma.task.update({
        where: { id: task.id },
        data: updateData,
        include: {
          labels: {
            include: {
              label: true,
            },
          },
        },
      });
    }),
  toggle: protectedProcedure
    .input(z.string().nonempty())
    .mutation(async ({ ctx, input }) => {
      const task = await ctx.prisma.task.findUnique({
        where: { id: input },
        select: { id: true, userId: true, isDone: true },
      });
      if (!task) throw new TRPCError({ code: 'NOT_FOUND' });
      if (task.userId !== ctx.session.user.id)
        throw new TRPCError({ code: 'UNAUTHORIZED' });
      return ctx.prisma.task.update({
        where: { id: task.id },
        data: { isDone: !task.isDone },
        include: {
          labels: {
            include: {
              label: true,
            },
          },
        },
      });
    }),
  delete: protectedProcedure
    .input(z.string().nonempty())
    .mutation(async ({ ctx, input }) => {
      const task = await ctx.prisma.task.findUnique({
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
