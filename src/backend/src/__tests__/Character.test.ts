import { describe, it, expect } from "vitest";
import { Character } from "../VNManager.js";

describe("Character", () => {
    it("starts with default name 'Sarxina', not in scene, with the front-facing image", () => {
        const c = new Character("!hero", () => {});
        const data = c.serialize();

        expect(data.name).toBe("Sarxina");
        expect(data.inScene).toBe(false);
        expect(data.image).toBe("SarxinaFront.png");
        expect(data.keyWord).toBe("!hero");
    });

    it("serialize merges Character fields on top of the ChatGod base shape", () => {
        const c = new Character("!hero", () => {});
        const data = c.serialize();

        // From ChatGod base
        expect(data).toHaveProperty("currentChatter");
        expect(data).toHaveProperty("queueSize");
        expect(data).toHaveProperty("latestMessage");
        expect(data).toHaveProperty("ttsVoice");
        expect(data).toHaveProperty("ttsStyle");
        expect(data).toHaveProperty("isSpeaking");
        // From Character
        expect(data).toHaveProperty("name");
        expect(data).toHaveProperty("inScene");
    });

    it("update applies full snapshot, mutating both Character + ChatGod fields", () => {
        const c = new Character("!hero", () => {});

        c.update({
            // Character-specific
            name: "Lydos",
            inScene: true,
            image: "Lydos.png",
            // ChatGod base
            keyWord: "!lydos",
            currentChatter: "alice",
            queueSize: 0,
            latestMessage: "I have arrived.",
            ttsVoice: "en-US-AriaNeural",
            ttsStyle: "cheerful",
            isSpeaking: false,
        });

        const data = c.serialize();
        expect(data.name).toBe("Lydos");
        expect(data.inScene).toBe(true);
        expect(data.image).toBe("Lydos.png");
        expect(data.keyWord).toBe("!lydos");
        expect(data.latestMessage).toBe("I have arrived.");
        expect(c.getName()).toBe("Lydos");
        expect(c.getInScene()).toBe(true);
    });
});
