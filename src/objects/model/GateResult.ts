export class GateValue {
    a: string;
    b: string;
    out: string;

    constructor(a: string, b: string, out: string) {
        this.a = a;
        this.b = b;
        this.out = out;
    }
}

export default class GateResult {
    private _title = 'Tabela Verdade'
    private _values: GateValue[] = [];

    addValue(value: GateValue) {
        this._values.push(value);
    }

    get values(): GateValue[] {
        return this._values;
    }

    set values(value: GateValue[]) {
        this._values = value;
    }

    get title(): string {
        return this._title;
    }

    set title(value: string) {
        this._title = value;
    }
}