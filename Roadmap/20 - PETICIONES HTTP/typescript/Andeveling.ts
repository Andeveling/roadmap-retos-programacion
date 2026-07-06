// ============================================================
// #20 PETICIONES HTTP
// ============================================================
export {};

// Allowlist de hosts permitidos (evita SSRF si el input viene del usuario)
const ALLOWLIST = new Set(["example.com", "pokeapi.co"]);

function urlPermitida(url: string): URL {
	let u: URL;
	try {
		u = new URL(url);
	} catch {
		throw new Error(`URL inválida: ${url}`);
	}
	if (!ALLOWLIST.has(u.hostname)) {
		throw new Error(`Host no permitido: ${u.hostname}`);
	}
	return u;
}

async function get(url: string): Promise<string> {
	const u = urlPermitida(url);
	const res = await fetch(u);
	if (!res.ok) throw new Error(`HTTP ${res.status} en ${u}`);
	return res.text();
}

// ============================================================
// EXTRA · Cliente de PokeAPI
// ============================================================
type PokemonInfo = {
	nombre: string;
	id: number;
	peso: number;
	altura: number;
	tipos: string[];
	evoluciones: string[];
	juegos: string[];
};

type ChainLink = { species: { name: string }; evolves_to: ChainLink[] };

const POKE_BASE = "https://pokeapi.co/api/v2";

function pathDe(url: string): string {
	// devuelve el pathname quitando el prefijo /api/v2 (si lo tiene),
	// para poder reutilizarlo con pokeGet sin doble prefijo
	try {
		return new URL(url).pathname.replace(/^\/api\/v2/, "");
	} catch {
		throw new Error(`URL inválida: ${url}`);
	}
}

async function pokeGet<T>(path: string): Promise<T> {
	const u = urlPermitida(`${POKE_BASE}${path}`);
	const res = await fetch(u);
	if (!res.ok) throw new Error(`HTTP ${res.status} en ${path}`);
	return (await res.json()) as T;
}

async function pokemon(nombre: string | number): Promise<PokemonInfo> {
	const safeName = encodeURIComponent(String(nombre).toLowerCase());
	const p = await pokeGet<{
		name: string;
		id: number;
		weight: number;
		height: number;
		types: { type: { name: string } }[];
		species: { url: string };
		game_indices: { version: { name: string } }[];
	}>(`/pokemon/${safeName}`);

	const species = await pokeGet<{ evolution_chain: { url: string } }>(
		pathDe(p.species.url),
	);
	const evoChain = await pokeGet<{ chain: ChainLink }>(
		pathDe(species.evolution_chain.url),
	);

	const evoluciones: string[] = [];
	let actual: ChainLink | undefined = evoChain.chain;
	while (actual) {
		evoluciones.push(actual.species.name);
		actual = actual.evolves_to[0];
	}

	return {
		nombre: p.name,
		id: p.id,
		peso: p.weight,
		altura: p.height,
		tipos: p.types.map((t) => t.type.name),
		evoluciones,
		juegos: p.game_indices.map((g) => g.version.name),
	};
}

// ============================================================
// main · ejecutado al final para evitar top-level await en CJS
// ============================================================
async function main() {
	// 1) Petición genérica
	try {
		const html = await get("https://example.com/");
		console.log(
			"✔ example.com → status OK, longitud:",
			html.length,
			"caracteres",
		);
		console.log(
			"Primeros 120:",
			html.slice(0, 120).replace(/\s+/g, " "),
			"...",
		);
	} catch (e) {
		console.error("✘ Error en petición genérica:", (e as Error).message);
	}

	// 2) Cliente PokeAPI
	for (const nombre of ["pikachu", "charmander", "no-existe-xyz"]) {
		try {
			const info = await pokemon(nombre);
			console.log(`\n--- ${info.nombre.toUpperCase()} (#${info.id}) ---`);
			console.log("Peso / Altura:", info.peso, "/", info.altura);
			console.log("Tipos:    ", info.tipos.join(", "));
			console.log("Evolución:", info.evoluciones.join(" → "));
			console.log(
				"Juegos (",
				info.juegos.length,
				"):",
				info.juegos.slice(0, 6).join(", "),
				info.juegos.length > 6 ? "…" : "",
			);
		} catch (e) {
			console.error(`\n✘ ${nombre}: ${(e as Error).message}`);
		}
	}
}

main().catch((e) => console.error("Fatal:", (e as Error).message));
