// @ts-check
const {
    compose,
    javaScriptPreset,
    prettierPreset,
    typescriptPreset,
    reactPreset,
    nextPreset,
} = require("./eslint-config-utils");

module.exports = compose(
    javaScriptPreset({
        files: "src/**/*.{js,jsx,ts,tsx}",
        excludedFiles: "src/**/*.test.{js,jsx,ts,tsx}",
    }),
    typescriptPreset({
        files: "src/**/*.{ts,tsx}",
        excludedFiles: "src/**/*.test.{js,jsx,ts,tsx}",
        project: "tsconfig.json",
        tsconfigRootDir: __dirname,
    }),
    reactPreset({
        files: "src/**/*.{js,jsx,tsx}",
        excludedFiles: "src/**/*.test.{js,jsx,ts,tsx}",
    }),
    nextPreset({
        files: "src/**/*.{js,jsx,tsx}",
        excludedFiles: "src/**/*.test.{js,jsx,ts,tsx}",
        rootDir: __dirname,
    }),
    prettierPreset({
        files: "src/**/*.{js,jsx,ts,tsx}",
        excludedFiles: "src/**/*.test.{js,jsx,ts,tsx}",
    })
);
