const express = require("express");
const router = router.Router();

router.use("", require("./users.routes"));
router.use("", require("./menus.routes"));

module.exports = router;
