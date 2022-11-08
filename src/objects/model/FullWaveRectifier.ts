import {Diode} from "@/objects/enum/DiodeEnum";
import Result, {Value} from "@/objects/model/Result";

export default class FullWaveRectifier {
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
        this.c = c;

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

    // 3# - Tensão de pico n0 capacitor
    getLoadPickVoltage(v2p: number) {
        return Number((v2p - (2 * this.diode)).toFixed(2)); // vpc
    }

    // 4# - Corrente média na carga
    getMediumCurrent(vpc: number) {
        return Number((vpc / this.r).toFixed(2)); // im
    }

    // 5# - Frequência no secundário
    getSecundaryFrequency() {
        return Number((2 * this.f).toFixed(2));
    }

    // 6# - Tensão Ripple
    getRippleVoltage(im: number, f2: number) {
        return Number((im / this.c * f2).toFixed(3)); // vor
    }

    // 7# - Tensão Média
    getMediumVoltage(vcp: number, vor: number) {
        return Number(((vcp + (vcp - vor)) / 2).toFixed(2)); // vmed
    }

    calcRectifier(): Result {
        const v2 = this.getSecondaryVoltage();
        const v2p = this.getSecondaryPickVoltage(v2);
        const vpc = this.getLoadPickVoltage(v2p);
        const im = this.getMediumCurrent(vpc);
        const f2 = this.getSecundaryFrequency();
        const vor = this.getRippleVoltage(im, f2);
        const vmed = this.getMediumVoltage(vpc, vor);

        // Montando retorno
        const result = new Result();
        result.addValue(new Value('V2', String(v2), 'Tensão No Secundário', 'V'));
        result.addValue(new Value('V2Peak', String(v2p), 'Tensão De Pico No Secundário', 'V'));
        result.addValue(new Value('Vpc', String(vpc), 'Tensão De Pico No Capacitor', 'V'));
        result.addValue(new Value('Im', String(im), 'Corrente Média No Sistema', 'A'));
        result.addValue(new Value('Im', String(f2), 'Frequência no secundário', 'Htz'));
        result.addValue(new Value('Vr', String(vor), 'Tensão de Ripple', 'V'));
        result.addValue(new Value('Vméd', String(vmed), 'Tensão Média', 'V'));

        return result;
    }
}