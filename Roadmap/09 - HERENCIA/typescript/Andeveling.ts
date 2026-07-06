/*
 * EJERCICIO:
 * Explora el concepto de herencia según tu lenguaje. Crea un ejemplo que
 * implemente una superclase Animal y un par de subclases Perro y Gato,
 * junto con una función que sirva para imprimir el sonido que emite cada Animal.
 *
 * DIFICULTAD EXTRA (opcional):
 * Implementa la jerarquía de una empresa de desarrollo formada por Empleados que
 * pueden ser Gerentes, Gerentes de Proyectos o Programadores.
 * Cada empleado tiene un identificador y un nombre.
 * Dependiendo de su labor, tienen propiedades y funciones exclusivas de su
 * actividad, y almacenan los empleados a su cargo.
 */

class Animal {
    sonido: string;

    constructor(sonido: string) {
        this.sonido = sonido;
    }

    emitir(): void {
        console.log(this.sonido);
    }
}

class Perro extends Animal {
    constructor() {
        super("Guau");
    }
}

class Gato extends Animal {
    constructor() {
        super("Miau");
    }
}

const perro = new Perro();
const gato = new Gato();

perro.emitir(); // Guau
gato.emitir(); // Miau
