import { type PlaywrightTestConfig, devices } from "@playwright/test";

// Desktop viewports
const chromium = {
    name: "chromium",
    use: devices["Desktop Chrome"],
};
const firefox = {
    name: "firefox",
    use: devices["Desktop Firefox"],
};
const safari = {
    name: "webkit",
    use: devices["Desktop Safari"],
};
const desktopPlatforms = [chromium, firefox, safari];

/*
// Tablet viewports
const tabletSafari = {
    name: "Tablet safari",
    use: devices["iPad (gen 7)"],
};
const tabletChrome = {
    name: "Tablet chrome",
    use: devices["Galaxy Tab S4"],
};
const tabletPlatforms = [tabletSafari, tabletChrome];

// Mobile viewports
const mobileChrome = {
    name: "Mobile Chrome",
    use: devices["Pixel 5"],
};
const mobileSafari = {
    name: "Mobile Safari",
    use: devices["iPhone 12"],
};
const mobilePlatforms = [mobileChrome, mobileSafari];
*/

const config: PlaywrightTestConfig = {
    testDir: "./tests",
    timeout: 30 * 1000,
    expect: {
        timeout: 5000,
    },
    fullyParallel: true,
    reporter: "html",
    use: {
        actionTimeout: 0,
        trace: "on-first-retry",
    },
    projects: [...desktopPlatforms],
};

export default config;
