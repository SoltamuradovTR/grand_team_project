const { Router } = require("express");
const clientRouter = require("./clients.routes");
const agentRouter = require('./agents.routes')
const requestRouter = require('./requests.route')
const reviewRouter = require('./reviews.routes')

const router = Router();

router.use(clientRouter);
router.use(agentRouter);
router.use(requestRouter);
router.use(reviewRouter)

module.exports = router;