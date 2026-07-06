// ============================================================
// #05 VALOR Y REFERENCIA
// ============================================================

// ---------- 1. Asignación por valor (tipos primitivos) ----------
let aNumber = 10;
let aString = "hola";
let aBoolean = true;

const copyNumber = aNumber;
const copyString = aString;
const copyBoolean = aBoolean;

aNumber = 99;
aString = "adios";
aBoolean = false;

// Las copias conservan el valor original -> copia independiente.
console.log("Asignación por valor:");
console.log({
	aNumber,
	copyNumber,
	aString,
	copyString,
	aBoolean,
	copyBoolean,
});

// ---------- 2. Asignación por referencia (objetos y arrays) ----------
const arr1 = [1, 2, 3];
const arr2 = arr1;
arr2.push(4); // muta el mismo array al que apunta arr1

const person1 = { name: "Ada", age: 36 };
const person2 = person1;
person2.name = "Grace"; // muta el mismo objeto

console.log("\nAsignación por referencia:");
console.log({ arr1, person1 }); // ambos reflejan los cambios

// ---------- 3. Funciones con parámetros por valor ----------
function double(n: number): number {
	n *= 2; // solo afecta a la copia local
	return n;
}

const n = 5;
const doubled = double(n);

console.log("\nFunción por valor:");
console.log({ original: n, retorno: doubled });

// ---------- 4. Funciones con parámetros por referencia ----------
function rename(user: { name: string }): { name: string } {
	user.name = user.name.toUpperCase(); // muta el objeto original
	return user;
}

const user = { name: "ada" };
const renamed = rename(user);

console.log("\nFunción por referencia:");
console.log({ original: user, retorno: renamed });

// ============================================================
// EXTRA · Dos programas que intercambian 2 valores
// ============================================================

// --- Por valor: primitivos -> la función solo puede devolverlos ---
function swapByValue<T>(x: T, y: T): [T, T] {
	return [y, x];
}

const valA = "primero";
const valB = "segundo";
const [newValA, newValB] = swapByValue(valA, valB);

console.log("\nEXTRA · Por valor:");
console.log("Originales:", { valA, valB }); // intactos
console.log("Nuevos:    ", { newValA, newValB }); // invertidos

// --- Por referencia: usamos un envoltorio para poder mutar desde dentro ---
type Box<T> = { value: T };

function swapByReference<T>(x: Box<T>, y: Box<T>): [Box<T>, Box<T>] {
	const tmp = x.value;
	x.value = y.value;
	y.value = tmp;
	return [x, y];
}

const boxA: Box<number> = { value: 1 };
const boxB: Box<number> = { value: 2 };
const [newBoxA, newBoxB] = swapByReference(boxA, boxB);

console.log("\nEXTRA · Por referencia:");
console.log("Originales:", { boxA, boxB }); // mutados (intercambiados)
console.log("Nuevos:    ", { newBoxA, newBoxB });
