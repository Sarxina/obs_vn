// Stub for `microsoft-cognitiveservices-speech-sdk`. The real package does
// worker init at import. TTSManager already gates `authenticate()` on env
// vars, but the import itself is heavy/flaky in CI.
export const SpeechConfig = {
    fromSubscription: () => ({}),
};
export class SpeechSynthesizer {
    speakSsmlAsync(): void {}
    close(): void {}
}
