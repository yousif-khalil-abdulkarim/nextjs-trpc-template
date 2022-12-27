// @ts-check
const {
    compose,
    javaScriptPreset,
    configPreset,
    prettierPreset,
    typescriptPreset,
    reactPreset,
    nextPreset,
    jsdocPreset,
    tsdocPreset,
    storybookPreset,
    jestPreset,
    testingLibraryPreset,
} = require("./eslint-config-utils");

module.exports = compose(
    javaScriptPreset({
        files: "**/*.{js,jsx,ts,tsx}",
    }),
    typescriptPreset({
        files: "**/*.{ts,tsx}",
        project: "tsconfig.json",
        tsconfigRootDir: __dirname,
    }),
    reactPreset({
        files: "**/*.{js,jsx,tsx}",
    }),
    nextPreset({
        files: "src/pages/**/*.{js,ts,jsx,tsx}",
        rootDir: __dirname,
    }),
    configPreset({
        files: [
            "**/*.config.{js,ts}",
            "**/*.*rc.{js,ts}",
            "**/*.*rc.build.{js,ts}",
            "eslint-config-utils.js",
            "create-jest-config.js",
        ],
    }),
    jsdocPreset({
        files: ["**/*.{js,jsx}"],
    }),
    tsdocPreset({
        files: "**/*.{ts,tsx}",
    }),
    storybookPreset({
        files: "src/components/**/*.stories.{js,jsx,tsx}",
    }),
    jestPreset({
        files: "src/**/*.test.{js,ts,jsx,tsx}",
    }),
    testingLibraryPreset({
        files: "src/components/**/*.test.{js,ts,jsx,tsx}",
    }),
    prettierPreset({
        files: "**/*.{js,jsx,ts,tsx}",
    })
);
