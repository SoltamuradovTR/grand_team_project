const Client = require('../models/Client.model');

module.exports.clientsController = {
    getAllClients: async (req, res) => {
        try {
            const clients = await Client.find()

            return res.json(clients)
        } catch (e) {
            return res.status(400).json({
                error: e.toString()
            })
        }
    },

    getClientById: async (req, res) => {
        const { id } = req.params;
        try {
            const client = await Client.findById(id)

            if (!client) {
                return res.status(404).json({
                    error: 'Клиент с таким ID не найден'
                })
            }

            return res.json(client)
        } catch (e) {
            return res.status(400).json({
                error: e.toString()
            })
        }
    },

    createClient: async (req, res) => {
        const { name, login, password, phone, email } = req.body;

        if (!name) {
            return res.status(400).json({
                error: "Необходимо указать имя клиента!",
            });
        }

        if (!login) {
            return res.status(400).json({
                error: "Необходимо указать логин клиента!",
            });
        }

        if (!password) {
            return res.status(400).json({
                error: "Необходимо указать пароль клиента!",
            });
        }

        if (!phone) {
            return res.status(400).json({
                error: "Необходимо указать номер телефона клиента!",
            });
        }

        if (!email) {
            return res.status(400).json({
                error: "Необходимо указать электронную почту клиента!",
            });
        }

        try {
            const client = await Client.create({
                name, login, password, phone, email
            })

            return res.json(client)
        } catch (e) {
            return res.status(400).json({
                error: e.toString(),
            });
        }
    },

    removeClient: async (req, res) => {
        const { id } = req.params;

        try {
            const deleted = await Client.findByIdAndRemove(id);

            if (!deleted) {
                return res.status(400).json({
                    error: "Не удалось удалить клиента, введите правильный ID",
                });
            }

            return res.json({
                message: "Клиент успешно удален",
            });
        } catch (e) {
            return res.status(400).json({
                error: e.toString(),
            });
        }
    },

    editClient: async (req, res) => {
        const { id } = req.params;
        const { name, login, password, phone, email } = req.body;

        try {
            const edited = await Client.findByIdAndUpdate(id, {
                name, login, password, phone, email
            }, { new: true});

            return res.json(edited)
        } catch (e) {
            return res.status(400).json({
                error: e.toString(),
            });
        }
    },
}