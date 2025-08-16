# OpenSwitch Troubleshooting Playbook

[![License: CC BY-SA 4.0](https://img.shields.io/badge/License-CC%20BY--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-sa/4.0/)  
[![Contributions Welcome](https://img.shields.io/badge/Contributions-Welcome-brightgreen.svg)](CONTRIBUTING.md)  
[![GitHub stars](https://img.shields.io/github/stars/Baffoura30/openswitch-playbook.svg?style=social)](https://github.com/Baffoura30/openswitch-playbook/stargazers)  
[![GitHub forks](https://img.shields.io/github/forks/Baffoura30/openswitch-playbook.svg?style=social)](https://github.com/Baffoura30/openswitch-playbook/network/members)  

**Version 1.0 – Initial Release**  
Author: **Baffour Dokyi Ampaw**  
License: CC BY-SA 4.0  

---

An open-source, vendor-agnostic playbook for troubleshooting network switches, designed for network technicians and engineers. This project is a **living document**, evolving through community contributions to provide practical, field-ready guidance.

## Contents
- Interactive HTML playbook (`OpenSwitch-Playbook.html`)
- Reference materials (baud rates, tools, key commands)
- Contribution guidelines (`CONTRIBUTING.md`)

## What’s Inside the Playbook

The **Open Switch Playbook v1.0** is a browser-based HTML tool offering:
- **Immediate Triage**: A step-by-step flowchart for the first 5 minutes of troubleshooting (e.g., check physical layer, link lights).
- **Symptom-Based Troubleshooting**: Guides for common issues:
  - Gibberish or garbled console output
  - No connectivity
  - Unresponsive switch
- **Reference Materials**:
  - Recommended tools (e.g., cable tester, PuTTY)
  - Standard baud rates for console connections
  - Key vendor-neutral commands (e.g., `show interface status`)
- **Interactive Features**:
  - Searchable content for quick symptom/command lookup
  - Copy-to-clipboard functionality for commands, with offline compatibility
- **Offline Use**: Fully functional without internet access, ideal for field work

## How to Use
1. **Open the Playbook**:
   - Download `playbook.html` from the repository.
   - Open it in any modern browser (e.g., Chrome, Firefox) using `file://` (no internet required).
2. **Navigate**:
   - Use the triage flowchart for initial steps.
   - Expand symptom sections to follow troubleshooting steps.
   - Search for keywords (e.g., “baud rate”) to filter content.
3. **Copy Commands**:
   - Click “Copy” buttons next to commands to copy them to your clipboard for use in a terminal.
4. **Print for Field Use**:
   - Print the HTML page or save as PDF for a portable reference.

## Project Structure
- `OpenSwitch-Playbook.html`: The main interactive HTML playbook.
- `CONTRIBUTING.md`: Guidelines for contributing to the project.
- `LICENSE`: Creative Commons Attribution-ShareAlike 4.0 license text.
- `.gitignore`: Excludes temporary and system files to keep the repository clean.

## Contributing
We welcome contributions to enhance the playbook! Ideas include:
- Adding new troubleshooting flows (e.g., STP, PoE, QoS)
- Expanding vendor-neutral CLI examples
- Sharing real-world fault scenarios and fixes

To contribute:
1. Fork the repository.
2. Clone your fork and create a new branch:
   ```bash
   git clone https://github.com/YOUR_USERNAME/open-switch-playbook.git
   cd open-switch-playbook
   git checkout -b your-branch-name
   ```
3. Make changes, commit, and push:
   ```bash
   git add .
   git commit -m "Describe your changes"
   git push origin your-branch-name
   ```
4. Submit a pull request to `Baffoura30/openswitch-playbook`.

See `CONTRIBUTING.md` for detailed guidelines.

## License
Released under **Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)**.  
You may use, share, and adapt this work with attribution and the same license. See `LICENSE` for details.

## GitHub
[Repository](https://github.com/Baffoura30/openswitch-playbook/)

## Contributors
Thanks to everyone improving the Open Switch Playbook!

<a href="https://github.com/Baffoura30/openswitch-playbook/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=Baffoura30/openswitch-playbook" />
</a>

Want to be listed? See the [Contributing Guide](CONTRIBUTING.md).
