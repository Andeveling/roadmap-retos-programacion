// ============================================================
// #18 CONJUNTOS
// ============================================================

const datos: number[] = [1, 2, 3];
console.log("Inicial:", datos);

// 1) Añadir al final
datos.push(4);

// 2) Añadir al principio
datos.unshift(0);

// 3) Añadir varios en bloque al final
datos.push(5, 6);

// 4) Añadir varios en bloque en una posición concreta
datos.splice(2, 0, 10, 11);

// 5) Eliminar un elemento en posición concreta
datos.splice(1, 1);

// 6) Actualizar valor en posición concreta
datos[2] = 99;

console.log("Tras operaciones:", datos);

// 7) Comprobar si un elemento está
console.log("¿Contiene 99?", datos.includes(99));

// 8) Vaciar todo
datos.length = 0;
console.log("Vacío:", datos);

// ============================================================
// EXTRA · Unión, intersección, diferencia y diferencia simétrica
// ============================================================
const a = new Set([1, 2, 3, 4]);
const b = new Set([3, 4, 5, 6]);

const union = new Set([...a, ...b]);
const interseccion = new Set([...a].filter((x) => b.has(x)));
const diferencia = new Set([...a].filter((x) => !b.has(x)));
const simDiff = new Set([...a, ...b].filter((x) => a.has(x) !== b.has(x)));

console.log("\nA =", [...a], " B =", [...b]);
console.log("Unión:           ", [...union]);
console.log("Intersección:    ", [...interseccion]);
console.log("Diferencia A-B:  ", [...diferencia]);
console.log("Diferencia sim.: ", [...simDiff]);
