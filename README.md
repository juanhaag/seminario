# Documentación de la Aplicación

## Descripción

Backend realizado en node js sin frameworks para manejar el servidor. NO pude terminar el front por temas de tiempo estoy muy ajustado con el trabajo

## Requisitos Previos

- Node.js (versión mayor a 17)
- npm
- Docker / servidor de mysql

## Instalación

```bash
git clone git@github.com:juanhaag/seminario.git
cd seminario/back
npm install
```

## Base de datos

### Opcion 1 docker-compose
```bash
cd seminario/back
docker-compose up -d
```
### Opcion 2 configuracion manual
```bash
Configurar manualmente una base de datos MySQL utilizando las credenciales en utils/db.js.

const connectionDetails = {
  host: 'localhost',
  database: 'seminario',
  user: 'root',
  password: 'password'
};
```
## Configuracion base de datos
```sql
CREATE DATABASE seminario;

USE seminario;

CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT, 
  username VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE contacts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  phone_number VARCHAR(255) NOT NULL,
  user_id INT(16) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)  
);
```

## Correr proyecto
```bash 
cd seminario/back node app.js
```


#### Crear usuario
```bash 
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{
        "username": "pepe"
      }' \
  http://localhost:3000/users
```
#### Crear contacto

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{
        "name": "pepe",
        "phone_number": "12345567",
        "userId": 1
      }' \
  http://localhost:3000/users/contacts

```
#### Editar contacto

```bash
curl -X PUT \
  -H "Content-Type: application/json" \
  -d '{
        "contactId": "1",
        "name": "Marcos",
        "phone_number": "12345567"
      }' \
  http://localhost:3000/users/update/
```

```bash
curl -X PUT \
  -H "Content-Type: application/json" \
  -d '{
        "contactId": "1",
        "name": "Marcos",
        "phone_number": "12345567"
      }' \
  http://localhost:3000/users/update/
```
