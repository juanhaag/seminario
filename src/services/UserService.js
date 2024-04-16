const { connection } = require('../../utils/db');

function addUser(userData) {
    return new Promise((resolve, reject) => {
        connection.query('INSERT INTO users SET ?', userData, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result.insertId);
            }
        });
    });
}

function getUser(userId) {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM users WHERE id = ?', [userId], (error, result) => {
            if (error) {
                reject(error);
            } else {
                if (result.length > 0) {
                    resolve(result[0]);
                } else {
                    reject(new Error('Usuario no encontrado'));
                }
            }
        });
    });
}

function updateUser(userId, userData) {
    return new Promise((resolve, reject) => {
        connection.query('UPDATE users SET ? WHERE id = ?', [userData, userId], (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result.affectedRows > 0 ? 'Usuario actualizado' : 'Usuario no encontrado');
            }
        });
    });
}

function deleteUser(userId) {
    return new Promise((resolve, reject) => {
        connection.query('DELETE FROM users WHERE id = ?', [userId], (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result.affectedRows > 0 ? 'Usuario eliminado' : 'Usuario no encontrado');
            }
        });
    });
}


module.exports = { addUser, getUser, updateUser, deleteUser };
