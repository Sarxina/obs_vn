import { vi } from "vitest";

// `speaker` is a native ALSA binding that probes audio devices on import.
// CI runners are headless without a default ALSA device, so the import alone
// crashes the worker. We never exercise TTS playback in tests.
vi.mock("speaker", () => ({
    default: vi.fn().mockImplementation(() => ({
        write: () => true,
        end: () => {},
        on: () => {},
    })),
}));

// Same reasoning for the Azure speech SDK — the import does worker init and
// TTSManager already gates `authenticate()` on env vars.
vi.mock("microsoft-cognitiveservices-speech-sdk", () => ({
    SpeechConfig: { fromSubscription: vi.fn(() => ({})) },
    SpeechSynthesizer: vi.fn().mockImplementation(() => ({
        speakSsmlAsync: vi.fn(),
        close: vi.fn(),
    })),
}));
