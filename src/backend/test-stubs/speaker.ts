// Stub for the `speaker` package. The real one is a native ALSA binding
// that probes audio devices on import — fatal in headless CI environments.
// Tests don't exercise audio playback.
export default class Speaker {
    write(): boolean {
        return true;
    }
    end(): void {}
    on(): this {
        return this;
    }
}
