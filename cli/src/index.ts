#!/usr/bin/env node
import {Command} from "commander";
import inquirer from "inquirer";
import {promptUserForConfig} from "./prompts.js";
import {generateConfig} from "./generator.js";
import {runProvisioner} from "./provisioner.js";

const program = new Command();

program
  .name("provisioner")
  .description("CLI to provision VMs and Docker containers")
  .version("1.0.0");

program
  .command("init")
  .description("Interactively initialize a new VM or Docker environment")
  .action(async () => {
    try {
      console.log("Starting provisioner setup...");
      const config = await promptUserForConfig();
      console.log("\nConfiguration collected successfully:");
      console.log(JSON.stringify(config, null, 2));

      await generateConfig(config);

      const {run} = await inquirer.prompt([
        {
          type: "confirm",
          name: "run",
          message: "Do you want to run the provisioning now?",
          default: true,
        },
      ]);

      if (run) {
        await runProvisioner(config, process.cwd());
      } else {
        console.log(
          "\nSkipping provisioning. Your configuration files have been generated.",
        );
      }
    } catch (error) {
      console.error("An error occurred:", error);
      process.exit(1);
    }
  });

program.parse(process.argv);
