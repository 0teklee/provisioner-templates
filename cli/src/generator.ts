import fs from "fs";
import path from "path";
import ejs from "ejs";
import {fileURLToPath} from "url";
import {VmConfig} from "./prompts.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function generateConfig(
  config: VmConfig,
  outputDir: string = process.cwd(),
): Promise<string> {
  const isDocker = config.provider === "docker";
  const templateName = isDocker ? "Dockerfile.ejs" : "Vagrantfile.ejs";
  const outputName = isDocker ? "Dockerfile" : "Vagrantfile";

  const templatePath = path.join(__dirname, "templates", templateName);
  const outputPath = path.join(outputDir, outputName);

  if (!fs.existsSync(templatePath)) {
    throw new Error(`Template not found at ${templatePath}`);
  }

  const templateString = fs.readFileSync(templatePath, "utf8");
  const result = ejs.render(templateString, config);

  fs.writeFileSync(outputPath, result);
  console.log(`\nSuccessfully generated ${outputName} at ${outputPath}`);
  return outputPath;
}
