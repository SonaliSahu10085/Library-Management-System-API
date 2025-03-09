const express = require("express");
const loanController = require("../controllers/loanController");
const wrapAsync = require("../utils/wrapAsync");
const { validateBody } = require("../middlewares/serverValidation");
const { isValidEntity, isUnique } = require("../middlewares/entityValidation");
const router = express.Router();

/* GET - Retrieves all loans*/
router.get("/", wrapAsync(loanController.getAllLoans));

/* POST - Add new loan. */
router.post("/", validateBody, isUnique, wrapAsync(loanController.addLoan));

/* PUT - Updates a loan by ID. */
router.put(
  "/:id",
  isValidEntity,
  validateBody,
  wrapAsync(loanController.updateLoan)
);

/* DELETE - Deletes a loan by ID. */
router.delete("/:id", isValidEntity, wrapAsync(loanController.deleteLoan));

module.exports = router;
