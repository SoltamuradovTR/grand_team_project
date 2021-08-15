const { Router } = require("express");
const { clientsController } = require("../controllers/clients.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = Router();

router.get("/clients", clientsController.getAllClients);
router.get("/client/:id", clientsController.getClientById);
router.post("/client", clientsController.createClient);
router.post("/login/client", clientsController.loginClient);
router.delete("/client/:id", clientsController.removeClient);
router.patch("/client/:id", clientsController.editClient);
router.post("/avatar/client", authMiddleware, clientsController.addAvatar);

module.exports = router;
