const express = require("express");
const router = express.Router();

const {
  registration,
  login,
  current,
  validTokenCheck,
} = require("../controllers/userController");
const validateToken = require("../middleware/validateTokenHandler");

router.post("/registration", registration);
router.post("/login", login);
router.get("/protected", validateToken, current);
router.post("/tokenIsValid", validTokenCheck);

module.exports = router;
