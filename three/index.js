var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

const taddos = {};

io.on('connection', function(socket){
    console.log('a player connected');
    let connectionKey;
    socket.on('position', ({ key, position }, responseFn) => {
    	connectionKey = key;
    	taddos[key] = position;

    	const otherTaddos = Object.keys(taddos)
	    	.filter(taddo => taddo !== key)
	    	.map(taddo => ({
	    		key: taddo,
	    		position: taddos[taddo],
	    	}));

        responseFn({ items: otherTaddos });
    });

    socket.on('disconnect', reason => {
    	console.log(`${connectionKey} disconnected because ${reason}`);
    	delete taddos[connectionKey];
    })
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
