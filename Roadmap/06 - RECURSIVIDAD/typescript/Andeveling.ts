/*
 * EJERCICIO:
 * Entiende el concepto de recursividad creando una función recursiva que imprima
 * números del 100 al 0.
 *
 * DIFICULTAD EXTRA (opcional):
 * Utiliza el concepto de recursividad para:
 * - Calcular el factorial de un número concreto (la función recibe ese número).
 * - Calcular el valor de un elemento concreto (según su posición) en la
 *   sucesión de Fibonacci (la función recibe la posición).
 */

const countDown = (n: number): void => {
	if (n >= 0) {
		console.log(n);
		countDown(n - 1);
	}
};

const factorial = (n: number): number => (n <= 1 ? 1 : n * factorial(n - 1));

// ponytail: naive recursion, O(2^n); add memoization if n > ~35.
const fibonacci = (n: number): number =>
	n <= 1 ? n : fibonacci(n - 1) + fibonacci(n - 2);

countDown(100);
console.log(`Factorial de 5 = ${factorial(5)}`); // 120
console.log(`Fibonacci(10) = ${fibonacci(10)}`); // 55
