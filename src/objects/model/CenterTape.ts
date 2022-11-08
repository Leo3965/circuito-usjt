import RectifierAbstract from "@/objects/model/RectifierAbstract";

export default class CenterTape extends RectifierAbstract {

    constructor(v1: number, n1: number, n2: number, diode: string, rl: number, f1: number, c: number) {
        super(c, diode, f1, n1, n2, rl, v1);
    }

}