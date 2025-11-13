# OpenSwitch Troubleshooting Playbook

[![License: CC BY-SA 4.0](https://img.shields.io/badge/License-CC%20BY--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-sa/4.0/)  
[![Contributions Welcome](https://img.shields.io/badge/Contributions-Welcome-brightgreen.svg)](CONTRIBUTING.md)  
[![GitHub stars](https://img.shields.io/github/stars/Baffoura30/openswitch-playbook.svg?style=social)](https://github.com/Baffoura30/openswitch-playbook/stargazers)  
[![GitHub forks](https://img.shields.io/github/forks/Baffoura30/openswitch-playbook.svg?style=social)](https://github.com/Baffoura30/openswitch-playbook/network/members)  

**Version 1.1** Author: **Baffour Dokyi Ampaw** License: CC BY-SA 4.0  

---

An open-source, vendor-agnostic playbook for troubleshooting network switches, designed for network technicians and engineers. This project is a **living document**, evolving through community contributions to provide practical, field-ready guidance.

## How to Use (For End-Users)
1.  **Download the Playbook**:
    * Go to the [**Releases Page**](https://github.com/Baffoura30/openswitch-playbook/releases) on GitHub.
    * Download the single `openswitch-playbook.html` file from the latest release.
2.  **Open in Browser**:
    * Open the downloaded file in any modern browser (e.g., Chrome, Firefox, Safari) on your laptop or tablet.
    * No internet connection is required.
3.  **Troubleshoot**:
    * Use the "Immediate Triage" flowchart for initial steps.
    * Expand symptom sections based on your issue.
    * Use the search bar to find keywords (e.g., "PoE", "baud rate").
    * Check off steps and take notes directly in the playbook. Your progress is saved in your browser.
    * Use the "Export Session" button to generate a TXT or PDF report of your work.

## What’s Inside the Playbook (v1.1)

The **Open Switch Playbook** is a single, offline HTML file offering:
- **Immediate Triage**: A flowchart for the first 5 minutes of troubleshooting.
- **Symptom-Based Troubleshooting**:
  - Gibberish or Garbled Console Output
  - No Connectivity (Single User/Device)
  - No Connectivity (Entire Subnet/VLAN)
  - Intermittent Connectivity / Slow Performance
  - PoE Device Not Powering On
  - Switch is Unresponsive (No Console/SSH)
- **Reference Materials**:
  - Recommended Tools (Physical & Software)
  - Standard Baud Rates
  - Regex Cheatsheet for CLI filtering
  - Key Vendor-Neutral Commands
- **Interactive Features**:
  - Searchable content.
  - Dark Mode.
  - State saving (checkboxes and notes are saved to local storage).
  - Session report export to TXT, Clipboard, or PDF.
  - Copy-to-clipboard buttons for all commands.
  - Vendor-specific tabs (Cisco, Juniper, Arista).

## Contributing
We welcome contributions! Please see the **[CONTRIBUTING.md](CONTRIBUTING.md)** file for detailed guidelines on how to add new symptoms, fix bugs, or improve the playbook.

The project is structured to be easy to contribute to:
-   All content (symptoms, data) is in `src/playbook-data.js`.
-   All application logic is in `src/app.js`.
-   A build script (`build.js`) combines everything into the final `openswitch-playbook.html` file.

## License
Released under **Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)**.  
You may use, share, and adapt this work with attribution and the same license. See `LICENSE` for details.
