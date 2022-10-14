import Result, {Value} from "@/objects/Result";

export default class CircuitSixResistances {
    fm1: number;
    r1m1: number;
    r2m1: number;
    r3m1: number;
    r1m12: number;
    fm2: number;
    r1m2: number;
    r2m2: number;
    m1: number[] = [];
    m2: number[] = [];


    constructor(fm1: number, r1m1: number, r2m1: number, r3m1: number, r1m12: number, fm2: number, r1m2: number, r2m2: number) {
        this.fm1 = fm1;
        this.r1m1 = r1m1;
        this.r2m1 = r2m1;
        this.r3m1 = r3m1;
        this.r1m12 = r1m12;
        this.fm2 = fm2;
        this.r1m2 = r1m2;
        this.r2m2 = r2m2;
    }

    calcI2 = (): number => {
        const sum: number[] = [];
        const t1m1 = this.m1[0];
        const t1m2 = Math.abs(this.m2[0]);

        for (let i = 0; i < this.m1.length; i++) {
            const i1Value = this.m1[i] * t1m2;
            const i2Value = this.m2[i] * t1m1;
            sum.push(i1Value + i2Value);
        }

        return Number((sum[2] / sum[1]).toFixed(3));
    }

    calcI1 = (i2: number): number => {
        return Number(((this.m1[2] - (this.m1[1] * i2)) / this.m1[0]).toFixed(3));
    }

    calcCircuit(): Result {

        const m1i1Multiplier = this.r1m1 + this.r2m1 + this.r3m1 + this.r1m12;
        const m1i2Multiplier = -this.r1m12;
        this.m1 = [m1i1Multiplier, m1i2Multiplier, this.fm1];

        const m2i1Multiplier = -this.r1m12;
        const m2i2Multiplier = this.r1m2 + this.r2m2 + this.r1m12;
        this.m2 = [m2i1Multiplier, m2i2Multiplier, -this.fm2];


        const i2 = this.calcI2();
        const i1 = this.calcI1(i2);
        const i3 = i1 - i2;

        const result = new Result();
        result.addValue(new Value('i1', String(i1), 'Corrente i1', 'A'));
        result.addValue(new Value('i2', String(i2), 'Corrente i2', 'A'));
        result.addValue(new Value('i3', String(i3), 'Corrente i3', 'A'));

        return result;
    }
}