
// these should all be changed to deal with BigInts instead of Numbers
//  Math.* functions don't work with BigInts, however.  Only the following op:
            // console.log(canvas.width);
//     + * - % **  /
//   division is integer division, unlike with Numbers

//  Why is this here?  Doesn't JavaScript have a mod operator?
//  Yes, but it's the Truncated variety, and we need Floored.
//  See https://en.wikipedia.org/wiki/Modulo

// function Mod(a, b) {
//     return a - b*Math.floor(a/b);
// }

// if ((r > 0 && denom < 0) || (r < 0 && denom > 0)) {
//     q = q - 1;
//     r = r + denom;

function Mod(a, m) {
    let r = BigInt(a) % BigInt(m);
    if ((r > 0 && m < 0) || (r < 0 && m > 0)) {
        r += BigInt(m);
    }
    return r;
}

// function InvMod(p, k) {
//     if (k == 1) return 1;
//     return Mod(Math.floor((-InvMod(k, Mod(p,k)) * p + 1) / k), p);
// }

function InvMod(p, k) {
    return PowerMod(k, p-2, p);
}

function PowerMod(a, b, m) {
    if (b == 0) return 1;
    if (b % 2 == 0) {
        return Math.pow(PowerMod(a, b/2, m), 2) % m;
    }
    else {
        return (a * PowerMod(a, b-1, m)) % m;
    }
}

// function IsPrime(n) {
//     if (n == 1) return false;
//     if (n == 2 ||  n == 3) return true;
//     if (n % 2 == 0) return false;
//     let d = 3;
//     while (d**2 <= n) {
//         if (n % d == 0) return false;
//         d += 2;
//     }
//     return true;
// }

/*
   Primality test based on Miller-Rabin and this paper by
   Jiang and Deng:  https://arxiv.org/abs/1207.0063
*/
function IsPrime(n)
{
    let m, s, t;
    // assert(n < 3825123056546413051n);
    let bases = [2, 3, 5, 7, 11, 13, 17, 19, 23];

    if (n < 29)
        return bases.includes(n);

    t = m = n - 1;
    s = 0;
    while (t % 2 == 0) {
        t /= 2;
        s += 1;
    }
    // assert(m == t * 2**s);

    function test(base) {
        let b = PowerMod(base, t, n);
        if (b == 1 || b == m)
            return true;
        for (let i = 1; i < s; i++) {
            b = PowerMod(b, 2, n);
            if (b == m)
                return true;
            if (b == 1)
                return false;
        }
        return false;
    }

    for (let base of bases) {
        if (!test(base))
            return false;
    }
    return true;
}

//  return next prime > n
function NextPrime(n)
{
    for (let t = n + 1; ; t++) {
        if (IsPrime(t))
            return t;
    }
}

function PrevPrime(n)
{
    for (let t = n - 1; ; --t) {
        if (IsPrime(t))
            return t;
    }
}

// generator that produces primes
function* Primes(N=100) {  // to-do: add limit
    yield 2; yield 3;
    let t = 5;
    while (true) {
        if (IsPrime(t))
            yield t;
        t += 1;
    }
}

function Factor(n) {
    let factors = {};
    
}

// a quick and dirty check for n being a quadratic residue mod p
function QuadraticResidue(n, p) {
    for (let k = 1; k < p; k++) {
        if (Mod(k*k, p) == n) {
            return true;
        }
    }
    return false;
}