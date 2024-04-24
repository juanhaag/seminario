
const mysql = require('mysql');

const connectionDetails = {
  host: 'localhost',
  database: 'seminario',
  user: 'root',
  password: ''
};

let connection; 

function connect() {
  try {
    connection = mysql.createConnection(connectionDetails);

    connection.connect(err => {
      if (err) {
        throw err; 
      }
      console.log('Base de datos conectada✅');
    });
  } catch (error) {
    console.error('Error conectado a la DB ❌', error);
  }
}

connect();

module.exports = { connection };
