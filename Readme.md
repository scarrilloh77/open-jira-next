# Next.js OpenJira App

Para correr localmente, se necesita la base de datos.

```
docker-compose up -d
```

- El -d, significa **detached**

- MongoDB URL Local:

```
mongodb://localhost:27018/entriesdb
```

## Configurar las variables de entorno

Renombrar el archivo **.env.template**

## Llenar la base de datos con información de pruebas

Llamada:

```
http://localhost:3000/api/seed
```
