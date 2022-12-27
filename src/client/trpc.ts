import { httpBatchLink, loggerLink } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";
import { type inferRouterInputs, type inferRouterOutputs } from "@trpc/server";
import { type NextPageContext } from "next";
import superjson from "superjson";

import type { AppRouter } from "@/server/routers/app";

function getBaseUrl() {
    if (typeof window !== "undefined") {
        return "";
    }

    const portNumber = process.env["PORT"] ?? 3000;

    return `http://localhost:${portNumber}`;
}

export type SsrContext = NextPageContext & {
    status?: number;
};

export const trpc = createTRPCNext<AppRouter, SsrContext>({
    config({ ctx }) {
        return {
            transformer: superjson,
            links: [
                loggerLink({
                    enabled(options) {
                        return (
                            process.env.NODE_ENV === "development" ||
                            (options.direction === "down" &&
                                options.result instanceof Error)
                        );
                    },
                }),
                httpBatchLink({
                    url: `${getBaseUrl()}/api/trpc`,
                    headers() {
                        if (ctx?.req) {
                            const { connection: _, ...headers } =
                                ctx.req.headers;
                            return {
                                ...headers,
                                "x-ssr": "1",
                            };
                        }

                        return {};
                    },
                }),
            ],
        };
    },
    ssr: true,
    responseMeta(options) {
        const context = options.ctx as SsrContext;

        if (context.status) {
            return {
                status: context.status,
            };
        }

        const error = options.clientErrors[0];
        if (error) {
            return {
                status: error.data?.httpStatus ?? 500,
            };
        }

        return {};
    },
});

export type RouterInput = inferRouterInputs<AppRouter>;
export type RouterOutput = inferRouterOutputs<AppRouter>;
