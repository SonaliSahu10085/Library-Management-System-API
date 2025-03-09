const express = require("express");
const userController = require("../controllers/userController");
const wrapAsync = require("../utils/wrapAsync");
const { validateBody } = require("../middlewares/serverValidation");
const { isValidEntity, isUnique } = require("../middlewares/entityValidation");
const upload = require("../middlewares/upload");
const router = express.Router();

/* GET - Retrieves all books*/
router.get("/", wrapAsync(userController.getAllUsers));

/* POST - Add new book. */
router.post("/", validateBody, isUnique, wrapAsync(userController.addUser));

/* GET - Retrives a specific book by ID. */
router.get("/:id", isValidEntity, wrapAsync(userController.getSpecificUser));

/* PUT - Updates a book by ID. */
router.put(
  "/:id",
  isValidEntity,
  validateBody,
  wrapAsync(userController.updateUser)
);

/* DELETE - Deletes a book by ID. */
router.delete("/:id", isValidEntity, wrapAsync(userController.deleteUser));

/* POST - Upload book cover image */
router.post(
  "/:id/upload-profile-picture",
  isValidEntity,
  upload.single("profilePicture"),
  wrapAsync(userController.uploadProfilePicture)
);

module.exports = router;
