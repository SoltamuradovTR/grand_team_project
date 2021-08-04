const Client = require('../models/Client.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

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

        const hash = await bcrypt.hash(password, Number(process.env.BCRYPT_ROUNDS))

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
                name: name,
                login: login,
                password: hash,
                phone: phone,
                email: email
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

        const { authorization } = req.headers;

        const [ type, token] = authorization.split(' ');

        if (type !== 'Bearer') {
            return res.status(401).json('неверный тип токена')
        }

        try {
            const payload = jwt.verify(token, process.env.SECRET_JWT_KEY);

            const edited = await Client.findByIdAndUpdate(id, {
                name, login, password, phone, email
            }, { new: true});

            return res.json(edited)
        } catch (e) {
            return res.status(401).json();
        }
    },

    loginClient: async (req, res) => {
        const { login, password } = req.body

        const candidate = await Client.findOne({ login: login })

        if (!candidate) {
            return res.status(401).json('Неверный логин')
        }

        const valid = await bcrypt.compare(password, candidate.password)

        if (!valid) {
            return res.status(401).json('Неверный пароль')
        }

        const payload = {
            id: candidate._id,
            login: candidate.login
        }

        const token = await jwt.sign(payload, process.env.SECRET_JWT_KEY, {
            expiresIn: '24h'
        })

        res.json("Авторизация прошла успешно")
    }
}