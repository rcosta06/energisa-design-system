import type { Preview } from "@storybook/react";
import "../src/styles/tokens.css";
import { DocsPage } from "./DocsPage";

export const globalTypes = {
  theme: {
    name: "Theme",
    description: "Light/Dark — troca os tokens semantic (src/styles/tokens.css)",
    defaultValue: "light",
    toolbar: {
      icon: "circlehollow",
      items: [
        { value: "light", icon: "sun", title: "Light" },
        { value: "dark", icon: "moon", title: "Dark" },
      ],
      showName: true,
      dynamicTitle: true,
    },
  },
};

const preview: Preview = {
  decorators: [
    (Story, context) => {
      const theme = context.globals?.theme ?? "light";
      document.documentElement.setAttribute("data-theme", theme);
      document.documentElement.classList.toggle("dark", theme === "dark");
      document.body.style.background = "var(--color-surface-secondary)";
      return Story();
    },
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#ffffff" },
        { name: "dark", value: "#1b1b1b" },
      ],
    },
    docs: {
      page: DocsPage,
    },
    a11y: {
      config: {
        rules: [{ id: "color-contrast", enabled: true }],
      },
      element: "#storybook-root",
    },
    options: {
      panelPosition: "right",
      storySort: {
        order: ["Introduction", "Foundations", ["Colors", "Typography", "SpacingAndRadius", "Icons"], "Components", ["Button", "IconButton", "Input"]],
      },
    },
  },
};

export default preview;
