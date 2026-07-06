// ============================================================
// #15 ASINCRONÍA
// ============================================================

function tarea(nombre: string, segundos: number): Promise<string> {
	const inicio = new Date();
	console.log(
		`▶ ${nombre} empieza (${inicio.toISOString()}), durará ${segundos}s`,
	);
	return new Promise((resolve) => {
		setTimeout(() => {
			console.log(`✔ ${nombre} finaliza (${new Date().toISOString()})`);
			resolve(nombre);
		}, segundos * 1000);
	});
}

// ============================================================
// EXTRA · C (3s), B (2s), A (1s) en paralelo, luego D (1s)
// ============================================================
async function principal() {
	console.log("--- Lanzando C, B, A en paralelo ---");
	await Promise.all([tarea("C", 3), tarea("B", 2), tarea("A", 1)]);
	console.log("--- Las 3 terminaron. Ahora D ---");
	await tarea("D", 1);
	console.log("--- Fin ---");
}

principal();
