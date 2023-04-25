import { authRouter } from './router/auth';
import { labelRouter } from './router/label';
import { taskRouter } from './router/task';
import { createTRPCRouter } from './trpc';

export const appRouter = createTRPCRouter({
  auth: authRouter,
  task: taskRouter,
  label: labelRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
