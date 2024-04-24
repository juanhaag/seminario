const userService = require('../services/UserService');

class UserController {
    async createUser(req, res) {
        try {
            const userData = req.body;
            const userId = await userService.addUser(userData);
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ userId }));
        } catch (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: error.message }));
        }
    }
    

    async getUser(req, res) {
        try {
            const userId = req.params.userId;
            const user = await userService.getUser(userId);
            res.status(200).json(user);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    async updateUser(req, res) {
        try {
            const userId = req.params.userId;
            const userData = req.body;
            const message = await userService.updateUser(userId, userData);
            res.status(200).json({ message });
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    async deleteUser(req, res) {
        try {
            const userId = req.params.userId;
            const message = await userService.deleteUser(userId);
            res.status(200).json({ message });
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }
}

module.exports = new UserController();
