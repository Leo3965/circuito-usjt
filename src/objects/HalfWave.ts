export enum Diode {
    silicon = 0.7,
    bronio = 0.3
}

export default class HalfWave {
    v1: number;
    n1: number;
    n2: number;
    diode: Diode;
    rl: number;
    f1: number;
    c: number;


    constructor(v1: number, n1: number, n2: number, diode: string, rl: number, f1: number, c: number) {
        this.v1 = v1;
        this.n1 = n1;
        this.n2 = n2;
        if (diode === 'silicon') {
            this.diode = Diode.silicon;
        } else {
            this.diode = Diode.bronio;
        }
        this.rl = rl;
        this.f1 = f1;
        this.c = c;
    }

    // 1# STEP: Determinar tensão eficaz no secundário
    getSecondaryVoltage() {
        return this.v1 * this.n2 / this.n1;
    }

    // 2# STEP: Tensão de pico no secundário (V2p)
    getSecondaryPeakVoltage(v2: number) {
        return Number((Math.pow(2, 1 / 2) * v2).toFixed(3));
    }

    // 3# STEP: Tensão de pico no capacitor (Vcp)
    getCapacitorPeakVoltage(v2p: number, diode: Diode) {
        return Number((v2p / 2 - diode).toFixed(3));
    }

    // 4# STEP: Tensão Ripple (Von)
    getRippleVoltage(vrl: number, f2: number) {
        return Number(((vrl / this.rl) / (this.c * f2)).toFixed(3));
    }

    // 5# STEP: Tensão Média
    getMediumVoltage = function (vmax: number, vmin: number) {
        return (vmax + vmin) / 2;
    }

    calcRectifier() {
        const f2 = 2 * this.f1; //Hz Frequência do secundário
        const v2 = this.getSecondaryVoltage(); // V Tensão Eficaz Secundário
        const v2Peak = this.getSecondaryPeakVoltage(v2); // V Tensão de pico no secundário
        const vcp = this.getCapacitorPeakVoltage(v2Peak, this.diode); // V Tensão de pico no capacitor
        const vrl = vcp; // V
        const von = this.getRippleVoltage(vrl, f2); // V Tensão Ripple
        const vmax = vrl; // V
        const vmin = vrl - von; // V
        const vmed = this.getMediumVoltage(vmax, vmin); // V Tensão Média

        // Montando retorno
    }

}