// Variáveis de entrada

// 1 Malha
const fm1 = 200; // V
const r1m1 = 10; // Ohms
const r2m1 = 20;
const r3m1 = 30;

const r1m12 = 40;

// 2 Malha
const fm2 = 50;
const r1m2 = 25;
const r2m2 = 50;

let i1, i2, i3;

const m1i1Multiplier = r1m1 + r2m1 + r3m1 + r1m12;
const m1i2Multiplier = -r1m12;
const m1 = [m1i1Multiplier, m1i2Multiplier, fm1];

const m2i1Multiplier = -r1m12;
const m2i2Multiplier = r1m2 + r2m2 + r1m12;
const m2 = [m2i1Multiplier, m2i2Multiplier, -fm2];
const sum = [];

const calcI2 = function () {
    const t1m1 = m1[0];
    const t1m2 = Math.abs(m2[0]);
    for (let i =0; i < m1.length; i++) {
        const i1Value = m1[i] * t1m2;
        const i2Value = m2[i] * t1m1;
        sum.push(i1Value + i2Value);
    }

    return (sum[2] / sum[1]).toFixed(3);
}

const calcI1 = function (i2) {
    return ((m1[2] - (m1[1]*i2)) / m1[0]).toFixed(3);
}
i2 = calcI2();
i1 = calcI1(i2);
i3 = i1 - i2;

console.log(i2);
console.log(i1);
console.log(i3);
console.log(m1);
console.log(m2);
console.log(sum);

