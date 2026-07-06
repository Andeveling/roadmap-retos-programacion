/*
 * EJERCICIO:
 * Explora el concepto de clase y crea un ejemplo que implemente un inicializador,
 * atributos y una función que los imprima (teniendo en cuenta las posibilidades
 * de tu lenguaje).
 * Una vez implementada, créala, establece sus parámetros, modifícalos e imprímelos
 * utilizando su función.
 *
 * DIFICULTAD EXTRA (opcional):
 * Implementa dos clases que representen las estructuras de Pila y Cola (estudiadas
 * en el ejercicio número 7 de la ruta de estudio)
 * - Deben poder inicializarse y disponer de operaciones para añadir, eliminar,
 *   retornar el número de elementos e imprimir todo su contenido.
 *
 */

 class Person {
     private _name: string;
     private _age: number;

     constructor(name: string, age: number) {
         this._name = name;
         this._age = age;
     }

     get name(): string {
         return this._name;
     }

     set name(name: string) {
         this._name = name;
     }

     get age(): number {
         return this._age;
     }

     set age(age: number) {
         this._age = age;
     }

     toString(): string {
         return `${this._name}, ${this._age} años`;
     }
 }

 const person = new Person("Andres", 37);
 console.log(person);          // Usa toString() → "Andres, 37 años"
 console.log(person.name);     // "Andres" (getter)
 person.name = "Fabian";       // setter
 console.log(person.name);     // "Fabian"
 console.log(person.toString())



 class Stack<T> {
	private items: T[] = [];
	push(item: T) {
		this.items.push(item);
	}
	pop(): T | undefined {
		return this.items.pop();
    }
    size(): number {
        return this.items.length;
    }
    list(): T[] {
        return this.items;
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
    size(): number {
        return this.items.length;
    }
    list(): T[] {
        return this.items;
    }
 }


 const stack = new Stack<number>();
 stack.push(1);
 stack.push(2);
 stack.push(3);
 console.log(stack.list()); // [1, 2, 3]
 console.log(stack.size()); // 3

 const queue = new Queue<number>();
 queue.enqueue(1);
 queue.enqueue(2);
 queue.enqueue(3);
 console.log(queue.list()); // [1, 2, 3]
 console.log(queue.size()); // 3
