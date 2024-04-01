# Proyecto NOC

El objetivo es crear una serie de tareas usando Arquitectura Limpia con TypeScript

# dev
1. Clonar el archivo .env.template a .env
2. Configurar las variables de entorno

```
MAILER_SERVICE=gmail
MAILER_EMAIL=
MAILER_SECRET_KEY=
PORT=3000
PROD=false

MONGO_URL=
MONGO_DB_NAME=NOC
MONGO_USER=
MONGO_PASS=

POSTGRES_URL=
POSTGRES_BD=
POSTGRES_USER=
POSTGRES_PASSWORD=
```
3. Ejecutar el comando ``` npm install ```
4. Levantar las bases de datos con el comando
```docker compose up -d```
5. Ejecutar el comando ``` npm run dev ```


## Obtener Gmail Key
[Google AppPasswords](https://myaccoun.google.com/u/0/apppasswords)