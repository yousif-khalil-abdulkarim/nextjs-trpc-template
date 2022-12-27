// @ts-check
const { pathsToModuleNameMapper } = require("ts-jest");
const nextJest = require("next/jest");
const deepmerge = require("deepmerge");

/**
 * @typedef {import("jest").Config} JestConfig
 */

/**
 * @typedef {JestConfig & { tsconfig: any}} TsJestConfig
 */

/**
 * @param {TsJestConfig} tsJestConfig typescript jest config
 * @returns {any} NextJestConfig
 */
function createJestConfig(tsJestConfig) {
    const { tsconfig, ...config } = tsJestConfig;
    // @ts-ignore
    const createJestConfig = nextJest({
        dir: "./",
    });

    /**
     * @type {JestConfig}
     */
    const baseConfig = {
        moduleFileExtensions: ["js", "ts", "jsx", "tsx"],
        collectCoverageFrom: ["**/*.{js,ts,jsx,tsx}"],
        coverageReporters: ["text", "html-spa"],
        testEnvironment: "node",
        rootDir: __dirname,
    };

    const {
        compilerOptions: { baseUrl, paths },
    } = tsconfig;
    const hasTsconfigPaths = baseUrl && paths;

    if (hasTsconfigPaths) {
        baseConfig.modulePaths = [baseUrl];
        baseConfig.moduleNameMapper = pathsToModuleNameMapper(paths);
    }

    return createJestConfig(deepmerge(baseConfig, config));
}

module.exports = { createJestConfig };
