// @ts-check
const { resolve, join } = require("node:path");

/**
 * @typedef {import("eslint").Linter.BaseConfig} EslintConfig
 */

/**
 * @typedef {import("eslint").Linter.RulesRecord} RulesRecord
 */

/**
 * @param {Array<EslintConfig>} eslintConfigs - EslintConfigs
 * @returns {EslintConfig} EslintConfig
 */
function compose(...eslintConfigs) {
    const composedOverrides = [];
    for (const { overrides } of eslintConfigs) {
        composedOverrides.push(...(overrides ?? []));
    }

    return {
        overrides: composedOverrides,
    };
}

/**
 * @typedef {{
 *  files: string | string[];
 *  excludedFiles?: string | string[];
 *  overrideRules?: RulesRecord;
 * }} BasePresetOptions
 */

/**
 * @template {{}} [T=BasePresetOptions]
 * @typedef {(config: T & BasePresetOptions) => EslintConfig} Preset
 */

/**
 * @type {Preset}
 */
function javaScriptPreset({ overrideRules: rules = {}, ...options }) {
    return {
        overrides: [
            {
                ...options,
                plugins: [
                    "eslint-plugin-unicorn",
                    "eslint-plugin-sonarjs",
                    "eslint-plugin-regexp",
                    "eslint-plugin-import",
                    "eslint-plugin-simple-import-sort",
                    "eslint-plugin-only-error",
                ],
                extends: [
                    "xo",
                    "plugin:unicorn/recommended",
                    "plugin:sonarjs/recommended",
                    "plugin:regexp/recommended",
                ],
                rules: {
                    "import/export": "error",
                    "import/no-mutable-exports": "error",
                    "import/no-named-as-default": "error",
                    "import/no-named-as-default-member": "error",
                    "import/no-unused-modules": "error",
                    "import/named": "error",
                    "import/no-absolute-path": "error",
                    "import/no-dynamic-require": "error",
                    "import/no-self-import": "error",
                    "import/no-webpack-loader-syntax": "error",
                    "import/no-useless-path-segments": "error",
                    "import/first": "error",
                    "import/exports-last": "error",
                    "import/no-anonymous-default-export": "error",
                    "import/no-default-export": "error",
                    "import/no-namespace": "error",
                    "import/no-extraneous-dependencies": "error",
                    "simple-import-sort/imports": "error",
                    "simple-import-sort/exports": "error",
                    "sort-imports": "off",
                    "import/order": "off",
                    ...rules,
                },
            },
        ],
    };
}

/**
 * @type {Preset}
 */
function configPreset({ overrideRules: rules = {}, ...options }) {
    return {
        overrides: [
            {
                ...options,
                rules: {
                    "unicorn/prefer-module": "off",
                    "import/no-default-export": "off",
                    "import/group-exports": "off",
                    "sonarjs/no-duplicate-string": "off",
                    ...rules,
                },
            },
        ],
    };
}

/**
 * @typedef {BasePresetOptions & {
 *  tsconfigRootDir: string;
 *  project: string;
 * }} TypescriptPresetOptions
 */

/**
 * @type {Preset<TypescriptPresetOptions>}
 */
function typescriptPreset({
    tsconfigRootDir,
    project,
    overrideRules: rules,
    ...options
}) {
    return {
        overrides: [
            {
                ...options,
                plugins: [
                    "eslint-plugin-typescript-enum",
                    "eslint-plugin-only-error",
                ],
                extends: "xo-typescript",
                parserOptions: {
                    tsconfigRootDir,
                    project,
                },
                rules: {
                    "import/no-unresolved": "error",
                    "@typescript-eslint/sort-type-constituents": "error",
                    "typescript-enum/no-const-enum": "error",
                    "typescript-enum/no-enum": "error",
                    ...rules,
                },
                settings: {
                    "import/internal-regex": "^@/",
                    "import/parsers": {
                        "@typescript-eslint/parser": [".ts", ".tsx"],
                    },
                    "import/resolver": {
                        typescript: {
                            alwaysTryTypes: true,
                            project: resolve(join(tsconfigRootDir, project)),
                        },
                    },
                },
            },
        ],
    };
}

/**
 * @type {Preset}
 */
function reactPreset({ overrideRules: rules = {}, ...options }) {
    return {
        overrides: [
            {
                ...options,
                plugins: ["eslint-plugin-only-error"],
                extends: ["xo-react"],
                rules: {
                    "react/react-in-jsx-scope": "off",
                    ...rules,
                },
            },
        ],
    };
}

/**
 * @type {Preset}
 */
function storybookPreset({ overrideRules: rules = {}, ...options }) {
    return {
        overrides: [
            {
                ...options,
                plugins: ["eslint-plugin-storybook"],
                extends: ["plugin:storybook/recommended"],
                rules: {
                    "import/no-default-export": "off",
                    ...rules,
                },
            },
        ],
    };
}

