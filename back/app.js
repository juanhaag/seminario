// app.js
const http = require('http');
const { parse } = require('url');
const bodyParser = require('body-parser');
const contactController = require('./src/controllers/ContactController');
const userController = require('./src/controllers/UserController');
const server = http.createServer((req, res) => {
    const url = parse(req.url, true);
    const method = req.method;

    bodyParser.json()(req, res, async () => {
        try {
            // Rutas para crear y obtener usuarios
            if (method === 'POST' && url.pathname === '/users') {
                await userController.createUser(req, res);
            } else if (method === 'GET' && url.pathname === '/users') {
            } else if (method === 'GET' && url.pathname.startsWith('/users/') && url.pathname.includes('/get_contact')) {
            } else if (method === 'POST' && url.pathname.startsWith('/users/') && url.pathname.endsWith('/contacts')) {
                await contactController.createContact(req, res);
            } else if (method === 'GET' && url.pathname.startsWith('/users/') && url.pathname.includes('/get_contacts')) {
                await contactController.getAllContacts(req, res);
            } else if (method === 'PUT' && url.pathname.startsWith('/users/') && url.pathname.includes('/contacts/')) {
            } else if (method === 'DELETE' && url.pathname.startsWith('/users/') && url.pathname.includes('/contacts/')) {
            } else {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Ruta no encontrada' }));
            }
        } catch (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: error.message }));
        }
    });
});


const port = 3000;
server.listen(port, () => {
    console.log(`Servidor en ejecución en http://localhost:${port}`);
});



/* CREATE DATABASE seminario;

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

 */