const getRippleVoltage = function () {
    return Number((0.056288 / ((100/1_000_000) * 120)).toFixed(3)); // vor
}

console.log(getRippleVoltage());