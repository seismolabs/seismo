var http = require('http');
var seismo = require('./seismo')();

http.createServer(seismo).listen(seismo.get('port'), function () {
	console.log('seismo server started');
});