const { Router } = require("express");

const router = Router();
const menuController = require("../controllers/menu.controller");

router.get("/getallmenus", menuController.getAllMenus);

module.exports = router;
