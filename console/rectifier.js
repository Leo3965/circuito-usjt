const getDiodeType = function (type) {
    switch (type) {
        case 'silicio':
            return 0.7;
        case 'barroco':
            return 0.3;
    }
}

// 1# STEP: Determinar tensão eficaz no secundário
const getSecondaryVoltage = function (v1, n1, n2) {
    return v1 * n2 / n1;
}

// 2# STEP: Tensão de pico no secundário (V2p)
const getSecondaryPeakVoltage = function (v2) {
    return Number((Math.pow(2, 1/2) * v2).toFixed(3));
}

// 3# STEP: Tensão de pico no capacitor (Vcp)
const getCapacitorPeakVoltage = function (v2p, vDiode) {
    return Number((v2p/2 - vDiode).toFixed(3));
}

// 4# STEP: Tensão Ripple (Von)
const getRippleVoltage = function (vrl, rl, c, f2) {
    return Number(((vrl/rl)/(c * f2)).toFixed(3));
}

// 5# STEP: Tensão Média
const getMediumVoltage = function (vmax, vmin) {
    return (vmax + vmin) / 2;
}

// Variáveis de entrada

const v1 = 200; // V Tensão Eficaz No Primário
const n1 = 1000; //
const n2 = 200; //
const dType = 'silicio'; // Tipo dos diodos
const d1 = getDiodeType(dType); // V
const d2 = getDiodeType(dType); // V
const rl = 4000; // Ohms
const f1 = 60; //Hz Frequência do primário
const c = 100/1_000_000 // F

// Variáveis de saída
const f2 = 2 * f1; //Hz Frequência do secundário
const v2 = getSecondaryVoltage(v1, n1, n2); // V Tensão Eficaz Secundário
const v2Peak = getSecondaryPeakVoltage(v2); // V Tensão de pico no secundário
const vcp = getCapacitorPeakVoltage(v2Peak, d1); // V Tensão de pico no capacitor
const vrl = vcp; // V
const von = getRippleVoltage(vrl, rl, c, f2); // V Tensão Ripple
const vmax = vrl; // V
const vmin = vrl - von; // V
const vmed = getMediumVoltage(vmax, vmin); // V Tensão Média

console.log('Tensão Eficaz Secundário: ',v2);
console.log('Tensão de pico no secundário: ',v2Peak);
console.log('Tensão de pico no capacitor: ',vcp);
console.log('Tensão Ripple: ',von);
console.log('Tensão Média: ',vmed);