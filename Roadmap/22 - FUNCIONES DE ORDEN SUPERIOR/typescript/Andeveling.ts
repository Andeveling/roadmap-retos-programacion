// ============================================================
// #22 FUNCIONES DE ORDEN SUPERIOR
// ============================================================

// ---------- 1. Ejemplos simples ----------
const nums = [1, 2, 3, 4, 5];

console.log(
	"map (x2):    ",
	nums.map((n) => n * 2),
);
console.log(
	"filter (>2): ",
	nums.filter((n) => n > 2),
);
console.log(
	"reduce (sum):",
	nums.reduce((a, b) => a + b, 0),
);
console.log(
	"find (>3):   ",
	nums.find((n) => n > 3),
);
console.log(
	"some (>4):   ",
	nums.some((n) => n > 4),
);
console.log(
	"every (>0):  ",
	nums.every((n) => n > 0),
);

// ============================================================
// EXTRA · Análisis de estudiantes
// ============================================================
type Estudiante = { nombre: string; nacimiento: string; notas: number[] };

const estudiantes: Estudiante[] = [
	{ nombre: "Ana", nacimiento: "2000-05-10", notas: [8, 9.5, 7] },
	{ nombre: "Luis", nacimiento: "1999-08-22", notas: [10, 9, 9.5] },
	{ nombre: "Marta", nacimiento: "2001-01-15", notas: [5, 6, 7] },
	{ nombre: "Carlos", nacimiento: "1998-12-01", notas: [9, 9, 9] },
];

// Validar: todas las notas entre 0 y 10
const notasValidas = estudiantes
	.flatMap((e) => e.notas)
	.every((n) => n >= 0 && n <= 10);
console.log("\n¿Notas válidas (0-10)?", notasValidas ? "✔" : "✘");

// Promedio por estudiante
const promedios = estudiantes.map((e) => ({
	nombre: e.nombre,
	promedio: e.notas.reduce((a, b) => a + b, 0) / e.notas.length,
}));
console.log("\nPromedios:");
for (const p of promedios)
	console.log(`  ${p.nombre}: ${p.promedio.toFixed(2)}`);

// Mejores estudiantes (>= 9)
const mejores = promedios.filter((p) => p.promedio >= 9).map((p) => p.nombre);
console.log("\nMejores (>= 9):", mejores);

// Ordenados del más joven al más viejo
const masJovenPrimero = [...estudiantes]
	.sort(
		(a, b) =>
			new Date(b.nacimiento).getTime() - new Date(a.nacimiento).getTime(),
	)
	.map((e) => e.nombre);
console.log("Más joven → más viejo:", masJovenPrimero);

// Calificación más alta
const maxNota = Math.max(...estudiantes.flatMap((e) => e.notas));
console.log("Calificación más alta:", maxNota);
