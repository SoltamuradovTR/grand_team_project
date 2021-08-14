const { Router } = require("express");
const { reviewsController } = require("../controllers/reviews.controller");

const router = Router();

router.get("/reviews/agent/:id", reviewsController.getReviewsById);
router.post("/client/:id/review", reviewsController.createReviews);

module.exports = router;
