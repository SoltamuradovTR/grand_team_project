const { Router } = require("express");
const { agentsController } = require("../controllers/agents.controller");

const router = Router();

router.get("/agents", agentsController.getAllAgents);
router.get("/agent/:id", agentsController.getAgentById);
router.post("/agent", agentsController.createAgent);
router.delete("/agent/:id", agentsController.removeAgent);
router.patch("/agent/:id", agentsController.editAgent);

module.exports = router;