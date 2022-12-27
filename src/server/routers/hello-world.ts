import { trpc } from "@/server/trpc";
import { helloWorld } from "@/shared/hello-world";

export const helloWorldRouter = trpc.router({
    default: trpc.procedure.query(() => helloWorld),
});
