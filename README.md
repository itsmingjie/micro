# Micro

Micro is my personal collection of microservices. Requests are limited to 5 hits/second.

## Services

Base URL at `/api`

* GeoIP (`/geoip/{ip}`): Looks up administrative information about the geolocation of the requested IP address. The parameter is optional: it will be the requester's IP address by default.

## License
[MIT](https://choosealicense.com/licenses/mit/)