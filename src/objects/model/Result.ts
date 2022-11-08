export class Value {
    property: string;
    value: string;
    description: string;
    unit: string

    constructor(property: string, value: string, description: string, unit: string) {
        this.property = property;
        this.value = value;
        this.description = description;
        this.unit = unit;
    }
}

export default class Result {
    private _values: Value[] = [];

    addValue(value: Value) {
        this._values.push(value);
    }

    get values(): Value[] {
        return this._values;
    }

    set values(value: Value[]) {
        this._values = value;
    }
}