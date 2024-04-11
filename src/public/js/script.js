
// Definir los conjuntos de valores para cada atributo
const bgColors = ["azul", "rojo", "naranja", "verde", "amarillo", "violeta"];
const textColors = ["azul", "rojo", "naranja", "verde", "amarillo", "negro"];
const texts = ["azul", "rojo", "naranja", "verde", "amarillo", "negro", "violeta", "puta", "mierda", "polla", "coño", "cabron", "joder"];

// Función para generar permutaciones únicas sin repetición
function generateUniquePermutations(arrays) {
    console.log(arrays[0][1]);
    let items=[];
    for (var i = 0; i < arrays[0].length; i++) {
        for (var j = 0; j < arrays[1].length; j++) {
            for (var k = 0; k < arrays[2].length; k++) {
                if(arrays[0][i]!=arrays[1][j] && arrays[1][j]!=arrays[2][k] && arrays[2][k]!=arrays[0][i]) {
                    //console.log(arrays[0][i], arrays[1][j], arrays[2][k]);
                    items.push({bg_color:arrays[0][i],color:arrays[1][j],text:arrays[2][k]});
                }
            }
        }
    }
    return items;
}

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

function printCard(carta) {
    document.getElementById("texto").classList.remove("txtazul", "txtrojo", "txtnaranja", "txtamarillo", "txtverde", "txtnegro");
    document.getElementById("tarjeta").classList.remove("bgazul", "bgrojo", "bgnaranja", "bgamarillo", "bgverde", "bgvioleta");

    document.getElementById("texto").innerHTML = carta.text;
    document.getElementById("texto").classList.add("txt" + carta.color);
    document.getElementById("tarjeta").classList.add("bg" + carta.bg_color);
}

// Generar todas las permutaciones únicas de cartas
const cartas = generateUniquePermutations([bgColors, textColors, texts]);

var shownCards = [];


