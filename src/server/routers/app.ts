import { trpc } from "@/server/trpc";

import { helloWorldRouter } from "./hello-world";

export const appRouter = trpc.router({
    helloWorld: helloWorldRouter,
});

export type AppRouter = typeof appRouter;
