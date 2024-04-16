const { connection } = require('../../utils/db');

function createContact(userId, contactData) {
    return new Promise((resolve, reject) => {
        const newContact = { ...contactData, user_id: userId };
        connection.query('INSERT INTO contacts SET ?', newContact, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result.insertId);
            }
        });
    });
}

function getContact(contactId) {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM contacts WHERE id = ?', [contactId], (error, result) => {
            if (error) {
                reject(error);
            } else {
                if (result.length > 0) {
                    resolve(result[0]);
                } else {
                    reject(new Error('Contacto no encontrado'));
                }
            }
        });
    });
}

function updateContact(contactId, contactData) {
    return new Promise((resolve, reject) => {
        connection.query('UPDATE contacts SET ? WHERE id = ?', [contactData, contactId], (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result.affectedRows > 0 ? 'Contacto actualizado' : 'Contacto no encontrado');
            }
        });
    });
}

function deleteContact(contactId) {
    return new Promise((resolve, reject) => {
        connection.query('DELETE FROM contacts WHERE id = ?', [contactId], (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result.affectedRows > 0 ? 'Contacto eliminado' : 'Contacto no encontrado');
            }
        });
    });
}

function getAllContacts(userId) {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM contacts WHERE user_id = ?', [userId], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

module.exports = { createContact, getContact, updateContact, deleteContact, getAllContacts };
