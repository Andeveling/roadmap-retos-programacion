// ============================================================
// #13 PRUEBAS UNITARIAS  (Node's built-in test runner, sin deps)
// Ejecutar: node --import tsx --test Andeveling.ts
// ============================================================
import { test } from "node:test";
import assert from "node:assert/strict";

// ---------- 1. Sum + test ----------
function sum(a: number, b: number): number {
	if (typeof a !== "number" || typeof b !== "number") {
		throw new TypeError("sum() solo acepta números");
	}
	return a + b;
}

test("sum devuelve el resultado correcto", () => {
	assert.equal(sum(2, 3), 5);
	assert.equal(sum(-1, 1), 0);
	assert.equal(sum(0, 0), 0);
	assert.equal(sum(1.5, 2.5), 4);
});

test("sum lanza TypeError con argumentos no numéricos", () => {
	assert.throws(() => sum("1" as unknown as number, 2), TypeError);
	assert.throws(() => sum(1, null as unknown as number), TypeError);
});

// ============================================================
// EXTRA · Diccionario + tests de presencia y tipos
// ============================================================
type Profile = {
	name: string;
	age: number;
	birth_date: string;
	programming_languages: string[];
};

const profile: Profile = {
	name: "Andeveling",
	age: 30,
	birth_date: "1995-04-12",
	programming_languages: ["TypeScript", "Python", "Rust"],
};

test("el diccionario contiene todos los campos esperados", () => {
	for (const key of ["name", "age", "birth_date", "programming_languages"]) {
		assert.ok(key in profile, `Falta el campo "${key}"`);
	}
});

test("los valores tienen el tipo correcto", () => {
	assert.equal(typeof profile.name, "string");
	assert.equal(typeof profile.age, "number");
	assert.equal(typeof profile.birth_date, "string");
	assert.ok(Array.isArray(profile.programming_languages));
	assert.ok(
		profile.programming_languages.every((l) => typeof l === "string"),
		"Todos los lenguajes deben ser string",
	);
});
