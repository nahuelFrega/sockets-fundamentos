const { io } = require('../server');

// Como saber cuando un usuario se conecta con el servidor
io.on('connection', (client) => {

    console.log('Usuario conectado!');

    client.on('disconnect', () => {

        console.log('Usuario desconectado');

    });

    // Escuchar el cliente
    client.on('enviarMensaje', (data, callback) => {

        console.log('Cliente:', data);

        // Hace broadcast de los mensajes que envia un cliente
        client.broadcast.emit('enviarMensajeCliente', data);

        /*if (mensaje.usuario) {

            callback({
                resp: 'Operación satisfactoria'
            });

        } else {

            callback({
                resp: 'Error en la operación'
            });

        }*/

    });

    // Enviar mensaje al cliente
    client.emit('enviarMensajeCliente', {
        usuario: 'Admin',
        mensaje: 'Bienvenido a FocusChat'
    });

});