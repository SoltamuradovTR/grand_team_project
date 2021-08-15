const { Router } = require("express");
const { agentsController } = require("../controllers/agents.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const router = Router();

router.get("/agents", agentsController.getAllAgents);
router.get("/agent/:id", agentsController.getAgentById);
router.post("/agent", agentsController.createAgent);
router.post("/login/agent", agentsController.loginAgent);
router.delete("/agent/:id", agentsController.removeAgent);
router.patch("/agent/:id", agentsController.editAgent);
router.post("/add/client/to/:id", agentsController.addClientToAgent);
router.post("/avatar", authMiddleware, agentsController.addAvatar);

module.exports = router;
