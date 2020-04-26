var socket = io();

// Escuchar
socket.on('connect', function() {
    console.log('Conectado al server!');
});

socket.on('disconnect', function() {
    console.log('Perdimos conexión con el servidor');
});

socket.on('enviarMensajeCliente', (mensaje) => {
    console.log('Servidor:', mensaje);
});

// Enviar informacion
socket.emit('enviarMensaje', {
    usuario: 'Nahuel',
    mensaje: 'Hola mundo!'
}, function(resp) {

    console.log('Resultado:', resp);

});