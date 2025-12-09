import { VNStateData } from "../../common/types";
import { WSManager } from "./chatgod-js/src/services/WSManager";

export class WSManagerVN extends WSManager {
    emitVNState = (VNState: VNStateData) => {
        this.frontendIO.emit("vn-update", VNState);
    }
}
