# CLI requirements

- The purpose of this CLI is to automate the process of provisioning a new virtual machine.
- this cli will be used to set up or to start up a virtual machine.
- cli will ask questions to the user to determine the configuration of the virtual machine.
  - it will ask which VM provider to use (virtualbox, vmware, etc.)
  - it will ask questions about the operating system, the amount of RAM, the amount of CPU, the amount of disk space, the amount of network interfaces, etc.
  - cli will ask on which platform the VM will be provisioned (macOS, Linux, Windows, etc.) or Docker container.
- cli will use the answers to generate a configuration file for the virtual machine.
- cli will use the configuration file to provision the virtual machine.
- End result will be a running VM or Docker container with the specified configuration.
  - including `Vagrantfile` with configured settings.

## Necessary tools

- vagrant
- VM provider (virtualbox, vmware, etc.)
- package manager (homebrew/linuxbrew, apt, yum, etc.)
- docker
