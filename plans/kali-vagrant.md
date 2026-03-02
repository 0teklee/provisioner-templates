# kali linux vagrant

## Purpose

- to create a kali linux virtual machine using vagrant.
- the virtual machine will be configured with the following settings:
  - operating system: kali linux
  - amount of RAM: set by user
  - amount of CPU: set by user
  - amount of disk space: set by user
  - amount of network interfaces: set by user
  - network interfaces: 1 NAT, 1 Host-only (default) or user defined.
- Designed for kali-linux + internal network + secured host-only network for using OpenClaw or similar tools.
  - user can use ollama local model in the host machine.
  - user can access the kali linux vm from the host machine using the host-only network interface.
  - user can access the internet from the kali linux vm using the NAT interface.
  - user can access the internal network from the kali linux vm using the internal network interface.
- Language options provided in `cli` tool:
  - English
  - Korean

## Configuration

- It will use the `cli` tool set up in `plans/cli.md` to provision the virtual machine.
- It will use the `kali-linux` box from `https://app.vagrantup.com/boxes/search?utf8=%E2%9C%93&q=kali-linux`.
- It will use the `virtualbox` provider.
- It will use the `vagrant-vbguest` plugin to ensure the guest additions are up to date.

## Necessary tools

- vagrant
- virtualbox
