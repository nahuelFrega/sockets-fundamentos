const fs = require('fs');

class Ticket {

    constructor(numero, escritorio) {

        this.numero = numero;
        this.escritorio = escritorio;

    }

}

class TicketControl {

    constructor() {

        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimos4 = [];

        let data = require('../data/data.json');

        if (data.hoy === this.hoy) {

            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimos4 = data.ultimos4;

        } else {

            this.reiniciarConteo();

        }

    }

    siguiente() {

        this.ultimo += 1;
        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);
        this.grabarArchivo();

        return this.ultimo;

    }

    reiniciarConteo() {

        this.ultimo = 0;
        this.tickets = [];
        this.ultimos4 = [];
        this.grabarArchivo();
        console.log('Se reinicio el sistema');

    }

    grabarArchivo() {

        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        };

        let jsonDataString = JSON.stringify(jsonData);

        fs.writeFileSync('./server/data/data.json', jsonDataString);

    }

    obtenerUltimo() {

        return this.ultimo;

    }

    obtenerUltimos4() {

        return this.ultimos4;

    }

    atenderTicket(escritorio) {

        if (this.tickets.length === 0) {
            return 'No hay ticket pendientes';
        }

        let numeroTicket = this.tickets[0].numero; // Obtiene el primer ticket pendiente, para asignar
        this.tickets.shift(); // Borra el primer ticket -> es el mismo que se acaba de obtener para asginar

        let atenderTicket = new Ticket(numeroTicket, escritorio);

        this.ultimos4.unshift(atenderTicket); // Acumula los ultimos 4 tickets

        if (this.ultimos4.length > 4) {
            this.ultimos4.splice(-1, 1); // Cuando supere los 4 elimina al primero
        }

        this.grabarArchivo(); // Guarda todas las transacciones realizadas

        return atenderTicket; // Retorna el ticket

    }

}


module.exports = {
    TicketControl
}