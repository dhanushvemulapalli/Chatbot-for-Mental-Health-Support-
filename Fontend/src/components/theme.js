import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  globalCss: {
    html: {
      colorPalette: "cyan", // Change this to any color palette you prefer
    },
  },
  initialColorMode: "light",
  useSystemColorMode: false,
});

export const system = createSystem(defaultConfig, config);
