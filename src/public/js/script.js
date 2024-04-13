const socket = io();
var cartas = [];
var carta;
var turnoActivo = false;
socket.on('nextCardSentFromServer', (res) => {
    console.log('Card received', res);
    printCard(res);

});

socket.on('ServerSendCards', (res) => {
    console.log('Cards received', res);
    cartas = res;
    monton.style.display = "block";
});

socket.on('cardPlayer', (res) => {

});

socket.on('suTurno', () => {
    console.log("Es tu turno");
    turnoActivo = true;

});

function printCard(carta) {
    var texto = document.getElementById("texto");
    var tarjeta = document.getElementById("tarjeta");
    tarjeta.style.display = "block";

    texto.classList.remove("txtazul", "txtrojo", "txtnaranja", "txtamarillo", "txtverde", "txtnegro");
    tarjeta.classList.remove("bgazul", "bgrojo", "bgnaranja", "bgamarillo", "bgverde", "bgvioleta");

    texto.innerHTML = carta.text;
    texto.classList.add("txt" + carta.color);
    tarjeta.classList.add("bg" + carta.bg_color);
}

function playCard() {
    console.log(cartas);
    if (turnoActivo) {
        if (cartas.length > 0) {
            carta = cartas.pop();
            console.log(carta);
            printCard(carta);
            socket.emit('playerPlayCard', carta);
            turnoActivo = false;
        } else {
            monton.style.display = "none";
            console.log("Has ganado!");
            alert("Has ganado!");
        }
    }else{
        console.log("No es tu turno!");
    }
}


function createGame() {
    socket.emit("CreateGame");
    document.getElementById("btnCreateGame").style.display = "none";
    document.getElementById("btnJoinGame").style.display = "none";
    document.getElementById("btnStartGame").style.display = "block";
    playerReady();
}

function joinGame() {
    socket.emit("joinGame");
}
function startGame() {
    socket.emit("startGame");
}
// Generar todas las permutaciones únicas de cartas
function nextCard() {
    console.log("Next card");
    socket.emit('nextCard');
}
function playerReady() {
    document.getElementById('btnReady').disabled = true;
    socket.emit('playerReady');
    console.log("Player ready");

}

function launchError(){
    
}

var monton = document.getElementById("monton");
var tarjeta = document.getElementById("tarjeta");
var btnStartGame = document.getElementById("btnStartGame");
monton.style.display = "none";
tarjeta.style.display = "none";
btnStartGame.style.display = "none";