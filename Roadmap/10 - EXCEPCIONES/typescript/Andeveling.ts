// ============================================================
// #10 EXCEPCIONES
// ============================================================

// Nota: en JS/TS, 10 / 0 NO lanza excepción (devuelve Infinity)
// y arr[99] NO lanza (devuelve undefined). Lo que SÍ lanza es
// operar sobre el undefined resultante.

console.log("10 / 0       =", 10 / 0); // Infinity
console.log("[1,2,3][99]  =", [1, 2, 3][99]); // undefined
console.log("parseInt('a')=", parseInt("a")); // NaN

// 1) Forzar y capturar un error real: propiedad sobre undefined
try {
	[1, 2, 3][99]!.toFixed(2);
} catch (e) {
	console.log("Capturado (toFixed sobre undefined):", (e as Error).message);
}

// 2) JSON malformado
try {
	JSON.parse("{malformed}");
} catch (e) {
	console.log("Capturado (JSON parse):", (e as Error).message);
}

// 3) URI malformada
try {
	decodeURIComponent("%");
} catch (e) {
	console.log("Capturado (URI):", (e as Error).message);
}

console.log("\nPrograma sigue vivo después de los errores.\n");

// ============================================================
// EXTRA · Función que lanza 3 tipos de excepción
// ============================================================

class ValidationError extends Error {
	constructor(msg: string) {
		super(msg);
		this.name = "ValidationError";
	}
}

function procesar(x: unknown, y: unknown): number {
	if (typeof x !== "number" || typeof y !== "number") {
		throw new TypeError("Ambos argumentos deben ser números");
	}
	if (y === 0) {
		throw new RangeError("El divisor no puede ser 0");
	}
	if (x < 0) {
		throw new ValidationError("x no puede ser negativo");
	}
	return x / y;
}

function llamarProcesar(x: unknown, y: unknown) {
	try {
		const r = procesar(x, y);
		console.log(`✔ Sin error. procesar(${String(x)}, ${String(y)}) =`, r);
	} catch (e) {
		const err = e as Error;
		console.log(`✘ Tipo de error: ${err.name} → ${err.message}`);
	} finally {
		console.log("→ Ejecución finalizada\n");
	}
}

llamarProcesar(10, 2); // ok
llamarProcesar("10", 2); // TypeError
llamarProcesar(10, 0); // RangeError
llamarProcesar(-5, 2); // ValidationError (custom)
