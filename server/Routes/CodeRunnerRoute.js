import express from "express"
const router = express.Router();
import  { runCode } from "../controllers/executeController.js";

router.post("/run", runCode);

export default router;