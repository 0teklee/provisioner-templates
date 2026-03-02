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

The CLI will walk you through a series of prompts asking for:

1. **Provider**: Vagrant (`virtualbox` or `vmware`) or `docker`.
2. **OS/Image**: Preconfigured images for Vagrant (Ubuntu, Debian, CentOS, Kali) or Docker images.
3. **Hardware**: Allocation for RAM, CPU cores, and Disk.
4. **Networking**: Configuration preferences (NAT, Bridged, Host-only).
5. **Platform**: Target host platform.

After collecting your configuration:

- The tool will automatically generate a `Vagrantfile` or `Dockerfile` in the current working directory.
- Finally, it will ask if you want to execute the provisioning (`vagrant up` or `docker build`) immediately.

## Customizing Templates

The generated text files are driven by `ejs` templates found in `src/templates/`. You can edit `Vagrantfile.ejs` or `Dockerfile.ejs` to add further customization and then rebuild the application using `npm run build`.
