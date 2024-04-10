// Definir los conjuntos de valores para cada atributo
const bgColors = ["azul", "rojo", "naranja", "verde", "amarillo", "violeta"];
const textColors = ["azul", "rojo", "naranja", "verde", "amarillo", "negro"];
const texts = ["azul", "rojo", "naranja", "verde", "amarillo", "negro","puta","violeta", "mierda", "polla", "coño", "cabron", "joder"];

// Arreglo para almacenar las cartas
let cartas = [];

// Generar todas las combinaciones posibles de atributos
for (const bgColor of bgColors) {
    for (const textColor of textColors) {
        for (const text of texts) {
            // Crear un objeto que representa una carta
            const carta = {
                bg_color: bgColor,
                color: textColor,
                text: text
            };
            // Agregar la carta al arreglo de cartas
            cartas.push(carta);
        }
    }
}

// Convertir el arreglo de cartas a formato JSON
const cartasJSON = JSON.stringify({ cartas: cartas }, null, 2);

// Imprimir el JSON resultante
console.log(cartasJSON);