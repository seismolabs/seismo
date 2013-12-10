var http = require('http');
var seismo = require('./seismo')();

http.createServer(seismo).listen(seismo.get('port'), function (err) {
	var env = process.env.NODE_ENV || 'development';
	console.log('seismo server started on port ' + seismo.get('port') + ' env ' + env);
});