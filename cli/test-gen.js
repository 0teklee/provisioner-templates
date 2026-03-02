import { generateConfig } from './dist/generator.js';

async function test() {
  await generateConfig({
    language: "en",
    preset: "kali",
    provider: "virtualbox",
    os: "kalilinux/rolling",
    ram: 4096,
    cpu: 4,
    disk: 50,
    network: "kali-preset",
    platform: "macOS"
  });
}
test();
