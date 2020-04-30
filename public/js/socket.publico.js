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

let lblTicket1 = $('#lblTicket1');
let lblTicket2 = $('#lblTicket2');
let lblTicket3 = $('#lblTicket3');
let lblTicket4 = $('#lblTicket4');

let lblEscritorio1 = $('#lblEscritorio1');
let lblEscritorio2 = $('#lblEscritorio2');
let lblEscritorio3 = $('#lblEscritorio3');
let lblEscritorio4 = $('#lblEscritorio4');

let lblTickets = [lblTicket1, lblTicket2, lblTicket3, lblTicket4];
let lblEscritorios = [lblEscritorio1, lblEscritorio2, lblEscritorio3, lblEscritorio4];


socket.on('estadoActual', function(data) {

    console.log(data.ultimos4);

    actualizaHTML(data.ultimos4);

});

function actualizaHTML(ultimos4) {

    console.log('largo: ' + ultimos4.length);

    for (var i = 0; i < ultimos4.length; i++) {

        lblTickets[i].text('Ticket ' + ultimos4[i].numero);
        lblEscritorios[i].text('Escritorio ' + ultimos4[i].escritorio);

    }

};