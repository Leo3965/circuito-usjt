import Result, {Value} from "@/objects/Result";

import {Diode} from './HalfWave'


export default class FullWave {

v1: number;
n1: number;
n2: number;
diode: Diode;
rl: number;
f1: number;
c: number;

constructor (v1: number, n1: number, n2: number, diode: string, rl: number, f1: number, c: number){
    this.v1 = v1;
    this.n1 = n1;
    this.n2 = n2;
    if (diode == `silicon`) {
        this.diode = Diode.silicon;
    }else{
        this.diode = Diode.germanio;
    }
    this.rl = rl;
    this.f1 = f1;
    this.c = c / 1_000_000;
}

 // 1# STEP: Determinar tensão eficaz no secundário
 getSecondaryVoltage() {
    return this.v1 * this.n2 / this.n1;
}
// 2# STEP: Tensão de pico no secundário (V2p)
getSecondaryPeakVoltage(v2: number) {
    return Number((Math.pow(2, 1 / 2) * v2).toFixed(3));
}
  // 3# STEP: Tensão de pico no capacitor (Vcp), "multiplicando o diodo por 2"
  getCapacitorPeakVoltage(v2p: number, diode: Diode) {
    return Number((v2p / 2 - (2*diode)).toFixed(3));
}
 
// 4# STEP: Tensão Ripple (Von)
getRippleVoltage(vrl: number, f2: number) {
    return Number(((vrl / this.rl) / (this.c * f2)).toFixed(3));
}

// 5# STEP: Tensão Média
getMediumVoltage = function (vmax: number, vmin: number) {
    return (vmax + vmin) / 2;
}

calcRectifier(): Result {
    const f2 = 2 * this.f1;
    const v2 = this.getSecondaryVoltage();
    const v2Peak = this.getSecondaryPeakVoltage(v2);
    const vcp = this.getCapacitorPeakVoltage(v2Peak, this.diode);
    const vrl = vcp;
    const von = this.getRippleVoltage(vrl, f2);
    const vmax = vrl;
    const vmin = vrl - von;
    const vmed = this.getMediumVoltage(vmax, vmin);

    // Montando retorno
    const result = new Result();
    result.addValue(new Value('f2', String(f2), 'Frequência do secundário', 'Hz'));
    result.addValue(new Value('v2', String(v2), 'Tensão Eficaz no secundário', 'V'));
    result.addValue(new Value('v2Peak', String(v2Peak), 'Tensão de pico no secundário', 'V'));
    result.addValue(new Value('vcp', String(vcp), 'Tensão de pico no capacitor', 'V'));
    result.addValue(new Value('von', String(von), 'Tensão Ripple', 'V'));
    result.addValue(new Value('vmáx', String(vmax), 'Tensão Máxima', 'V'));
    result.addValue(new Value('vmín', String(vmin), 'Tensão Mínima', 'V'));
    result.addValue(new Value('vméd', String(vmed), 'Tensão Média', 'V'));

    return result;
    }

}