// ============================================================
// #21 CALLBACKS
// ============================================================

// ---------- 1. Callback simple ----------
function saludar(nombre: string, cb: (msg: string) => void): void {
	cb(`Hola, ${nombre}`);
}

saludar("Andeveling", (msg) => console.log(msg));

// ============================================================
// EXTRA · Simulador de pedidos de restaurante
// ============================================================
type ConfirmCb = () => void;
type ListoCb = () => void;
type EntregadoCb = () => void;

const esperaAleatoria = (): number => Math.floor(Math.random() * 10) + 1; // 1..10 segundos

function procesarPedido(
	plato: string,
	confirmar: ConfirmCb,
	listo: ListoCb,
	entregado: EntregadoCb,
): void {
	confirmar();
	setTimeout(() => {
		listo();
		setTimeout(entregado, esperaAleatoria() * 1000);
	}, esperaAleatoria() * 1000);
}

const pedidos = ["Paella", "Pizza margarita", "Tortilla española", "Gazpacho"];

console.log("\n--- Procesando pedidos ---");
for (const plato of pedidos) {
	procesarPedido(
		plato,
		() => console.log(`  ✅ Confirmado: ${plato}`),
		() => console.log(`  🍳 Listo:    ${plato}`),
		() => console.log(`  🚚 Entregado:${plato}`),
	);
}
