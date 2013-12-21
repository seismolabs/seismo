# Seismo

Simple tool to track and analyze application events.

## Description

It should be easy to start collecting application events in order to understand what's going on inside, users activity and performance issues. We solve that by logging application events to some storage and when build reports based on this data.

There are few solutions that allows to do that. But you might decided to track on your own, fully controlling the flow and also make a solution cheap. Thats there `Seismo` will help.

### Simple architecture

It's build upon open source technology and it's open-source by itself. Simple deploy and infrastructure around will give you able to not dive upon in details, but simply use it.

MongoDB is used as server database, there events are stored. Express.js application exposes REST API, there you post events and build reports on.

### Docker friendly

Server is easy deployable on any Node.js-friendly system. But to make deployment event more simple, we provide Docker image and all you need to do after just run we bash commands to start.

### Clients

The clients are also part of project. Just for now we have Express.js/Node.js client, but will support client apps, Ruby, Python and different combinations of languages and frameworks. Since the clients are simple HTTP applications, it's really easy to extend the support.

## Documentation

* [Installation](/docs/installation.md)
* [Analytics with Seismo](/docs/analytics.md)
* [REST API](/docs/restapi.md)
* [Deployment with Docker](/docs/docker.md)
* [Using Dashboard](/docs/dashboard.md)

## License

MIT