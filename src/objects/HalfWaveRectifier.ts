import RectifierAbstract from "@/objects/RectifierAbstract";
import {Diode} from "@/objects/DiodeEnum";
import Result, {Value} from "@/objects/Result";

export default class HalfWaveRectifier extends RectifierAbstract {
    override getCapacitorPeakVoltage(v2p: number, diode: Diode): number {
        return Number((v2p - diode).toFixed(3));
    }

    // #4 Tensão eficaz na carga
    getCapacitorVoltage(vcp: number): number {
        return Number((vcp / Math.pow(2, 1 / 2)).toFixed(3));
    }

    // #5 Corrente média na carga
    getMediumCurrent(vcp: number): number {
        return Number((vcp / this.rl).toFixed(3));
    }

    override getRippleVoltage(im: number): number {
        return Number((im / this.c * this.f1).toFixed(3));
    }

    override getMediumVoltage(vcp: number, vr: number): number {
        return Number(((vcp + (vcp - vr)) / 2).toFixed(3));
    }

    override calcRectifier(): Result {
        const f2 = 2 * this.f1;
        const v2 = this.getSecondaryVoltage();
        const v2p = this.getSecondaryPeakVoltage(v2);
        const vpc = this.getCapacitorPeakVoltage(v2p, this.diode);
        const vce = this.getCapacitorVoltage(vpc);
        const im = this.getMediumCurrent(vpc);
        const vr = this.getRippleVoltage(im);
        const vMed = this.getMediumVoltage(vpc, vr);

        // Montando retorno
        const result = new Result();
        result.addValue(new Value('F2', String(f2), 'Frequência do secundário', 'Hz'));
        result.addValue(new Value('V2', String(v2), 'Tensão Eficaz no secundário', 'V'));
        result.addValue(new Value('V2Peak', String(v2p), 'Tensão de pico no secundário', 'V'));
        result.addValue(new Value('Vpc', String(vpc), 'Tensão de pico na carga', 'V'));
        result.addValue(new Value('Vce', String(vce), 'Corrente média na carga', 'A'));
        result.addValue(new Value('Im', String(im), 'Tensão Máxima', 'V'));
        result.addValue(new Value('Vr', String(vr), 'Tensão de Ripple', 'V'));
        result.addValue(new Value('Vméd', String(vMed), 'Tensão Média', 'V'));

        return result;
    }
}