import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    globalSetup: ["./vitest.setup.ts"],
    reporters: ["verbose"],
  },
});
