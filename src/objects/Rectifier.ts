import {Diode} from "@/objects/DiodeEnum";
import Result from "@/objects/Result";

export default interface Rectifier {
    v1: number;
    f1: number;
    n1: number;
    n2: number;
    diode: Diode;
    rl: number;
    c: number;

    getSecondaryVoltage(): number;

    getSecondaryPeakVoltage(v2: number): number;

    getCapacitorPeakVoltage(v2p: number, vDiode: number): number;

    getRippleVoltage(vrl: number, rl: number, c: number, f2: number): number;

    getMediumVoltage(vmax: number, vmin: number): number;

    calcRectifier(): Result;
}