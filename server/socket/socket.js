const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');


const ticketControl = new TicketControl();


// Como saber cuando un usuario se conecta con el servidor
io.on('connection', (client) => {

    console.log('Usuario conectado!');

    // Genera un nuevo ticket
    client.on('siguienteTicket', (data, callback) => {

        let siguiente = ticketControl.siguiente();

        callback(siguiente);

    });

    // Aviso de desconexión
    client.on('disconnect', () => {
        console.log('Usuario desconectado');
    });

    // Envia el ultimo ticket
    client.emit('estadoActual', {
        actual: ticketControl.obtenerUltimo(),
        ultimos4: ticketControl.obtenerUltimos4()
    });

    //
    client.on('atenderTicket', (data, callback) => {

        if (!data.escritorio) {

            return callback({
                err: true,
                mensaje: 'El escritorio es necesario'
            });

        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio);

        callback(atenderTicket);

    });


});