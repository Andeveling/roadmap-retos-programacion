// ============================================================
// #16 EXPRESIONES REGULARES
// ============================================================

// ---------- 1. Extraer números de un texto ----------
const texto = "Tengo 2 gatos, 15 peces, -3.14 hamsters y 0 ranas.";
const numeros = texto.match(/-?\d+(?:\.\d+)?/g);
console.log("Números extraídos:", numeros);

// ============================================================
// EXTRA · Validar email, teléfono y URL
// ============================================================
const reEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const reTel = /^\+?[\d\s-]{7,20}$/;
const reURL = /^https?:\/\/[^\s/$.?#].[^\s]*$/i;

const casos: [RegExp, string, boolean][] = [
	[reEmail, "user@example.com", true],
	[reEmail, "no-es-email", false],
	[reTel, "+34 612 345 678", true],
	[reTel, "12345", false],
	[reURL, "https://retosdeprogramacion.com/roadmap", true],
	[reURL, "ftp://algo", false],
];

console.log("\nValidaciones:");
for (const [re, valor, esperado] of casos) {
	const real = re.test(valor);
	console.log(
		`  ${real === esperado ? "✔" : "✘"} ${re.source.padEnd(45)} → ${valor} = ${real}`,
	);
}
