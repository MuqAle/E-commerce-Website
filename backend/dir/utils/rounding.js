"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const evenRound = (num, decimalPlaces) => {
    const d = decimalPlaces || 0;
    const m = Math.pow(10, d);
    const n = +(d ? num * m : num).toFixed(8); // Avoid rounding errors
    const i = Math.floor(n), f = n - i;
    const e = 1e-8; // Allow for rounding errors in f
    const r = (f > 0.5 - e && f < 0.5 + e) ?
        ((i % 2 == 0) ? i : i + 1) : Math.round(n);
    return d ? r / m : r;
};
exports.default = evenRound;
