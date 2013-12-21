# Docker installation

Ready to use docker image to deploy [Seismo](https://github.com/seismo/seismo-server) server.

## Installation

You have to install `docker` on you machine first, please follow instruction [here](http://www.docker.io/gettingstarted/#h_installation).

### Prepare image

In order to get docker image with seismo, run

```
$ docker pull seismolabs/server
```

To persist the data, it's recommended to create external volume,

```
$ mkdir -p ~/seismo/data
```

You also have to create external config file,

```
$ mkdir -p ~/seismo/config
$ touch ~/seismo/config/index.js
```

### Start server

Run the server,

```
$ docker run -d -p 80:8080 -v ~/seismo/data:/data/db -v ~/seismo/config:/home/seismo/config seismolabs/server
```

Run `docker ps` command and you should we, the server is started.
