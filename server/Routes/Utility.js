import express from "express";
import { body } from "express-validator";
import { wrapAsync } from "../middlewares/wrapAsync.js";
import { isAuthenticated } from "../middlewares/IsAuthenticated.js";
import { validateReqSchema } from "../middlewares/validateReqSchema.js";
import {
  changeModeUtil,
  getUserinfoUtil,
  changeBioUtil,
  changePasswordUtil,
  deleteAccountUtil
} from "../controllers/UtilController.js";
const router = express.Router({ mergeParams: true });

//route to change mode
router.post(
  "/mode",
  [body("mode").isInt()],
  validateReqSchema,
  isAuthenticated,
  wrapAsync(changeModeUtil)
);

router.get("/info", isAuthenticated, wrapAsync(getUserinfoUtil));

//route to change bio description of the user
router.post(
  "/bio",
  [body("bio").isString()],
  validateReqSchema,
  isAuthenticated,
  wrapAsync(changeBioUtil)
);

//route to change password
router.post(
  "/password/new",
  [body("oldPassword").isString(), body("newPassword").isString()],
  validateReqSchema,
  isAuthenticated,
  wrapAsync(changePasswordUtil)
);

router.post(
  "/account/delete",
  isAuthenticated,
  wrapAsync(deleteAccountUtil)
);

export default router;
