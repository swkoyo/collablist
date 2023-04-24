import { authRouter } from "./router/auth";
import { taskRouter } from "./router/task";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  task: taskRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
