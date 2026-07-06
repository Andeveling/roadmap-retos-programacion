// ============================================================
// #19 ENUMERACIONES
// ============================================================

enum Dia {
	Lunes = 1,
	Martes,
	Miercoles,
	Jueves,
	Viernes,
	Sabado,
	Domingo,
}

const nombreDia = (n: number): string => Dia[n] ?? "Día inválido";
for (let i = 1; i <= 7; i++) console.log(`${i} → ${nombreDia(i)}`);

// ============================================================
// EXTRA · Sistema de gestión de pedidos
// ============================================================
enum EstadoPedido {
	PENDIENTE,
	ENVIADO,
	ENTREGADO,
	CANCELADO,
}

class Pedido {
	constructor(
		public id: number,
		public estado: EstadoPedido = EstadoPedido.PENDIENTE,
	) {}

	enviar(): void {
		if (this.estado === EstadoPedido.ENTREGADO)
			throw new Error(`Pedido #${this.id}: ya entregado`);
		if (this.estado === EstadoPedido.CANCELADO)
			throw new Error(`Pedido #${this.id}: cancelado, no se puede enviar`);
		this.estado = EstadoPedido.ENVIADO;
	}

	entregar(): void {
		if (this.estado !== EstadoPedido.ENVIADO)
			throw new Error(`Pedido #${this.id}: solo se entrega tras enviar`);
		this.estado = EstadoPedido.ENTREGADO;
	}

	cancelar(): void {
		if (this.estado === EstadoPedido.ENTREGADO)
			throw new Error(`Pedido #${this.id}: ya entregado, no se cancela`);
		this.estado = EstadoPedido.CANCELADO;
	}

	descripcion(): string {
		const nombre = EstadoPedido[this.estado];
		return `Pedido #${this.id}: estado = ${nombre}`;
	}
}

console.log("\n--- Flujo de pedidos ---");
const p1 = new Pedido(1);
p1.enviar();
console.log(p1.descripcion());
p1.entregar();
console.log(p1.descripcion());

const p2 = new Pedido(2);
try {
	p2.entregar();
} catch (e) {
	console.log(`✔ Bloqueado: ${(e as Error).message}`);
}
p2.enviar();
p2.cancelar();
console.log(p2.descripcion());
