const { Router } = require("express");
const { reviewsController } = require("../controllers/reviews.controller");

const router = Router();

router.get("/reviews", reviewsController.getReviews);
router.post("/client/:id/review", reviewsController.createReviews);

module.exports = router;
