const Request = require("../models/Request");
const jwt = require("jsonwebtoken");
const path = require("path");

module.exports.requestsController = {
  getRequests: async (req, res) => {
    try {
      const request = await Request.find()
        .populate("appraisers")
        .populate("author");

      return res.json(request);
    } catch (e) {
      return res.status(400).json({
        error: e.toString(),
      });
    }
  },

  getRequestsByClient: async (req, res) => {
    const { id } = req.params;
    try {
      const request = await Request.find({ author: id });

      return res.json(request);
    } catch (e) {
      return res.status(400).json({
        error: e.toString(),
      });
    }
  },
  createRequest: async (req, res) => {
    const { title, description, author, source, location } = req.body;

    const { authorization } = req.headers;

    const [type, token] = authorization.split(" ");

    if (type !== "Bearer") {
      return res.status(401).json("неверный тип токена");
    }

    if (!title) {
      return res.status(400).json({
        error: "Необходимо указать заголовок",
      });
    }
    if (!description) {
      return res.status(400).json({
        error: "Необходимо указать описание",
      });
    }
    try {
      const payload = jwt.verify(token, process.env.SECRET_JWT_KEY);

      if (payload.id !== req.params.id) {
        return res.status(400).json({
          error: "Нет доступа у данного пользователя",
        });
      }

      const request = await Request.create({
        title,
        description,
        author,
        source,
        location,
      });
      return res.json(request);
    } catch (e) {
      return res.status(400).json({
        error: e.toString(),
      });
    }
  },

  deleteRequest: async (req, res) => {
    const { id } = req.params;

    const { authorization } = req.headers;

    const [type, token] = authorization.split(" ");

    try {
      const request = await Request.findById(id);

      const payload = jwt.verify(token, process.env.SECRET_JWT_KEY);

      if (payload.id === request.author.toString()) {
        await request.remove();
        return res.json("Удалено");
      }

      return res.status(401).json({
        error: "Ошибка, нет доступа",
      });
    } catch (e) {
      return res.status(400).json({
        error: e.toString(),
      });
    }
  },

  editRequest: async (req, res) => {
    const { id } = req.params;

    const { active } = req.body;

    try {
      const edited = await Request.findByIdAndUpdate(
        id,
        {
          active,
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

  addAppraisers: async (req, res) => {
    const { id } = req.params;
    const data = req.body;

    try {
      const request = await Request.updateOne(
        { _id: id },
        { $addToSet: { appraisers: data.request } }
      );
      return res.json(request);
    } catch (e) {
      return res.status(400).json({
        error: e.toString(),
      });
    }
  },
};
