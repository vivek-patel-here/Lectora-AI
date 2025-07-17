import { exec } from "child_process";
import { promisify } from "util";
const execAsync = promisify(exec);

export const loadLanguageImages = async () => {
  const WARM_IMAGES = [
    "python:3.12-slim",
    "node:20-slim",
    "gcc:13",
    "openjdk:21-slim",
  ];

  console.log("🔄 Pulling language Docker images...");

  await Promise.all(
    WARM_IMAGES.map(async (image) => {
      try {
        const { stdout } = await execAsync(`docker pull ${image}`);
        console.log(`✅ Pulled ${image}`);
      } catch (err) {
        console.error(`❌ Failed to pull ${image}:`, err.stderr || err.message);
      }
    })
  );

  console.log("🚀 Language Docker images loaded.");
};