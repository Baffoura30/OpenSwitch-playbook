# Contributing to Open Switch Troubleshooting Playbook

Thank you for your interest in contributing to the **Open Switch Troubleshooting Playbook**! This project is a community-driven, open-source resource for network engineers and technicians to troubleshoot network switches efficiently. We welcome contributions to make this playbook a comprehensive, field-ready tool.

## How to Contribute

We encourage contributions of all kinds, from adding new troubleshooting flows to improving documentation. Follow these steps to get started:

1. **Fork the Repository**:
   - Click the “Fork” button on the [GitHub repository](https://github.com/Baffoura30/open-switch-playbook) to create your own copy.

2. **Clone Your Fork**:
   - Clone the repository to your local machine:
     ```bash
     git clone https://github.com/YOUR_USERNAME/openswitch-playbook.git
     cd openswitch-playbook
     ```

3. **Create a Branch**:
   - Create a new branch for your changes:
     ```bash
     git checkout -b your-branch-name
     ```
   - Use a descriptive branch name, e.g., `add-poe-troubleshooting` or `fix-typo-readme`.

4. **Make Changes**:
   - Edit files (e.g., `openswitch-playbook.html`, `README.md`) or add new content.
   - Ensure changes maintain offline compatibility (no external dependencies).
   - Test your changes locally by opening `openswitch-playbook.html` in a browser.

5. **Commit Changes**:
   - Stage and commit your changes with a clear message:
     ```bash
     git add .
     git commit -m "Describe your changes, e.g., Add PoE troubleshooting steps"
     ```

6. **Push to Your Fork**:
   - Push your branch to your GitHub fork:
     ```bash
     git push origin your-branch-name
     ```

7. **Submit a Pull Request**:
   - Go to the [main repository](https://github.com/Baffoura30/openswitch-playbook).
   - Click “New Pull Request” and select your branch.
   - Provide a detailed description of your changes and why they’re valuable.
   - Submit the PR for review.

## Contribution Types

We welcome the following contributions to enhance the playbook:
- **New Troubleshooting Flows**: Add steps for issues like Spanning Tree Protocol (STP), Power over Ethernet (PoE), stacking, QoS, or multicast problems.
- **Vendor-Neutral CLI Examples**: Expand the reference commands in `openswitch-playbook.html` with additional vendor-agnostic commands.
- **Real-World Scenarios**: Share practical fault scenarios and their resolutions to help others learn.
- **Documentation Improvements**: Enhance `README.md`, add diagrams, or improve clarity in `openswitch-playbook.html`.
- **Bug Fixes**: Correct typos, broken links, or issues in the HTML playbook’s functionality (e.g., search, command copying).
- **Accessibility Enhancements**: Improve ARIA labels or usability for field technicians.

Check the [Issues tab](https://github.com/Baffoura30/openswitch-playbook/issues) for tasks tagged “help wanted” or “good first issue” to get started.

## Guidelines
- **Keep It Offline-Compatible**: Ensure changes work without internet access (e.g., no external CSS/JS libraries).
- **Follow the License**: All contributions must comply with the [CC BY-SA 4.0 license](https://creativecommons.org/licenses/by-sa/4.0/). Include attribution if adapting existing work.
- **Test Changes**: Verify that `openswitch-playbook.html` renders correctly in browsers (e.g., Chrome, Firefox) and that commands copy correctly offline.
- **Be Descriptive**: Use clear commit messages and PR descriptions to explain your changes.
- **Respect the Community**: Follow our code of conduct (below) to maintain a collaborative environment.

## Code of Conduct
- Be respectful and inclusive in all interactions.
- Provide constructive feedback and avoid personal attacks.
- Report any inappropriate behavior to the project maintainer (Baffoura30).

## License
By contributing, you agree that your contributions will be licensed under the **Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)**. See the `LICENSE` file for details.

## Questions?
If you have questions or need help, open an issue on the [GitHub repository](https://github.com/Baffoura30/open-switch-playbook/issues) or contact the maintainer (Baffoura30).

Thank you for helping make the Open Switch Playbook a valuable resource for network professionals!
