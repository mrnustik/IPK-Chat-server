net = require('net');

var clients = [];

server = net.createServer(function (client) {

    clients.push(client);

    client.on('data', function (data) {
        sendToAll(data.toString(), client);
    });

    client.on('end', function () {
        clients.splice(clients.indexOf(client), 1);
    });

    function sendToAll(message, sender)
    {
        clients.forEach(function (client) {
            // Don't want to send it to sender
            if (client === sender) return;
            client.write(message);
        });
        // Log it to the server output too
        process.stdout.write("["+sender.remoteAddress+"]: " + message)
    }
});

process.on('uncaughtException', function (err) {
  console.error(err.stack);
  console.log("Node NOT Exiting...");
});


server.listen(21011);
