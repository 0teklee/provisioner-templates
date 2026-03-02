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
      message: "Select language / 언어 선택 (en/ko) ",
      choices: [
        {name: "English", value: "en"},
        {name: "한국어 (Korean)", value: "ko"},
      ],
    },
  ]);

  const langKey = langPrompt.language as Language;

  const t = i18n[langKey];

  const answers = await inquirer.prompt([
    {
      type: "list",
      name: "preset",
      message: t.setupType,
      choices: [
        {name: t.setupManual, value: "manual"},
        {name: t.setupKaliPreset, value: "kali"},
      ],
    },
    {
      type: "list",
      name: "provider",
      message: t.provider,
      choices: ["virtualbox", "vmware", "docker"],
      when: (answers: any) => answers.preset === "manual",
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
        answers.preset === "manual" && answers.provider !== "docker",
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
        answers.preset === "manual" && answers.provider === "docker",
    },
    {
      type: "list",
      name: "ram",
      message: t.ram,
      choices: [
        {name: "1024 MB", value: 1024},
        {name: "2048 MB", value: 2048},
        {name: "4096 MB", value: 4096},
        {name: "8192 MB", value: 8192},
        {name: "16384 MB", value: 16384},
      ],
      default: 2048,
    },
    {
      type: "list",
      name: "cpu",
      message: t.cpu,
      choices: [
        {name: "1 Core", value: 1},
        {name: "2 Cores", value: 2},
        {name: "4 Cores", value: 4},
        {name: "8 Cores", value: 8},
        {name: "16 Cores", value: 16},
      ],
      default: 2,
    },
    {
      type: "list",
      name: "disk",
      message: t.disk,
      choices: [
        {name: "10 GB", value: 10},
        {name: "20 GB", value: 20},
        {name: "40 GB", value: 40},
        {name: "80 GB", value: 80},
        {name: "160 GB", value: 160},
      ],
      default: 20,
      when: (answers: any) =>
        answers.preset === "kali" || answers.provider !== "docker", // Docker usually handles disk separately
    },
    {
      type: "list",
      name: "network",
      message: t.network,
      choices: ["nat", "bridged", "host-only"],
      default: "nat",
      when: (answers: any) =>
        answers.preset === "manual" && answers.provider !== "docker",
    },
    {
      type: "list",
      name: "platform",
      message: t.platform,
      choices: ["macOS", "Linux", "Windows"],
    },
  ]);

  // Handle defaults for Kali preset
  if (answers.preset === "kali") {
    answers.provider = "virtualbox";
    answers.os = "kalilinux/rolling";
    answers.network = "kali-preset";
  }

  return {language: langKey, ...answers} as VmConfig;
}
