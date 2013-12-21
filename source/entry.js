var http = require('http');

var entry = {
	start: function(config, callback) {
		var seismo = require('./seismo')(config);
		http.createServer(seismo).listen(seismo.get('port'), function (err) {
			if (err) {
				return callback(err);
			}

			return callback(null, seismo);
		});
	}
};

module.exports = entry;