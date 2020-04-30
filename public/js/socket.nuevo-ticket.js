// Comando para establecer la conexión
var socket = io();

let label = $('#lblNuevoTicket');

// =======================
// Mensajes de conexión y desconexión
// =======================
socket.on('connect', function() {
    console.log('Conectado al servidor');
});

socket.on('disconnect', function() {
    console.log('Servidor desconectado');
});


// =======================
// Acciones generales
// =======================

// Muestra el estado actual al iniciar la aplicación
socket.on('estadoActual', function(data) {
    label.text(`Siguiente ticket: ${ data.actual }`);
});

// Siguiente ticket
$('button').on('click', function() {

    socket.emit('siguienteTicket', null, function(siguienteTicket) {

        label.text(`Siguiente ticket: ${ siguienteTicket }`);

    });

});