/**
 * @typedef {BasePresetOptions & {
 *  rootDir: string;
 * }} NextPresetOptions
 */

/**
 * @type {Preset<NextPresetOptions>}
 */
function nextPreset({ rootDir, overrideRules: rules, ...options }) {
    return {
        overrides: [
            {
                ...options,
                extends: "next",
                settings: {
                    next: {
                        rootDir,
                    },
                },
                rules: {
                    "import/no-default-export": "off",
                    "import/group-exports": "off",
                    ...rules,
                },
            },
        ],
    };
}

/**
 * @type {Preset}
 */
function prettierPreset({ overrideRules: rules = {}, ...options }) {
    return {
        overrides: [
            {
                ...options,
                plugins: ["eslint-plugin-prettier"],
                extends: "prettier",
                rules: {
                    "prettier/prettier": "error",
                    ...rules,
                },
            },
        ],
    };
}

/**
 * @type {Preset}
 */
function jestPreset({ overrideRules: rules = {}, ...options }) {
    return {
        overrides: [
            {
                ...options,
                plugins: ["eslint-plugin-jest", "eslint-plugin-only-error"],
                extends: "plugin:jest/recommended",
                rules: {
                    "jest/require-top-level-describe": "error",
                    "jest/prefer-to-have-length": "error",
                    "jest/prefer-to-contain": "error",
                    "jest/prefer-to-be": "error",
                    "jest/prefer-expect-resolves": "error",
                    "jest/prefer-equality-matcher": "error",
                    "jest/prefer-called-with": "error",
                    "jest/no-test-return-statement": "error",
                    "jest/prefer-hooks-on-top": "error",
                    "jest/consistent-test-it": "error",
                    ...rules,
                },
            },
        ],
    };
}

/**
 * @type {Preset}
 */
function testingLibraryPreset({ overrideRules: rules = {}, ...options }) {
    return {
        overrides: [
            {
                ...options,
                plugins: [
                    "eslint-plugin-testing-library",
                    "eslint-plugin-only-error",
                ],
                extends: "plugin:testing-library/react",
                rules,
            },
        ],
    };
}

/**
 * @type {Preset}
 */
function playwrightPreset({ overrideRules: rules = {}, ...options }) {
    return {
        overrides: [
            {
                ...options,
                plugins: [
                    "eslint-plugin-playwright",
                    "eslint-plugin-only-error",
                ],
                extends: "plugin:playwright/playwright-test",
                rules,
            },
        ],
    };
}

/**
 * @type {Preset}
 */
function jsdocPreset({ overrideRules: rules = {}, ...options }) {
    const jsdocBlockTags = [
        "abstract",
        "access",
        "alias",
        "async",
        "augments",
        "author",
        "borrows",
        "callback",
        "class",
        "classdesc",
        "constant",
        "constructs",
        "copyright",
        "default",
        "deprecated",
        "description",
        "enum",
        "event",
        "example",
        "exports",
        "external",
        "file",
        "fires",
        "function",
        "generator",
        "global",
        "hideconstructor",
        "ignore",
        "implements",
        "inheritdoc",
        "inner",
        "instance",
        "interface",
        "kind",
        "lends",
        "license",
        "listens",
        "member",
        "memberof",
        "memberof!",
        "mixes",
        "mixin",
        "module",
        "name",
        "namespace",
        "override",
        "package",
        "param",
        "private",
        "property",
        "protected",
        "public",
        "readonly",
        "requires",
        "returns",
        "see",
        "since",
        "static",
        "summary",
        "this",
        "throws",
        "todo",
        "tutorial",
        "type",
        "typedef",
        "variation",
        "version",
        "yields",
        "template",
    ];

    return {
        overrides: [
            {
                ...options,
                plugins: ["eslint-plugin-jsdoc", "eslint-plugin-only-error"],
                extends: "plugin:jsdoc/recommended",
                rules: {
                    "jsdoc/valid-types": "off",
                    "jsdoc/require-jsdoc": "off",
                    "jsdoc/check-tag-names": [
                        "error",
                        {
                            definedTags: jsdocBlockTags,
                        },
                    ],
                    ...rules,
                },
            },
        ],
    };
}

/**
 * @type {Preset}
 */
function tsdocPreset({ overrideRules: rules = {}, ...options }) {
    return {
        overrides: [
            {
                ...options,
                plugins: ["eslint-plugin-tsdoc"],
                rules: {
                    "tsdoc/syntax": "error",
                    ...rules,
                },
            },
        ],
    };
}

module.exports = {
    compose,
    javaScriptPreset,
    configPreset,
    typescriptPreset,
    reactPreset,
    storybookPreset,
    nextPreset,
    prettierPreset,
    jestPreset,
    testingLibraryPreset,
    playwrightPreset,
    jsdocPreset,
    tsdocPreset,
};
