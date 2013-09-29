var logentries = require('node-logentries');
var config = require('../../config');

var logentriesLogger = logentries.logger({
	token: config.logentries.token
});

function stub(obj) {
	var original = obj.log;
	obj.log = function (type, message) {
		original.call(obj, type, message);
		logentriesLogger.log(type, message);
	};

	return obj;
}

module.exports = stub;