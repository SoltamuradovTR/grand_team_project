const Review = require("../models/Review.model");
const Agent = require('../models/Agent.model')

module.exports.reviewsController = {
  getReviewsById: async (req, res) => {
    const { id } = req.params;
    try {
      const review = await Review.find({
        agent: id
      }).populate("author");

      return res.json(review);
    } catch (e) {
      return res.status(400).json({
        error: e.toString(),
      });
    }
  },

  createReviews: async (req, res) => {
    const { text, author } = req.body;

    const { id } = req.params;

    if (!text) {
      return res.status(400).json({
        error: "Необходимо указать текст",
      });
    }

    try {
      const review = await Review.create({
        text,
        author,
        agent: id
      });
      return res.json(review);
    } catch (e) {
      return res.status(400).json({
        error: e.toString(),
      });
    }
  },
};
