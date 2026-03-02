#!/usr/bin/env node
import {Command} from "commander";
import inquirer from "inquirer";
import {promptUserForConfig} from "./prompts.js";
import {generateConfig} from "./generator.js";
import {runProvisioner} from "./provisioner.js";
import {i18n} from "./i18n.js";

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

      const t = i18n[config.language];

      const {run} = await inquirer.prompt([
        {
          type: "confirm",
          name: "run",
          message: t.runProvisioning,
          default: true,
        },
      ]);

      if (run) {
        await runProvisioner(config, process.cwd());
      } else {
        console.log(t.skipProvisioning);
      }
    } catch (error) {
      console.error("An error occurred:", error);
      process.exit(1);
    }
  });

program.parse(process.argv);
