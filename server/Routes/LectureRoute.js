import express from "express";
const router = express.Router({ mergeParams: true });
import { isAuthenticated } from "../middlewares/IsAuthenticated.js";
import { body } from "express-validator";
import { validateReqSchema } from "../middlewares/validateReqSchema.js";
import { lectureController,getUserLecture } from "../controllers/LectureController.js";
import { wrapAsync} from "../middlewares/wrapAsync.js";

router.post(
  "/get",
  isAuthenticated,
  [body("userPrompt").isString().isLength({ min: 4 })],
  validateReqSchema,
  wrapAsync(lectureController)
);

router.get("/",isAuthenticated,wrapAsync(getUserLecture));

export default router;
