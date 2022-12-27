import { describe, expect, it } from "@jest/globals";
import { type inferProcedureOutput } from "@trpc/server";

import { type AppRouter, appRouter } from "./app";

describe("hello-world.test.ts", () => {
    it("default test", async () => {
        const caller = appRouter.createCaller({});
        const expected: inferProcedureOutput<
            AppRouter["helloWorld"]["default"]
        > = "hello world";

        const input = await caller.helloWorld.default();

        expect(input).toBe(expected);
    });
});
