# Micro

Micro is my personal collection of microservices. Requests are limited to 5 hits/second.

## Services

Base URL at `/api`

* GeoIP (`/geoip/{ip}`): Looks up administrative information about the geolocation of the requested IP address. The parameter is optional: it will be the requester's IP address by default.
* Toggl (`/toggl`): Connects to [Toggl](https://toggl.com) and fetches my currently running task. A sample usage is provided at [now.mingjie.dev](https://now.mingjie.dev).

## License
[MIT](https://choosealicense.com/licenses/mit/)
