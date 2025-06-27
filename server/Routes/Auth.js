import express from "express";
import googleAuthcontroller from "../controllers/googleAuthController.js";
import { wrapAsync } from "../middlewares/wrapAsync.js";
import { body } from "express-validator";
import { validateReqSchema } from "../middlewares/validateReqSchema.js";
import {
  signupController,
  loginController,
} from "../controllers/CrendetialAuthController.js";
import {
  verifyOtpController,
} from "../controllers/OtpController.js";
const router = express.Router({ mergeParams: true });
import {isAuthenticated} from "../middlewares/IsAuthenticated.js"
import { refreshTokenController,LogoutController } from "../controllers/TokenController.js";



//google authentictaion route
router.post("/google-web", wrapAsync(googleAuthcontroller));

//credential based routes-signup
router.post(
  "/credential/otp/signup",
  [
    body("username", "Username must be at least 2 character long")
      .isString()
      .isLength({ min: 2 }),
    body("email", "Invalid Email Field!").isEmail(),
    body("password", "Invalid Password Field").isString(),
    body("otp", "Please provide a valid Otp! It should be numeric.").isNumeric(),
  ],
  validateReqSchema,
  wrapAsync(verifyOtpController),
  wrapAsync(signupController)
);

//credential based routes-login
router.post(
  "/credential/login",
  [
    body("email", "Invalid Email!").isEmail(),
    body("password", "Invalid Password").isString(),
  ],
  validateReqSchema,
  wrapAsync(loginController)
);

//verify user authenticated
router.get("/verify",wrapAsync(refreshTokenController))

//logout user
router.get("/log-out",isAuthenticated,wrapAsync(LogoutController))

export default router;