//  z = {x: ..., y: ...}

function Neg(z) {
    return {x: -z.x, y: -z.y};
}

function Add(z, w) {
    return {x: z.x + w.x, y: z.y + w.y};
}

function Sub(z, w) {
    return Add(z, Neg(w));
}

function Abs(z) {
    return Math.sqrt(z.x * z.x + z.y * z.y);
}

function Mul(z, w) {
    return { x: z.x * w.x - z.y * w.y, y: z.x * w.y + z.y * w.x };
}

function Log(z) {
    let r = Math.sqrt(z.x * z.x + z.y * z.y);
    return { x: Math.log(r), y: Math.atan2(z.y, z.x) };
}

function Exp(z) {
    let r = Math.exp(z.x);
    return { x: r * Math.cos(z.y), y: r * Math.sin(z.y) };
}

function Pow(z, w) {
    return Exp(Mul(w, Log(z)));
}

function Inv(z) {
    return Pow(z, {x: -1.0, y: 0.0});
}

function Div(z, w) {
    return Mul(z, Inv(w));
}

function Sin(z) {
    return { x: Math.sin(z.x) * Math.cosh(z.y), y: Math.cos(z.x) * Math.sinh(z.y) };
}

function Cos(z) {
    return { x: Math.cos(z.x) * Math.cosh(z.y), y: Math.sin(z.x) * Math.sinh(z.y) };
}

function Tan(z) {
    return Div(Sin(z), Cos(z));
}

function Polar(x, y) {
    return { r: Math.sqrt(x*x + y*y), theta: Math.atan2(y, x) }
}

function Rectangular(r, theta) {
    return { x: r * Math.cos(theta), y: r * Math.sin(theta) };
}
