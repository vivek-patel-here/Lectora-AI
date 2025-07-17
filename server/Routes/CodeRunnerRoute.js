import express from "express";
import { body } from "express-validator";
import fs from "fs/promises";
import { exec } from "child_process";
import { v4 as uuid } from "uuid";
import { fileURLToPath } from "url";
import path from "path";
import { validateReqSchema } from "../middlewares/validateReqSchema.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { wrapAsync } from "../middlewares/wrapAsync.js";
import {judge0CodeRun} from "../controllers/codeRunnerController.js"

const router = express.Router({ mergeParams: true });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// /* -------------------- language config -------------------- */
// const LANG_CONFIG = {
//   python: { file: "code.py" },
//   javascript: { file: "code.js" },
//   c: { file: "code.c" },
//   cpp: { file: "code.cpp" },
//   java: { file: "Main.java" },
// };
// /* --------------------------------------------------------- */

// router.post(
//   "/run",
//   isAuthenticated,
//   [body("language").isString().toLowerCase(), body("code").isString()],
//   validateReqSchema,
//   async (req, res) => {
//     const { language, code } = req.body;

//     /* 0 — validate language */
//     if (!LANG_CONFIG[language]) {
//       return res
//         .status(400)
//         .json({ error: `Unsupported language: ${language}` });
//     }

//     const id = uuid();
//     const workspace = path.join(__dirname, "..", "tmp", id);
//     const template = path.join(__dirname, "..", "runners", language);
//     const codeFile = path.join(workspace, LANG_CONFIG[language].file);

//     try {
//       /* 1 — create workspace and copy template */
//       await fs.mkdir(workspace, { recursive: true });
//       await fs.cp(template, workspace, { recursive: true });

//       /* 2 — write user code */
//       await fs.writeFile(codeFile, code, "utf8");

//       /* 3 — build & run docker */
//       const image = `temp-${id}`;
//       const buildCmd = `docker build "${workspace}" -t ${image} --rm`;
//       const runCmd = `docker run --rm --network=none ${image}`;

//       await execPromise(buildCmd, 60_000); // 60 s build timeout (first pull can be slow)
//       const { stdout, stderr } = await execPromise(runCmd, 7_000); // 7 s execution timeout

//       res.status(200).json({ stdout, stderr });
//     } catch (err) {
//       res.status(500).json({ error: err.message });
//     } finally {
//       /* 4 — cleanup */
//       await fs.rm(workspace, { recursive: true, force: true }).catch(() => {});
//       exec(`docker rmi -f temp-${id}`); // fire‑and‑forget
//     }
//   }
// );

// /* ------- helper to wrap child_process.exec with a timeout -------- */
// function execPromise(cmd, timeout) {
//   return new Promise((resolve, reject) => {
//     exec(cmd, { timeout }, (err, stdout, stderr) => {
//       if (err) {
//         return reject(new Error(stderr || err.message));
//       }
//       resolve({ stdout, stderr });
//     });
//   });
// }

//******************code run using judge0 Api ************************ */
router.post("/exec", isAuthenticated, [
  body("language").isString(),
  body("code").isString(),
  body("input").isString().optional(),
],validateReqSchema,wrapAsync(judge0CodeRun));

export default router;
