const express = require("express");
const {
  getContacts,
  getIndividualContact,
  createContacts,
  updateContacts,
  deleteContacts,
} = require("../controllers/contactController");
const validateToken = require("../middleware/validateTokenHandler");

const router = express.Router();

// router.route("/").get((req, res) => {
//   res.status(200).json({
//     message: "Get all contacts.",
//   });
// });
// or importing controller and passing the login in .get mothods

// =============== THIS WAY =============================
// router.route("/").get(getContacts).post(createContacts);

// router
//   .route("/:id")
//   .get(getIndividualContact)
//   .put(updateContacts)
//   .delete(deleteContacts);

// ================ OR ==================================
router.use(validateToken);
router.route("/").get(getContacts);

router.route("/").post(createContacts);

router.route("/:id").get(getIndividualContact);

router.route("/:id").put(updateContacts);

router.route("/:id").delete(deleteContacts);

module.exports = router;
