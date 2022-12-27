import { describe, expect, it } from "@jest/globals";
import { render, screen } from "@testing-library/react";

import { Example } from "./example";

describe("Example unit tests", () => {
    it("example unit test", () => {
        render(<Example />);
        const expected = screen.getByText("hello world");
        expect(expected).toHaveTextContent("hello world");
    });
});
