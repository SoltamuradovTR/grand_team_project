const Review = require("../models/Review.model");

module.exports.reviewsController = {
  getReviewsById: async (req, res) => {
    const { id } = req.params;
    try {
      const review = await Review.findById(id).populate("author");

      return res.json(review);
    } catch (e) {
      return res.status(400).json({
        error: e.toString(),
      });
    }
  },

  createReviews: async (req, res) => {
    const { text, author } = req.body;

    if (!text) {
      return res.status(400).json({
        error: "Необходимо указать текст",
      });
    }

    try {
      const review = await Review.create({
        text,
        author,
      });
      return res.json(review);
    } catch (e) {
      return res.status(400).json({
        error: e.toString(),
      });
    }
  },
};
