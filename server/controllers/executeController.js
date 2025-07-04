import fs from "fs"
import path from "path"
import  { exec }from "child_process";
import  {v4} from "uuid";
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const fileMap = {
  python: "code.py",
  cpp: "code.cpp",
  java: "Main.java",
  javascript: "code.js",
};

const dockerfileMap = {
  python: path.join(__dirname, "..", "Docker", "python.Dockerfile"),
  cpp: path.join(__dirname, "..", "Docker", "cpp.Dockerfile"),
  java: path.join(__dirname, "..", "Docker", "java.Dockerfile"),
  javascript: path.join(__dirname, "..", "Docker", "javascript.Dockerfile"),
};

export const runCode = async (req, res) => {
  const { code, language } = req.body;

  if (!fileMap[language]) {
    return res.status(400).json({ error: "Unsupported language" });
  }

  const uniqueId = v4();
  const tempDir = path.join(__dirname, "..", "temp", uniqueId);
  fs.mkdirSync(tempDir, { recursive: true });

  const codeFilename = fileMap[language];
  const codePath = path.join(tempDir, codeFilename);
  fs.writeFileSync(codePath, code);

  // Copy run_code.sh
  const scriptSrc = path.join(__dirname, "..", "Docker", "run_code.sh");
  const scriptDest = path.join(tempDir, "run_code.sh");
  fs.copyFileSync(scriptSrc, scriptDest);

  const imageTag = `code-runner-${language}`;

  try {
    // Build Docker image for language (if not already built, you can cache this)
    await new Promise((resolve, reject) => {
      exec(
        `docker build -f ${dockerfileMap[language]} -t ${imageTag} .`,
        (err, stdout, stderr) => {
          if (err) {
            reject(stderr);
          } else {
            resolve(stdout);
          }
        }
      );
    });

    // Run Docker container with mounted temp folder
    exec(
      `docker run --rm -v ${tempDir}:/app ${imageTag}`,
      (err, stdout, stderr) => {
        // Cleanup
        fs.rmSync(tempDir, { recursive: true, force: true });

        if (err) {
          return res.json({ error: stderr || "Execution failed" });
        }

        return res.json({ output: stdout });
      }
    );
  } catch (err) {
    fs.rmSync(tempDir, { recursive: true, force: true });
    return res.status(500).json({ error: err.toString() });
  }
};
