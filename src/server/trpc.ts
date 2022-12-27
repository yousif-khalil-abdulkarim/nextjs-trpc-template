import { initTRPC } from "@trpc/server";
import superjson from "superjson";

export const trpc = initTRPC.context().create({
    transformer: superjson,
    errorFormatter({ shape }) {
        return shape;
    },
});
