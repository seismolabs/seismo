## Installation

There are few ways you can install `seismo` locally. It's availabled on npm, github and docker index.

### NPM installation

`Seismo` server is available on npm.

```
$ npm install seismo
```

#### Configuration

In order to run it, you have to provide configuration. Configuration is object, which includes several properties:

```js
var config = {
	connection: 'CONNECTION_STRING',		// [string] connection string to mongo
	authKey: 'SHARED_SECRET',				// [string] used to sign server tokens,
	tokenTtl: 60,							// [int] token time-to-leave in minutes, default is 60 (hour)
	users: {
		'user': 'BCRYPTED_PASSWORD_HASH'	// [string:string] pairs of user name and bcrypted passwords (IMPORTANT, bcrypt with 12 rounds must be used)
		/* as many as needed */
	}
};
```

Start `seismo` server,

```js
var seismo = require('seismo');
seismo.start(config, function (err) {
	console.log('seismo server started');
});
```

### GitHub installation

It also possible just clone repo, modify the configuration and start the server.

```
$ git clone https://github.com/likeastore/seismo.git
$ cd seismo
```

Apply changes into [/config](/config) and start server.

```
$ code src/server.js
```

### Docker installation

TDB.
