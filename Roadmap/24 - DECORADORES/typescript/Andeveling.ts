// ============================================================
// #24 DECORADORES
// Un decorador es una función que envuelve otra para extender su
// comportamiento sin modificarla. La sintaxis @decorador es azúcar
// sobre esta misma idea.
// ============================================================

// ---------- 1. Decorador genérico (forma de función, genérico) ----------
function log<TArgs extends unknown[], TReturn>(
	fn: (...args: TArgs) => TReturn,
	nombre = fn.name,
): (...args: TArgs) => TReturn {
	return (...args: TArgs): TReturn => {
		console.log(`→ ${nombre}(${args.join(", ")})`);
		const r = fn(...args);
		console.log(`← ${nombre} =`, r);
		return r;
	};
}

const sumar = (a: number, b: number): number => a + b;
const sumarLog = log(sumar);
sumarLog(2, 3);

// ============================================================
// EXTRA · Decorador que contabiliza llamadas
// ============================================================
function contar<TArgs extends unknown[], TReturn>(
	fn: (...args: TArgs) => TReturn,
): ((...args: TArgs) => TReturn) & { llamadas: () => number } {
	let n = 0;
	const wrapped = (...args: TArgs): TReturn => {
		n++;
		console.log(`Llamada #${n} a ${fn.name}(${args.join(", ")})`);
		return fn(...args);
	};
	(
		wrapped as ((...args: TArgs) => TReturn) & { llamadas: () => number }
	).llamadas = () => n;
	return wrapped as ((...args: TArgs) => TReturn) & { llamadas: () => number };
}

const saludar = (a: string, b: string): string => `Hola, ${a} y ${b}`;
const saludarContado = contar(saludar);

saludarContado("Ana", "Luis");
saludarContado("Marta", "Carlos");
saludarContado("Eva", "Pepe");
console.log("Total de llamadas:", saludarContado.llamadas());

// ============================================================
// Equivalente con sintaxis @ (requiere "experimentalDecorators"
// en tsconfig o target es2022+ para stage-3):
//
//   @log
//   @contar
//   metodo() { ... }
// ============================================================
