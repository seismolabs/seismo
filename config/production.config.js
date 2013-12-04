var config = {
	connection: process.env.MONGO_CONNECTION,

	authKey: process.env.AUTH_SIGN_KEY,

	tokenTtl: 60,

	logentries: {
		token: process.env.LOGENTRIES_TOKEN
	},

	users: {
		'alexanderbeletsky': '$2a$12$8OWQYmioFTci9/kGppVujeEmFkOVCumMRVkYKg42fopiE9nYuD4uW',
		'voronianski': '$2a$12$5JkTzjpF8HcJNUrHrT.OiOqs80lXcaABNUKRTY51N.EJh240vsuJe',
		'likeastore': '$2a$12$gS6K/5dt8ECKnB93BoVnse7qXTeljAH7dSlLZZrO7TPdLEYZwjnrG'
	}
};

module.exports = config;