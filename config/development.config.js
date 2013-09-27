var config = {
	connection: 'mongodb://localhost:27017/likeastoredb',
	options: { auto_reconnect: true },

	applicationUrl: 'http://localhost:3001',
	siteUrl: 'http://localhost:3000',

	// api keys
	services: {
		github: {
			appId: 'dc3c7a7050dccee24ed3',
			appSecret: 'c18dde90f5e928a39b0f0432d5125a3e0a31a23d'
		},

		twitter: {
			consumerKey: 'dgwuxgGb07ymueGJF0ug',
			consumerSecret: 'eusoZYiUldYqtI2SwK9MJNbiygCWOp9lQX7i5gnpWU'
		},

		facebook: {
			appId: '394024317362081',
			appSecret: 'bc86f2ab9afcb1227227146e5ea9ad44'
		},

		stackoverflow: {
			clientId: '1533',
			clientKey: 'J2wyheThU5jYFiOpGG22Eg((',
			clientSecret: 'KOCBFY4OUP6OE7Q1xNw1wA(('
		}
	},

	mandrill: {
		token: null
	},

	logentries: {
		token: null
	},

	collector: {
		// scheduler cycle
		schedulerRestart: 1000,

		// after collector got to normal mode, next scheduled run in 15 mins
		nextNormalRunAfter: 10000,

		// after collector got to rateLimit mode, next scheduled run in hour
		nextRateLimitRunAfter: 1000 * 60 * 60,

		// initial mode quotes
		quotes: {
			github: {
				runAfter: 5000
			},

			twitter: {
				runAfter: 60000
			},

			stackoverflow: {
				runAfter: 5000
			}
		}
	}
};

module.exports = config;