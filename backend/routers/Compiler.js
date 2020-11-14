const express = require("express");
const compilercontroller = require("../controllers/compiler-controller");
const router = express.Router();
router.post("/run", compilercontroller.runhandler);
module.exports = router;
