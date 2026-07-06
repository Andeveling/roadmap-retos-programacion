// ============================================================
// #14 FECHAS
// ============================================================

const ahora = new Date();
const nacimiento = new Date("1995-04-12T08:30:00");

// Edad en años enteros (con corrección de decimales por año bisiesto)
const añosTranscurridos = Math.floor(
	(ahora.getTime() - nacimiento.getTime()) / (365.25 * 24 * 60 * 60 * 1000),
);

console.log("Fecha actual:    ", ahora.toISOString());
console.log("Fecha nacimiento:", nacimiento.toISOString());
console.log("Años transcurridos:", añosTranscurridos);
console.log();

// ============================================================
// EXTRA · 10 formatos distintos del cumpleaños
// ============================================================
const meses = [
	"enero",
	"febrero",
	"marzo",
	"abril",
	"mayo",
	"junio",
	"julio",
	"agosto",
	"septiembre",
	"octubre",
	"noviembre",
	"diciembre",
];
const dias = [
	"domingo",
	"lunes",
	"martes",
	"miércoles",
	"jueves",
	"viernes",
	"sábado",
];
const inicioAño = new Date(nacimiento.getFullYear(), 0, 0);
const diaDelAño = Math.floor((+nacimiento - +inicioAño) / 86_400_000);
const pad = (n: number) => String(n).padStart(2, "0");

console.log("10 formatos del cumpleaños:");
console.log(
	` 1. Día/mes/año:        ${pad(nacimiento.getDate())}/${pad(nacimiento.getMonth() + 1)}/${nacimiento.getFullYear()}`,
);
console.log(
	` 2. Hora:min:seg:       ${pad(nacimiento.getHours())}:${pad(nacimiento.getMinutes())}:${pad(nacimiento.getSeconds())}`,
);
console.log(` 3. Día del año:        ${diaDelAño}`);
console.log(` 4. Día de la semana:   ${dias[nacimiento.getDay()]}`);
console.log(` 5. Nombre del mes:     ${meses[nacimiento.getMonth()]}`);
console.log(` 6. ISO 8601:           ${nacimiento.toISOString()}`);
console.log(` 7. UTC string:         ${nacimiento.toUTCString()}`);
console.log(
	` 8. Locale es-ES:       ${new Intl.DateTimeFormat("es-ES", { dateStyle: "full" }).format(nacimiento)}`,
);
console.log(
	` 9. Unix timestamp:     ${Math.floor(nacimiento.getTime() / 1000)}`,
);
console.log(`10. JSON:               ${nacimiento.toJSON()}`);
