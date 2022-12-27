// @ts-check
const { createJestConfig } = require("./create-jest-config");

module.exports = createJestConfig({
    testMatch: ["repositories", "server", "shared"].map(
        (folder) => `<rootDir>/src/${folder}/**/*.test.{js,ts}`
    ),
    coverageDirectory: "./coverage/frontend",
    tsconfig: require("./tsconfig.json"),
});
