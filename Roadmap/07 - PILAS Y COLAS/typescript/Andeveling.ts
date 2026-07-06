/*
 * EJERCICIO:
 * Implementa los mecanismos de introducción y recuperación de elementos propios de las
 * pilas (stacks - LIFO) y las colas (queue - FIFO) utilizando una estructura de array
 * o lista (dependiendo de las posibilidades de tu lenguaje).
 *
 * DIFICULTAD EXTRA (opcional):
 * - Utilizando la implementación de pila y cadenas de texto, simula el mecanismo adelante/atrás
 *   de un navegador web. Crea un programa en el que puedas navegar a una página o indicarle
 *   que te quieres desplazar adelante o atrás, mostrando en cada caso el nombre de la web.
 *   Las palabras "adelante", "atrás" desencadenan esta acción, el resto se interpreta como
 *   el nombre de una nueva web.
 * - Utilizando la implementación de cola y cadenas de texto, simula el mecanismo de una
 *   impresora compartida que recibe documentos y los imprime cuando así se le indica.
 *   La palabra "imprimir" imprime un elemento de la cola, el resto de palabras se
 *   interpretan como nombres de documentos.
 */

class Stack<T> {
	private items: T[] = [];
	push(item: T) {
		this.items.push(item);
	}
	pop(): T | undefined {
		return this.items.pop();
	}
}

class Queue<T> {
	private items: T[] = [];
	enqueue(item: T) {
		this.items.push(item);
	}
	dequeue(): T | undefined {
		return this.items.shift();
	}
}

// --- Demo LIFO / FIFO ---
const stack = new Stack<number>();
[1, 2, 3].forEach((n) => stack.push(n));
console.log("Stack pop:", stack.pop(), stack.pop(), stack.pop()); // 3 2 1

const queue = new Queue<number>();
[1, 2, 3].forEach((n) => queue.enqueue(n));
console.log(
	"Queue dequeue:",
	queue.dequeue(),
	queue.dequeue(),
	queue.dequeue(),
); // 1 2 3

// --- Extra: navegador ---
class Browser {
	private past = new Stack<string>();
	private future = new Stack<string>();
	private current: string | null = null;

	visit(page: string) {
		if (this.current) this.past.push(this.current);
		this.current = page;
		this.future = new Stack<string>(); // nueva navegación invalida "adelante"
		console.log(`Página actual: ${this.current}`);
	}

	goBack() {
		const prev = this.past.pop();
		if (!prev || !this.current) return console.log("No hay páginas atrás");
		this.future.push(this.current);
		this.current = prev;
		console.log(`Página actual: ${this.current}`);
	}

	goForward() {
		const next = this.future.pop();
		if (!next || !this.current) return console.log("No hay páginas adelante");
		this.past.push(this.current);
		this.current = next;
		console.log(`Página actual: ${this.current}`);
	}
}

const browser = new Browser();
[
	"google.com",
	"github.com",
	"stackoverflow.com",
	"atrás",
	"atrás",
	"adelante",
	"youtube.com",
	"atrás",
	"adelante",
].forEach((action) =>
	action === "atrás"
		? browser.goBack()
		: action === "adelante"
			? browser.goForward()
			: browser.visit(action),
);

// --- Extra: impresora ---
class Printer {
	private q = new Queue<string>();
	add(doc: string) {
		this.q.enqueue(doc);
	}
	print() {
		const doc = this.q.dequeue();
		console.log(doc ? `Imprimiendo: ${doc}` : "Cola vacía");
	}
}

const printer = new Printer();
[
	"doc1.pdf",
	"doc2.pdf",
	"imprimir",
	"doc3.docx",
	"imprimir",
	"imprimir",
	"imprimir",
].forEach((action) =>
	action === "imprimir" ? printer.print() : printer.add(action),
);
