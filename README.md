## Client Gatewat

El gateway es el punto de comunnicacion entra nuestras clients y nuestros servicios.
Es el encargado de recibir las peticiones, enviarlas a los servicios correspondientes
y devolver la respuesta al cliente.

## Dev

1. Clonar el repositorio
2. Instalar las dependencias `npm install`
3. Creare un archivo `.env` basado en el `.env.template`
4. Tener levantados los microservicios que se van a consumir
5. Levantar el proyecto con `npm run start:dev`

## Nats

```

docker run -d --name nats-server -p 4222:4222 -p 6222:6222 -p 8222:8222 nats
```
