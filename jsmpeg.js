//jsmpeg settings...
var STREAM_SECRET = '1234';
var STREAM_PORT = 8080;

var clientSocket = [];
var clientChannel = [];

var jsmpeg = function(io){

    console.log('Listening for incomming MPEG-TS Stream on http://127.0.0.1:'+STREAM_PORT+ '/' + STREAM_SECRET);

    var server = require('http').createServer( function(request, response) {
        var params = request.url.substr(1).split('/');
        if (params[0] !== STREAM_SECRET) {
            console.log(
                'Failed Stream Connection: '+ request.socket.remoteAddress + ':' +
                request.socket.remotePort + ' - wrong secret.'
            );
            response.end();
            return;
        }
        var channel = parseInt(params[1]);
        if(isNaN(channel))
        {
            console.log('Please specify a channel');
            response.end();
            return;
        }

        response.connection.setTimeout(0);
        console.log(
            'Stream Connected: ' +
            request.socket.remoteAddress + ':' +
            request.socket.remotePort);
        console.log('channel = '+ channel);

        //New data pack received from ffmpeg
        request.on('data', function(data){
            if(clientSocket.length>0)
            {
                clientChannel.forEach(function(value, index){
                    if(value==channel)
                    {
                        clientSocket[index].emit('VideoData', data);
                    }
                });
            }
        });
        request.on('end',function(){
            console.log(
                'Stream Closed' +
                request.socket.remoteAddress + ':' +
                request.socket.remotePort);
        });


    }).listen(STREAM_PORT);


    io.sockets.on('connection', function (socket) {
        var channel = -1;
        socket.on('disconnect', function(){
            var index = clientSocket.indexOf(socket);
            if(index != -1)
            {
                clientSocket.splice(index, 1);
                clientChannel.splice(index, 1);
                console.log('Client Disconnected! ID=' + socket.id);
            }
        });

        socket.on('channel', function(ch){
            if(channel!= false)
            {
                var index = clientSocket.indexOf(socket);
                if(index==-1)//First time set Channel, indicating a new jsmpeg connection
                {
                    clientSocket.push(socket);
                    clientChannel.push(ch);
                    console.log('Client Connected! ID=' + socket.id + '  Channel=' + ch);
                }
                else
                {
                    clientChannel[index] = ch;
                    console.log("Client #" + socket.id + ' is reset to Channel '+ ch);
                }
            }
        });

    });

};

module.exports = jsmpeg;