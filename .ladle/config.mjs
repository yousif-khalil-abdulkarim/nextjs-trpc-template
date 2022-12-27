const config = {
    stories: "src/**/*.stories.{jsx,tsx}",
    defaultStory: "",
    appendToHead: "",
    port: 3001,
    previewPort: 3001,
    outDir: "./.dev",
    addons: {
        a11y: {
            enabled: true,
        },
        action: {
            enabled: true,
            defaultState: [],
        },
        control: {
            enabled: true,
            defaultState: {},
        },
        ladle: {
            enabled: true,
        },
        mode: {
            enabled: true,
            defaultState: "full",
        },
        rtl: {
            enabled: true,
            defaultState: false,
        },
        source: {
            enabled: true,
            defaultState: false,
        },
        theme: {
            enabled: true,
            defaultState: "light",
        },
        width: {
            enabled: true,
            defaultState: 0,
        },
    },
};

export default config;