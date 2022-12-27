// @ts-check
const { createJestConfig } = require("./create-jest-config");

module.exports = createJestConfig({
    testMatch: ["<rootDir>/src/components/**/*.test.{js,jsx,tsx}"],
    testEnvironment: "jest-environment-jsdom",
    setupFilesAfterEnv: ["<rootDir>/jest-components-setup.ts"],
    coverageDirectory: "./coverage/frontend",
    tsconfig: require("./tsconfig.json"),
});
