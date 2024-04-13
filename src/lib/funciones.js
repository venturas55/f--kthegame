// Definir los conjuntos de valores para cada atributo
const helpers = {};

//FUNCION PARA BARAJAR UN ARRAY
helpers.shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

// Función para generar permutaciones únicas sin repetición
helpers.generateUniquePermutations = (arrays) => {
    let items = [];
    for (var i = 0; i < arrays[0].length; i++) {
        for (var j = 0; j < arrays[1].length; j++) {
            for (var k = 0; k < arrays[2].length; k++) {
                if (arrays[0][i] != arrays[1][j] && arrays[1][j] != arrays[2][k] && arrays[2][k] != arrays[0][i]) {
                    //console.log(arrays[0][i], arrays[1][j], arrays[2][k]);
                    items.push({ bg_color: arrays[0][i], color: arrays[1][j], text: arrays[2][k] });
                }
            }
        }
    }
    return items;
}

helpers.nextCard = (cartas) => {
    if (cartas.length > 0) {
        var currentIndex = Math.floor(Math.random() * cartas.length);
        let currentCard = cartas.splice(currentIndex, 1);
        //console.log(currentCard);
        return (currentCard);
    } else {
        document.getElementById('current-card').textContent = "SO...";
        alert("Se acabo la baraja");
    }
}

helpers.cartasShown = [];


//helpers.cartas=cartas;
export default helpers;