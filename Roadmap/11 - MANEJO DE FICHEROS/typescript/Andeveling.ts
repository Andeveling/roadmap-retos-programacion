// ============================================================
// #11 MANEJO DE FICHEROS
// ============================================================
import * as fs from "node:fs";
import * as readline from "node:readline";

// ---------- Parte 1: crear, escribir, leer y borrar ----------
const FICHERO = "Andeveling.txt";

fs.writeFileSync(
	FICHERO,
	["Nombre: Andeveling", "Edad: 30", "Lenguaje favorito: TypeScript"].join(
		"\n",
	),
);

console.log(`--- ${FICHERO} ---`);
console.log(fs.readFileSync(FICHERO, "utf8"));
fs.unlinkSync(FICHERO);
console.log(`(borrado ${FICHERO})\n`);

// ============================================================
// EXTRA · Gestor de ventas (formato: nombre, cantidad, precio)
// ============================================================
const DB = "ventas.txt";
type Linea = [nombre: string, cantidad: number, precio: number];

const parsear = (txt: string): Linea[] =>
	txt
		.trim()
		.split("\n")
		.filter(Boolean)
		.map((l) => {
			const [n, c, p] = l.split(",").map((s) => s.trim());
			return [n, +c, +p];
		});

const formatear = (ls: Linea[]) =>
	ls.map(([n, c, p]) => `${n}, ${c}, ${p}`).join("\n");

const leer = (): Linea[] =>
	fs.existsSync(DB) ? parsear(fs.readFileSync(DB, "utf8")) : [];

const guardar = (ls: Linea[]) =>
	fs.writeFileSync(DB, ls.length ? formatear(ls) + "\n" : "");

const agregar = (n: string, c: number, p: number) =>
	guardar([...leer(), [n, c, p]]);

const actualizar = (n: string, c: number, p: number) =>
	guardar(leer().map((l) => (l[0] === n ? [n, c, p] : l)));

const eliminar = (n: string) => guardar(leer().filter(([x]) => x !== n));

const total = () => leer().reduce((acc, [, c, p]) => acc + c * p, 0);

const totalPorProducto = (n: string) => {
	const p = leer().find(([x]) => x === n);
	return p ? p[1] * p[2] : 0;
};

const salir = () => {
	if (fs.existsSync(DB)) fs.unlinkSync(DB);
};

// ---------- CLI interactivo (solo cuando hay TTY) ----------
function cli() {
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	});
	const ask = (q: string) => new Promise<string>((res) => rl.question(q, res));
	const menu =
		"1) Añadir  2) Consultar  3) Actualizar  4) Eliminar  5) Total  6) Total por producto  0) Salir\n> ";

	const num = async (q: string) => +(await ask(q));

	const loop = async () => {
		const opt = (await ask(menu)).trim();
		switch (opt) {
			case "1":
				agregar(
					await ask("Nombre: "),
					await num("Cantidad: "),
					await num("Precio: "),
				);
				console.log("Añadido.\n");
				break;
			case "2":
				console.log(leer(), "\n");
				break;
			case "3":
				actualizar(
					await ask("Nombre: "),
					await num("Cantidad: "),
					await num("Precio: "),
				);
				console.log("Actualizado.\n");
				break;
			case "4":
				eliminar(await ask("Nombre: "));
				console.log("Eliminado.\n");
				break;
			case "5":
				console.log("Total:", total(), "\n");
				break;
			case "6": {
				const n = await ask("Nombre: ");
				console.log(`Total ${n}:`, totalPorProducto(n), "\n");
				break;
			}
			case "0":
				rl.close();
				salir();
				console.log("Saliendo.\n");
				return;
			default:
				console.log("Opción no válida.\n");
		}
		loop();
	};
	loop();
}

// ---------- Demo no interactivo (cuando no hay TTY) ----------
function demo() {
	agregar("Mouse", 3, 25);
	agregar("Teclado", 2, 60);
	agregar("Monitor", 1, 200);
	console.log("Tras añadir:", leer());

	actualizar("Mouse", 5, 22);
	console.log("Tras actualizar Mouse:", leer());

	console.log("Venta total:", total());
	console.log("Venta de Teclado:", totalPorProducto("Teclado"));

	eliminar("Monitor");
	console.log("Tras eliminar Monitor:", leer());

	salir();
	console.log("(fichero borrado)\n");
}

if (process.stdin.isTTY) {
	console.log("Gestor de ventas (modo interactivo)");
	cli();
} else {
	demo();
}
