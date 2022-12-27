import { createNextApiHandler } from "@trpc/server/adapters/next";

import { appRouter } from "@/server/routers/app";

export default createNextApiHandler({
    router: appRouter,
    onError({ error }) {
        if (error.code === "INTERNAL_SERVER_ERROR") {
            console.error("Something went wrong", error);
        }
    },
    batching: {
        enabled: true,
    },
});
