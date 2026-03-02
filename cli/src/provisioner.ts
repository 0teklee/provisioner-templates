import {spawn} from "child_process";
import {VmConfig} from "./prompts.js";

export async function runProvisioner(
  config: VmConfig,
  cwd: string = process.cwd(),
): Promise<void> {
  const isDocker = config.provider === "docker";

  let command: string;
  let args: string[];

  if (isDocker) {
    command = "docker";
    args = ["build", "-t", "provisioned-container", "."];
  } else {
    command = "vagrant";
    args = ["up", "--provider", config.provider];
  }

  console.log(`\nExecuting: ${command} ${args.join(" ")}\n`);

  return new Promise((resolve, reject) => {
    const proc = spawn(command, args, {cwd, stdio: "inherit"});

    proc.on("close", (code) => {
      if (code === 0) {
        console.log(`\nProvisioning completed successfully!`);
        resolve();
      } else {
        const errorMsg = `\nProvisioning failed with exit code ${code}`;
        console.error(errorMsg);
        reject(new Error(errorMsg));
      }
    });

    proc.on("error", (err) => {
      console.error(`\nFailed to start subprocess: ${err.message}`);
      reject(err);
    });
  });
}
