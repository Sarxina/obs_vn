import { defineConfig } from "vitest/config";
import swc from "unplugin-swc";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// SWC handles the TC39 stage-3 decorators used by `@updateVNState` and
// `@updateFromFrontend`; vitest's default esbuild transform mis-handles them.
// Vite 7+ uses Oxc for the default JS/TS transform; disable it so SWC is the
// only transformer in the chain.
//
// `speaker` and `microsoft-cognitiveservices-speech-sdk` are aliased to local
// stubs because their imports do native/heavy initialization (ALSA, worker
// processes) that fail in headless CI. The aliases substitute at module
// resolution time, which is foolproof — `vi.mock` is too late for transitive
// dependencies that load during worker startup.
export default defineConfig({
    oxc: false,
    resolve: {
        alias: [
            { find: "speaker", replacement: path.resolve(__dirname, "test-stubs/speaker.ts") },
            {
                find: "microsoft-cognitiveservices-speech-sdk",
                replacement: path.resolve(__dirname, "test-stubs/azure-speech.ts"),
            },
        ],
    },
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
    },
});
