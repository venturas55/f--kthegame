
// Definir los conjuntos de valores para cada atributo
const bgColors = ["azul", "rojo", "naranja", "verde", "amarillo", "violeta"];
const textColors = ["azul", "rojo", "naranja", "verde", "amarillo", "negro"];
const texts = ["azul", "rojo", "naranja", "verde", "amarillo", "negro", "violeta","puta", "mierda", "polla", "coño", "cabron", "joder"];

// Función para generar permutaciones únicas sin repetición
function generateUniquePermutations(arrays) {
    const result = [];

    function permute(index, current) {
        if (index === arrays.length) {
            result.push(current.slice()); // Guardar copia de la permutación actual
            return;
        }

        const used = new Set(); // Conjunto para rastrear los valores usados en este nivel
        for (const value of arrays[index]) {
            if (!used.has(value)) {
                current.push(value); // Agregar el valor actual a la permutación
                used.add(value);
                permute(index + 1, current); // Recursión para el siguiente nivel
                current.pop(); // Retroceder para probar otras combinaciones
            }
        }
    }

    permute(0, []); // Llamar a la función de permute inicialmente con index 0 y una permutación vacía
    return result;
}

// Generar todas las permutaciones únicas de cartas
const permutations = generateUniquePermutations([bgColors, textColors, texts]);

// Convertir las permutaciones en objetos de cartas
var cartas = permutations.map(([bg_color, color, text]) => ({ bg_color, color, text }));
var shownCards=[];
// Convertir el arreglo de cartas a formato JSON
//const cartasJSON = JSON.stringify({ cartas: cartas }, null, 2);

function nextCard() {
    //console.log(words.length);
    if (cartas.length > 0) {
        currentIndex = Math.floor(Math.random() * cartas.length);
        currentCard = cartas[currentIndex];
        let carta = cartas.splice(currentIndex, 1);
        shownCards.push(currentCard);
        console.log(currentCard);
        printCard(currentCard);
    } else {
        document.getElementById('current-card').textContent = "SO...";
        alert("Se acabo la baraja");
    }

}

// Imprimir el JSON resultante
console.log(cartas);

function printCard(carta){
    document.getElementById("texto").classList.remove("txtazul","txtrojo","txtnaranja","txtamarillo","txtverde","txtnegro");
    document.getElementById("tarjeta").classList.remove("bgazul","bgrojo","bgnaranja","bgamarillo","bgverde","bgvioleta");

    document.getElementById("texto").innerHTML = carta.text;
    document.getElementById("texto").classList.add("txt"+carta.color);
    document.getElementById("tarjeta").classList.add("bg"+carta.bg_color);  
}

