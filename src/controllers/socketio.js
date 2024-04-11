import SocketIO from "socket.io";

export const socketIO = () => {

    const io = socketIO();
    io.on('connection', client => { console.log('connection') });
    io.listen(3000);

};
