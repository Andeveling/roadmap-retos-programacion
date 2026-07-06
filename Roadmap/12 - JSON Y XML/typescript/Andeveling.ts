// ============================================================
// #12 JSON Y XML
// ============================================================
import * as fs from "node:fs";

const BASE = "Andeveling";

type Persona = {
	nombre: string;
	edad: number;
	fechaNacimiento: string;
	lenguajes: string[];
};

const data: Persona = {
	nombre: "Andeveling",
	edad: 30,
	fechaNacimiento: "1995-04-12",
	lenguajes: ["TypeScript", "Python", "Rust", "Go"],
};

// ---------- JSON ----------
const jsonFile = `${BASE}.json`;
fs.writeFileSync(jsonFile, JSON.stringify(data, null, 2));
console.log(`--- ${jsonFile} ---`);
console.log(fs.readFileSync(jsonFile, "utf8"));
fs.unlinkSync(jsonFile);

// ---------- XML (construido a mano, estructura pequeña) ----------
const escape = (s: string) =>
	s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const xmlFile = `${BASE}.xml`;
const xml = [
	`<?xml version="1.0" encoding="UTF-8"?>`,
	`<persona>`,
	`  <nombre>${escape(data.nombre)}</nombre>`,
	`  <edad>${data.edad}</edad>`,
	`  <fechaNacimiento>${data.fechaNacimiento}</fechaNacimiento>`,
	`  <lenguajes>`,
	...data.lenguajes.map((l) => `    <lenguaje>${escape(l)}</lenguaje>`),
	`  </lenguajes>`,
	`</persona>`,
].join("\n");

fs.writeFileSync(xmlFile, xml);
console.log(`\n--- ${xmlFile} ---`);
console.log(fs.readFileSync(xmlFile, "utf8"));
fs.unlinkSync(xmlFile);

// ============================================================
// EXTRA · Clase que lee y transforma ambos formatos
// ============================================================
class PersonaFromFile {
	static fromJSON(path: string): Persona {
		try {
			return JSON.parse(fs.readFileSync(path, "utf8")) as Persona;
		} catch (e) {
			throw new Error(`JSON inválido en ${path}: ${(e as Error).message}`);
		}
	}

	static fromXML(path: string): Persona {
		const xml = fs.readFileSync(path, "utf8");
		const tag = (re: RegExp) => xml.match(re)?.[1] ?? "";
		const lenguajes = [...xml.matchAll(/<lenguaje>([^<]*)<\/lenguaje>/g)].map(
			(m) => m[1],
		);
		return {
			nombre: tag(/<nombre>([^<]*)<\/nombre>/),
			edad: Number(tag(/<edad>([^<]*)<\/edad>/)),
			fechaNacimiento: tag(/<fechaNacimiento>([^<]*)<\/fechaNacimiento>/),
			lenguajes,
		};
	}
}

fs.writeFileSync(jsonFile, JSON.stringify(data));
fs.writeFileSync(xmlFile, xml);

const desdeJSON = PersonaFromFile.fromJSON(jsonFile);
const desdeXML = PersonaFromFile.fromXML(xmlFile);

console.log("\nDesde JSON:", desdeJSON);
console.log("Desde XML: ", desdeXML);

fs.unlinkSync(jsonFile);
fs.unlinkSync(xmlFile);
