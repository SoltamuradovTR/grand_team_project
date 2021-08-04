const Agent = require('../models/Agent.model');

module.exports.agentsController = {
    getAllAgents: async (req, res) => {
        try {
            const agents = await Agent.find()

            return res.json(agents)
        } catch (e) {
            return res.status(400).json({
                error: e.toString()
            })
        }
    },

    getAgentById: async (req, res) => {
        const { id } = req.params;
        try {
            const agent = await Agent.findById(id)

            if (!agent) {
                return res.status(404).json({
                    error: "Агент с таким ID не найден"
                })
            }

            return res.json(agent)
        } catch (e) {
            return res.status(400).json({
                error: e.toString()
            })
        }
    },

    createAgent: async (req, res) => {
        const { name, login, password, phone, email } = req.body;

        if (!name) {
            return res.status(400).json({
                error: "Необходимо указать имя агента!",
            });
        }

        if (!login) {
            return res.status(400).json({
                error: "Необходимо указать логин агента!",
            });
        }

        if (!password) {
            return res.status(400).json({
                error: "Необходимо указать пароль агента!",
            });
        }

        if (!phone) {
            return res.status(400).json({
                error: "Необходимо указать номер телефона агента!",
            });
        }

        if (!email) {
            return res.status(400).json({
                error: "Необходимо указать электронную почту агента!",
            });
        }

        try {
            const agent = await Agent.create({
                name, login, password, phone, email
            })

            return res.json(agent)
        } catch (e) {
            return res.status(400).json({
                error: e.toString(),
            });
        }
    },

    removeAgent: async (req, res) => {
        const { id } = req.params;

        try {
            const deleted = await Agent.findByIdAndRemove(id);

            if (!deleted) {
                return res.status(400).json({
                    error: "Не удалось удалить агента, введите правильный ID",
                });
            }

            return res.json({
                message: "Агент успешно удален",
            });
        } catch (e) {
            return res.status(400).json({
                error: e.toString(),
            });
        }
    },

    editAgent: async (req, res) => {
        const { id } = req.params;
        const { name, login, password, phone, email } = req.body;

        try {
            const edited = await Agent.findByIdAndUpdate(id, {
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