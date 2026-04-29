import { describe, it, expect, vi } from "vitest";
import { Choice } from "../VNManager.js";

describe("Choice", () => {
    it("starts with zero votes and serializes its state", () => {
        const choice = new Choice("Pick me", "!vote1", () => {});
        expect(choice.serialize()).toEqual({
            text: "Pick me",
            keyWord: "!vote1",
            numVotes: 0,
        });
    });

    it("voteForChoice increments numVotes and triggers onStateChange", () => {
        const onStateChange = vi.fn();
        const choice = new Choice("Pick me", "!vote1", onStateChange);

        choice.voteForChoice();
        choice.voteForChoice();

        expect(choice.serialize().numVotes).toBe(2);
        expect(onStateChange).toHaveBeenCalledTimes(2);
    });

    it("resetVotes clears the tally without triggering onStateChange", () => {
        const onStateChange = vi.fn();
        const choice = new Choice("Pick me", "!vote1", onStateChange);
        choice.voteForChoice();
        choice.voteForChoice();
        onStateChange.mockClear();

        choice.resetVotes();

        expect(choice.serialize().numVotes).toBe(0);
        expect(onStateChange).not.toHaveBeenCalled();
    });

    it("setText updates the displayed text", () => {
        const choice = new Choice("Old", "!vote1", () => {});
        choice.setText("New");
        expect(choice.serialize().text).toBe("New");
    });

    it("setKeyWord updates the keyword used for chat-vote matching", () => {
        const choice = new Choice("Pick me", "!vote1", () => {});
        choice.setKeyWord("!vote99");
        expect(choice.getkeyWord()).toBe("!vote99");
        expect(choice.serialize().keyWord).toBe("!vote99");
    });
});
