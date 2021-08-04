const { Router } = require("express");
const clientRouter = require("./clients.routes");
const agentRouter = require('./agents.routes')
const requestRouter = require('./requests.route')

const router = Router();

router.use(clientRouter);
router.use(agentRouter);
router.use(requestRouter);

module.exports = router;