// ============================================================
// #23 SINGLETON
// ============================================================

// ---------- 1. Singleton genérico ----------
class Singleton<T> {
	private static instances = new Map<string, Singleton<unknown>>();

	private constructor(private data: T) {}

	static getInstance<T>(key: string, factory: () => T): Singleton<T> {
		if (!Singleton.instances.has(key)) {
			Singleton.instances.set(key, new Singleton<T>(factory()));
		}
		return Singleton.instances.get(key) as Singleton<T>;
	}

	get value(): T {
		return this.data;
	}
	set value(v: T) {
		this.data = v;
	}
}

const cfg1 = Singleton.getInstance("config", () => ({ tema: "oscuro" }));
const cfg2 = Singleton.getInstance("config", () => ({ tema: "claro" }));
console.log("¿Misma instancia?", cfg1 === cfg2, "→ tema:", cfg1.value.tema);

// ============================================================
// EXTRA · Sesión de usuario (singleton con estado mutable)
// ============================================================
type Usuario = { id: number; username: string; nombre: string; email: string };

class Sesion {
	private static _instance: Sesion | null = null;
	private usuario: Usuario | null = null;

	private constructor() {}

	static get instance(): Sesion {
		if (!Sesion._instance) Sesion._instance = new Sesion();
		return Sesion._instance;
	}

	setUsuario(u: Usuario): void {
		this.usuario = u;
	}
	getUsuario(): Usuario | null {
		return this.usuario;
	}
	cerrar(): void {
		this.usuario = null;
	}
}

console.log("\n--- Sesión de usuario ---");
const s1 = Sesion.instance;
const s2 = Sesion.instance;
console.log("¿Misma instancia?", s1 === s2);

s1.setUsuario({
	id: 1,
	username: "andev",
	nombre: "Andeveling",
	email: "andev@example.com",
});
console.log("Sesión actual:", Sesion.instance.getUsuario());

Sesion.instance.cerrar();
console.log("Tras cerrar:", Sesion.instance.getUsuario());
