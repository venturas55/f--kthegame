const socket = io();

socket.on('nextCardSentFromServer', (res)=>{
    console.log('Card received',res);
    printCard(res);

});

function printCard(carta) {
    console.log("voy");

    document.getElementById("texto").classList.remove("txtazul", "txtrojo", "txtnaranja", "txtamarillo", "txtverde", "txtnegro");
    document.getElementById("tarjeta").classList.remove("bgazul", "bgrojo", "bgnaranja", "bgamarillo", "bgverde", "bgvioleta");

    document.getElementById("texto").innerHTML = carta.text;
    document.getElementById("texto").classList.add("txt" + carta.color);
    document.getElementById("tarjeta").classList.add("bg" + carta.bg_color);
}

// Generar todas las permutaciones únicas de cartas
function nextCard() {
    console.log("Next card");
    socket.emit('nextCard');
}
function playerReady(){
    document.getElementById('btnReady').disabled = true;
    socket.emit('playerReady');
    console.log("Player ready");

}