import type { StorybookConfig } from "@storybook/react-vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { MATURITY_TAGS } from "./maturity-tags";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  staticDirs: ["./static"],
  addons: [
    "@storybook/addon-docs",
    "storybook-addon-pseudo-states",
    "storybook-addon-tag-badges",
  ],
  tags: Object.fromEntries(MATURITY_TAGS.map(({ id }) => [id, {}])),
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  features: {
    sidebarOnboardingChecklist: false,
  },
  viteFinal: async (config) => {
    const { mergeConfig } = await import("vite");
    return mergeConfig(config, {
      plugins: [tsconfigPaths()],
    });
  },
};
export default config;
