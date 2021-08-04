const { Router } = require("express");
const clientRouter = require("./clients.routes");
const agentRouter = require('./agents.routes')


const router = Router();

router.use(clientRouter);
router.use(agentRouter);

module.exports = router;