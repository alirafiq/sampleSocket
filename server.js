var net = require('net');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/eobd');
var logs = mongoose.model('log', { logs: String ,dated:Number});

var PORT =   2419;


net.createServer(function(sock) {
    
    // We have a connection - a socket object is assigned to the connection automatically
    console.log('CONNECTED: ' + sock.remoteAddress +':'+ sock.remotePort);
    
    // Add a 'data' event handler to this instance of socket
    sock.on('data', function(data) {
        
        console.log('DATA ' + sock.remoteAddress + ': ' + data);
        // Write the data back to the socket, the client will receive it as data from the server
        sock.write('You said "' + data + '"');
        var log = new logs({ log: data,dated : new Date().getTime() });
log.save(function (err) {
   });
        
    });
    
    // Add a 'close' event handler to this instance of socket
    sock.on('close', function(data) {
        console.log('CLOSED: ' + sock.remoteAddress +' '+ sock.remotePort);
    });
    
}).listen(PORT);

console.log('Server listening on ' + HOST +':'+ PORT);