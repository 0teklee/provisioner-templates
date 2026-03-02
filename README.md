# Provisioner CLI Tool

An interactive CLI tool to automate the provisioning of virtual machines and Docker containers.

## Prerequisites

- Node.js (v16+)
- TypeScript
- Vagrant and VirtualBox/VMware (for VM provisioning)
- Docker (for Container provisioning)

## Installation

```bash
cd cli
npm install
npm run build
```

## Usage

You can start the interactive CLI using the `start` script:

```bash
npm start init
```

The CLI supports multi-language interfaces (English and Korean) and provides two main setup flows:

### 1. Kali Linux Security VM (Preset)

A streamlined deployment tailored for penetration testing and security labs based on `kalilinux/rolling`.

- **Pre-configured Networks:**
  - `NAT` for internet access.
  - `Host-only` for direct communication with the host machine (e.g., using local **Ollama** models).
  - `Internal Network` (`kalilab`) for isolated communication with other lab tools like **OpenClaw**.
- **Plugins:** Automatically sets up `vagrant-vbguest` for VirtualBox additions.

### 2. Manual Configuration

The CLI will walk you through a series of prompts asking for:

1. **Provider**: Vagrant (`virtualbox` or `vmware`) or `docker`.
2. **OS/Image**: Preconfigured images for Vagrant (Ubuntu, Debian, CentOS, Kali) or Docker images.
3. **Hardware**: Allocation for RAM, CPU cores, and Disk.
4. **Networking**: Configuration preferences (NAT, Bridged, Host-only).
5. **Platform**: Target host platform.

After collecting your configuration:

- The tool will automatically generate a `Vagrantfile` or `Dockerfile` in the current working directory.
- Finally, it will ask if you want to execute the provisioning (`vagrant up` or `docker build`) immediately.

The generated text files are driven by `ejs` templates found in `src/templates/`. You can edit `Vagrantfile.ejs` or `Dockerfile.ejs` to add further customization and then rebuild the application using `npm run build`.

## License

This project is licensed for **Non-Commercial Use Only**.
You are free to use, modify, and distribute the software for personal, educational, and open-source purposes. However, using this software for commercial purposes (including selling, integrating into commercial products, or using it to provide commercial services) is strictly prohibited. See the `LICENSE` file for more details.
