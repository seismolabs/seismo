var config = {
	connection: process.env.MONGO_CONNECTION,

	authKey: process.env.AUTH_SIGN_KEY,

	tokenTtl: 60,

	logentries: {
		token: process.env.LOGENTRIES_TOKEN
	}
};

module.exports = config;