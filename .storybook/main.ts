import type { StorybookConfig } from "@storybook/marko-vite";
// import { marko } from "@storybook/addon-marko";
// import { angular } from "@storybook/addon-angular";
// import { remix } from "storybook-addon-remix-react-router";
/** @type { import('@storybook/react-vite').StorybookConfig } */
export default {
  framework: "@storybook/marko-vite",
  stories: ["../src/**/{,*.}stories.ts"],
  core: {
    disableTelemetry: true,
    disableWhatsNewNotifications: true,
  },
  features: {
    storyStoreV7: true,
  },
  async addons(entry = []) {
    return [...entry, "@storybook/addon-marko","storybook-addon-remix-react-router" 
    ];
  },
} satisfies StorybookConfig;

