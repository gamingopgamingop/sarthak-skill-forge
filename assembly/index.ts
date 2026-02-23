// The entry file of your WebAssembly module.
// @ts-ignore
// @ts-nocheck
import { i32 } from 'assemblyscript/std/assembly';

export function add(a: i32, b: i32): i32 {
  return a + b;
}

export function sub(a: i32, b: i32): i32 {
  return a - b;
}

export function mul(a: i32, b: i32): i32 {
  return a * b;
}

export function div(a: i32, b: i32): i32 {
  return b == 0 ? 0 : a / b;
}

export function gcd(a: i32, b: i32): i32 {
  a = a < 0 ? -a : a;
  b = b < 0 ? -b : b;
  while (b != 0) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a;
}

export function pow(base: i32, exp: i32): i32 {
  if (exp < 0) return 0;
  let result: i32 = 1;
  let b: i32 = base;
  let e: i32 = exp;
  while (e > 0) {
    if (e & 1) {
      result *= b;
    }
    b *= b;
    e >>= 1;
  }
  return result;
}
