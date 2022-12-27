/* eslint-disable @typescript-eslint/consistent-type-definitions */
import "@testing-library/jest-dom";

import { type expect } from "@jest/globals";
import { type TestingLibraryMatchers } from "testing-library__jest-dom/matchers";

declare module "expect/build" {
    export interface Matchers<R = void>
        extends TestingLibraryMatchers<typeof expect.stringContaining, R> {}
}
