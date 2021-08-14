const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Agent = require("../models/Agent.model");

module.exports.agentsController = {
  getAllAgents: async (req, res) => {
    try {
      const agents = await Agent.find();

      return res.json(agents);
    } catch (e) {
      return res.status(400).json({
        error: e.toString(),
      });
    }
  },

  getAgentById: async (req, res) => {
    const { id } = req.params;
    try {
      const agent = await Agent.findById(id).populate('clients');

      if (!agent) {
        return res.status(404).json({
          error: "Агент с таким ID не найден",
        });
      }

      return res.json(agent);
    } catch (e) {
      return res.status(400).json({
        error: e.toString(),
      });
    }
  },

  createAgent: async (req, res) => {
    const { firstName, lastName, login, password, phone, email, location } =
      req.body;
    const hash = await bcrypt.hash(password, Number(process.env.BCRYPT_ROUNDS));

    if (!firstName) {
      return res.status(400).json({
        error: "Необходимо указать имя агента!",
      });
    }
    if (!lastName) {
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

    if (!location) {
      return res.status(400).json({
        error: "Необходимо указать город агента!",
      });
    }

    try {
      const agent = await Agent.create({
        firstName,
        lastName,
        login,
        password: hash,
        phone,
        email,
        location,
      });

      return res.json(agent);
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
    const { firstName, lastName, login, password, phone, email, location } =
      req.body;

    try {
      const edited = await Agent.findByIdAndUpdate(
        id,
        {
          firstName,
          lastName,
          login,
          password,
          phone,
          email,
          location,
        },
        { new: true }
      );

      return res.json(edited);
    } catch (e) {
      return res.status(400).json({
        error: e.toString(),
      });
    }
  },

  loginAgent: async (req, res) => {
    const { login, password } = req.body;

    const candidate = await Agent.findOne({ login }).populate("clients");

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

    console.log(candidate);
    return res.json({
      text: "Авторизация прошла успешно",
      token,
      role: "Agent",
      candidate,
    });
  },

  addClientToAgent: async (req, res) => {
    const { id } = req.params;
    const data = req.body;

    try {
      const agent = await Agent.updateOne(
        { _id: id },
        { $addToSet: { clients: data.client } }
      );
      return res.json(agent);
    } catch (e) {
      return res.status(400).json({
        error: e.toString(),
      });
    }
  },
};
