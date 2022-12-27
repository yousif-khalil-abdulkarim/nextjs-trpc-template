// @ts-check

/**
 * @typedef {import("@commitlint/types").RulesConfig} RulesConfig
 */

/**
 * @type {RulesConfig["scope-enum"]}
 */
const scopeEnum = [
    2,
    "always",
    [
        "components",
        "repositories",
        "services",
        "shared",
        "scripts",
        "configs",
        "dev-ops",
        "docs",
    ],
];

/**
 * @type {import("@commitlint/types").UserConfig}
 */
const config = {
    extends: ["@commitlint/config-conventional"],
    rules: {
        "scope-enum": scopeEnum,
    },
};

module.exports = config;
