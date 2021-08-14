const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Client = require("../models/Client.model");

module.exports.clientsController = {
  getAllClients: async (req, res) => {
    try {
      const clients = await Client.find();

      return res.json(clients);
    } catch (e) {
      return res.status(400).json({
        error: e.toString(),
      });
    }
  },

  getClientById: async (req, res) => {
    const { id } = req.params;
    try {
      const client = await Client.findById(id);

      if (!client) {
        return res.status(404).json({
          error: "Клиент с таким ID не найден",
        });
      }

      return res.json(client);
    } catch (e) {
      return res.status(400).json({
        error: e.toString(),
      });
    }
  },

  createClient: async (req, res) => {
    const { firstName, lastName, login, password, phone, email } = req.body;

    const hash = await bcrypt.hash(password, Number(process.env.BCRYPT_ROUNDS));

    if (!firstName) {
      return res.status(400).json({
        error: "Необходимо указать имя клиента!",
      });
    }
    if (!lastName) {
      return res.status(400).json({
        error: "Необходимо указать фамилию клиента!",
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
        firstName,
        lastName,
        login,
        password: hash,
        phone,
        email,
      });

      return res.json(client);
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
    const { firstName, lastName, login, password, phone, email } = req.body;

    try {
      const edited = await Client.findByIdAndUpdate(
        id,
        {
          firstName,
          lastName,
          login,
          password,
          phone,
          email,
        },
        { new: true }
      );

      return res.json(edited);
    } catch (e) {
      return res.status(401).json();
    }
  },

  loginClient: async (req, res) => {
    const { login, password } = req.body;

    const candidate = await Client.findOne({ login });

    if (!candidate) {
      return res.status(401).json("Неверный логин");
    }

    const valid = await bcrypt.compare(password, candidate.password);

    if (!valid) {
      return res.status(401).json("Неверный пароль");
    }

    const payload = {
      id: candidate._id,
      login: candidate.login,
    };

    const token = await jwt.sign(payload, process.env.SECRET_JWT_KEY, {
      expiresIn: "24h",
    });

    return res.json({
      text: "Авторизация прошла успешно",
      token,
      role: "Client",
      candidate,
    });
  },
};
