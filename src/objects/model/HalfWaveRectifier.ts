import {Diode} from "@/objects/enum/DiodeEnum";
import Result, {Value} from "@/objects/model/Result";

export default class HalfWaveRectifier {
    v: number;
    n1: number;
    n2: number;
    f: number;
    diode: Diode;
    r: number;
    c: number;

    constructor(v: number, n1: number, n2: number, f: number, diode: string, r: number, c: number) {
        this.v = v;
        this.n1 = n1;
        this.n2 = n2;
        this.f = f;
        this.r = r;
        this.c = c / 1_000_000;

        if (diode === 'silicon') {
            this.diode = Diode.silicon;
        } else {
            this.diode = Diode.germanio;
        }
    }

    // #1 - Tensão no secundário
    getSecondaryVoltage() {
        return Number((this.v * this.n2 / this.n1).toFixed(2)); // v2
    }

    // 2# - Tensão de pico no secundário
    getSecondaryPickVoltage(v2p: number) {
        return Number((v2p * Math.pow(2, (1 / 2))).toFixed(2)); // v2p
    }

    // 3# - Tensão de pico na carga
    getLoadPickVoltage(v2p: number) {
        return Number((v2p - this.diode.valueOf()).toFixed(2)); // vpc
    }

    // 4# - Tensão eficaz na carga
    getEffectiveVoltagePick(vpc: number) {
        return Number((vpc / Math.pow(2, (1 / 2))).toFixed(2)); // vce
    }

    // 5# - Corrente média na carga
    getMediumCurrent(vpc: number) {
        return Number((vpc / this.r).toFixed(10)); // im
    }

    // 6# - Tensão Ripple
    getRippleVoltage(im: number) {
        return Number((im / ((this.c) * this.f)).toFixed(3)); // vor
    }

    // 7# - Tensão Média
    getMediumVoltage(vcp: number, vor: number) {
        return Number(((vcp + (vcp - vor)) / 2).toFixed(2)); // vmed
    }


    calcRectifier(): Result {
        const v2 = this.getSecondaryVoltage();
        const v2p = this.getSecondaryPickVoltage(v2);
        const vpc = this.getLoadPickVoltage(v2p);
        const vce = this.getEffectiveVoltagePick(vpc);
        const im = this.getMediumCurrent(vpc);
        const vor = this.getRippleVoltage(im);
        const vMed = this.getMediumVoltage(vpc, vor);

        // Montando retorno
        const result = new Result();
        result.addValue(new Value('V2', String(v2), 'Tensão Eficaz no secundário', 'V'));
        result.addValue(new Value('V2Peak', String(v2p), 'Tensão de pico no secundário', 'V'));
        result.addValue(new Value('Vpc', String(vpc), 'Tensão de pico na carga', 'V'));
        result.addValue(new Value('Vce', String(vce), 'Tensão Eficaz na carga', 'V'));
        result.addValue(new Value('Im', String(im), 'Corrente Média na Carga', 'A'));
        result.addValue(new Value('Vr', String(vor), 'Tensão de Ripple', 'V'));
        result.addValue(new Value('Vméd', String(vMed), 'Tensão Média', 'V'));

        return result;
    }
}