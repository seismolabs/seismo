var http = require('http');

module.exports = {
	start: function(config, callback) {
		var seismo = require('./seismo')(config);
		http.createServer(seismo).listen(seismo.get('port'), callback);
	}
};