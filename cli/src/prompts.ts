import inquirer from "inquirer";

export interface VmConfig {
  provider: "virtualbox" | "vmware" | "docker";
  os: string;
  ram: number;
  cpu: number;
  disk: number;
  network: "nat" | "bridged" | "host-only";
  platform: "macOS" | "Linux" | "Windows";
}

export async function promptUserForConfig(): Promise<VmConfig> {
  const answers = await inquirer.prompt([
    {
      type: "list",
      name: "provider",
      message: "Which VM provider would you like to use?",
      choices: ["virtualbox", "vmware", "docker"],
    },
    {
      type: "list",
      name: "os",
      message: "Which Operating System would you like to provision?",
      choices: [
        "ubuntu/focal64",
        "ubuntu/jammy64",
        "debian/11",
        "centos/8",
        "kalilinux/rolling",
      ],
      when: (answers: any) => answers.provider !== "docker",
    },
    {
      type: "list",
      name: "os",
      message: "Which Docker image would you like to use?",
      choices: [
        "ubuntu:latest",
        "debian:latest",
        "alpine:latest",
        "node:latest",
        "python:latest",
      ],
      when: (answers: any) => answers.provider === "docker",
    },
    {
      type: "number",
      name: "ram",
      message: "How much RAM (in MB) to allocate?",
      default: 2048,
    },
    {
      type: "number",
      name: "cpu",
      message: "How many CPU cores to allocate?",
      default: 2,
    },
    {
      type: "number",
      name: "disk",
      message: "How much Disk Space (in GB) to allocate?",
      default: 20,
      when: (answers: any) => answers.provider !== "docker", // Docker usually handles disk separately
    },
    {
      type: "list",
      name: "network",
      message: "What network type?",
      choices: ["nat", "bridged", "host-only"],
      default: "nat",
      when: (answers: any) => answers.provider !== "docker",
    },
    {
      type: "list",
      name: "platform",
      message: "Which host platform will run this VM?",
      choices: ["macOS", "Linux", "Windows"],
    },
  ]);

  return answers as VmConfig;
}
