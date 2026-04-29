import { defineConfig } from "vitest/config";
import swc from "unplugin-swc";

// SWC handles the TC39 stage-3 decorators used by `@updateVNState` and
// `@updateFromFrontend`; vitest's default esbuild transform mis-handles them.
// Vite 7+ uses Oxc for the default JS/TS transform; disable it so SWC is the
// only transformer in the chain.
export default defineConfig({
    oxc: false,
    plugins: [
        swc.vite({
            jsc: {
                target: "es2022",
                parser: {
                    syntax: "typescript",
                    decorators: true,
                },
                transform: {
                    decoratorVersion: "2022-03",
                },
            },
        }),
    ],
    test: {
        include: ["src/**/*.test.ts"],
        exclude: ["**/node_modules/**"],
        environment: "node",
        setupFiles: ["./vitest.setup.ts"],
    },
});
