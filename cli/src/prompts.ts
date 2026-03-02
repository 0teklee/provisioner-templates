import inquirer from "inquirer";
import {i18n, Language} from "./i18n.js";

export interface VmConfig {
  language: Language;
  preset: "manual" | "kali";
  provider: "virtualbox" | "vmware" | "docker";
  os: string;
  ram: number;
  cpu: number;
  disk: number;
  network: "nat" | "bridged" | "host-only" | "kali-preset";
  platform: "macOS" | "Linux" | "Windows";
}

export async function promptUserForConfig(): Promise<VmConfig> {
  const langPrompt = await inquirer.prompt([
    {
      type: "list",
      name: "language",
      message: "Select language / 언어 선택",
      choices: ["English", "한국어 (Korean)"],
    },
  ]);
  console.log("DEBUG: langPrompt =", langPrompt);

  const langKey = langPrompt.language === "English" ? "en" : "ko";

  const t = i18n[langKey];

  const answers = await inquirer.prompt([
    {
      type: "list",
      name: "preset",
      message: t.setupType,
      choices: [t.setupManual, t.setupKaliPreset],
    },
    {
      type: "list",
      name: "provider",
      message: t.provider,
      choices: ["virtualbox", "vmware", "docker"],
      when: (answers: any) => answers.preset === t.setupManual,
    },
    {
      type: "list",
      name: "os",
      message: t.osVagrant,
      choices: [
        "ubuntu/focal64",
        "ubuntu/jammy64",
        "debian/11",
        "centos/8",
        "kalilinux/rolling",
      ],
      when: (answers: any) =>
        answers.preset === t.setupManual && answers.provider !== "docker",
    },
    {
      type: "list",
      name: "os",
      message: t.osDocker,
      choices: [
        "ubuntu:latest",
        "debian:latest",
        "alpine:latest",
        "node:latest",
        "python:latest",
      ],
      when: (answers: any) =>
        answers.preset === t.setupManual && answers.provider === "docker",
    },
    {
      type: "number",
      name: "ram",
      message: t.ram,
      default: 2048,
    },
    {
      type: "number",
      name: "cpu",
      message: t.cpu,
      default: 2,
    },
    {
      type: "number",
      name: "disk",
      message: t.disk,
      default: 20,
      when: (answers: any) =>
        answers.preset === t.setupKaliPreset || answers.provider !== "docker", // Docker usually handles disk separately
    },
    {
      type: "list",
      name: "network",
      message: t.network,
      choices: ["nat", "bridged", "host-only"],
      default: "nat",
      when: (answers: any) =>
        answers.preset === t.setupManual && answers.provider !== "docker",
    },
    {
      type: "list",
      name: "platform",
      message: t.platform,
      choices: ["macOS", "Linux", "Windows"],
    },
  ]);

  // Handle defaults for Kali preset
  if (answers.preset === t.setupKaliPreset) {
    answers.provider = "virtualbox";
    answers.os = "kalilinux/rolling";
    answers.network = "kali-preset";
  }

  const presetKey = answers.preset === t.setupManual ? "manual" : "kali";
  answers.preset = presetKey;

  return {language: langKey, ...answers} as VmConfig;
}
