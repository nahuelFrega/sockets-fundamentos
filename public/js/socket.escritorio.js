// Comando para establecer la conexión
let socket = io();

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

//
let searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

let escritorio = searchParams.get('escritorio');

$('h1').text('Escritorio ' + escritorio);

$('button').on('click', function() {

    socket.emit('atenderTicket', { escritorio }, function(resp) {

        if (resp === 'No hay ticket pendientes') {
            alert(resp);
            return;
        }

        $('small').text(resp.numero);

    });

});