import { describe, it, expect } from "vitest";
import { Location } from "../VNManager.js";

describe("Location", () => {
    it("defaults to a classroom with a unique generated keyword", () => {
        const loc = new Location();
        const data = loc.serialize();

        expect(data.name).toBe("classroom");
        expect(data.image).toBe("defaultClassroom.jpg");
        expect(data.keyWord).toMatch(/^!location\d+/);
    });

    it("accepts explicit constructor args", () => {
        const loc = new Location("library", "library.jpg", "!libraryKey");
        expect(loc.serialize()).toEqual({
            name: "library",
            image: "library.jpg",
            keyWord: "!libraryKey",
        });
    });

    it("update modifies name and image but preserves keyWord", () => {
        const loc = new Location("library", "library.jpg", "!libraryKey");
        loc.update({ name: "tavern", image: "tavern.jpg", keyWord: "!ignored" });

        expect(loc.serialize()).toEqual({
            name: "tavern",
            image: "tavern.jpg",
            keyWord: "!libraryKey",
        });
    });

    it("two default Locations get distinct keywords", () => {
        const a = new Location();
        const b = new Location();
        expect(a.serialize().keyWord).not.toBe(b.serialize().keyWord);
    });
});
