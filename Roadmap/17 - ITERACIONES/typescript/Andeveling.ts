// ============================================================
// #17 ITERACIONES
// ============================================================

const titulo = (n: number, m: string) => console.log(`\n--- ${n}. ${m} ---`);

// ---------- Mecanismos para imprimir 1..10 ----------
titulo(1, "for clásico");
for (let i = 1; i <= 10; i++) console.log(i);

titulo(2, "while");
let i = 1;
while (i <= 10) console.log(i++);

titulo(3, "do...while");
let j = 1;
do {
	console.log(j);
} while (++j <= 10);

// ============================================================
// EXTRA · Más mecanismos (objetivo 5+10)
// ============================================================
titulo(4, "Array.from + forEach");
Array.from({ length: 10 }, (_, k) => k + 1).forEach((n) => console.log(n));

titulo(5, "for...of");
for (const n of Array.from({ length: 10 }, (_, k) => k + 1)) console.log(n);

titulo(6, "for...in (índices del array)");
for (const k in Array.from({ length: 10 })) console.log(+k + 1);

titulo(7, "map (cadena funcional)");
[...Array(10)].map((_, k) => k + 1).forEach((n) => console.log(n));

titulo(8, "reduce (concatena en string)");
console.log(
	Array.from({ length: 10 }, (_, k) => k + 1).reduce((a, b) => `${a} ${b}`, ""),
);

titulo(9, "recursión");
const rec = (n: number): string =>
	n > 10 ? "" : `${n}${n < 10 ? " " : ""}${rec(n + 1)}`;
console.log(rec(1));

titulo(10, "generador (yield)");
function* hasta10(max: number) {
	for (let k = 1; k <= max; k++) yield k;
}
for (const n of hasta10(10)) console.log(n);
