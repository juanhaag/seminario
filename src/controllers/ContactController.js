const contactService = require('../services/ContactService');

class ContactController {
    async createContact(req, res) {
        try {
            const { name, phone_number, userId } = req.body;

            const contactId = await contactService.createContact(userId, {name, phone_number});
            sendResponse(res, 201, { contactId });
        } catch (error) {
            sendResponse(res, 500, { error: error.message });
        }
    }

    async getContact(req, res) {
        try {
            const contactId = req.params.contactId;
            const contact = await contactService.getContact(contactId);
            sendResponse(res, 200, contact);
        } catch (error) {
            sendResponse(res, 500, { error: error.message });
        }
    }

    async updateContact(req, res) {
        try {
            const contactId = req.params.contactId;
            const contactData = req.body;
            const result = await contactService.updateContact(contactId, contactData);
            sendResponse(res, 200, { message: result });
        } catch (error) {
            sendResponse(res, 500, { error: error.message });
        }
    }

    async deleteContact(req, res) {
        try {
            const contactId = req.params.contactId;
            const result = await contactService.deleteContact(contactId);
            sendResponse(res, 200, { message: result });
        } catch (error) {
            sendResponse(res, 500, { error: error.message });
        }
    }

    async getAllContacts(req, res) {
        try {
            const userId = req.body.userId;
            const contacts = await contactService.getAllContacts(userId);
            sendResponse(res, 200, contacts);
        } catch (error) {
            sendResponse(res, 500, { error: error.message });
        }
    }
}

function sendResponse(res, statusCode, data) {
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
}

module.exports = new ContactController();
