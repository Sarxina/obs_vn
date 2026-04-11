import type { VNStateData } from "../../common/types.js";
import { WSManager } from "@sarxina/chatgod-js";

export class WSManagerVN extends WSManager {
    emitVNState = (VNState: VNStateData): void => {
        this.frontendIO.emit("vn-update", VNState);
    };
}
