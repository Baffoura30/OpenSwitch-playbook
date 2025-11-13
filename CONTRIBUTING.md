# Contributing to Open Switch Troubleshooting Playbook

Thank you for your interest in contributing! This project is a community-driven resource, and we welcome contributions to make this playbook more comprehensive and field-ready.

## How to Contribute (The Developer Workflow)

The project is set up to be easy to edit. You **do not** edit the `openswitch-playbook.html` file directly. Instead, you edit the source files in the `/src` folder, and then run a script to "build" the final file.

### Prerequisites
You will need [Node.js](https://nodejs.org/) installed on your computer to run the build script.

### Step-by-Step Guide

1.  **Fork the Repository**:
    * Click the “Fork” button on the [GitHub repository](https://github.com/Baffoura30/open-switch-playbook) to create your own copy.

2.  **Clone Your Fork**:
    ```bash
    git clone [https://github.com/YOUR_USERNAME/openswitch-playbook.git](https://github.com/YOUR_USERNAME/openswitch-playbook.git)
    cd openswitch-playbook
    ```

3.  **Create a Branch**:
    * Create a new branch for your changes:
        ```bash
        git checkout -b your-branch-name
        ```
    * Use a descriptive branch name, e.g., `add-stp-troubleshooting` or `fix-copy-button-bug`.

4.  **Make Your Changes**:
    * **To add new symptoms or reference data:** Edit `src/playbook-data.js`. This is where all the playbook content lives. Just copy an existing `symptom` object and modify it.
    * **To change styles:** Edit `src/style.css`.
    * **To fix app behavior (e.g., search, copy):** Edit `src/app.js`.
    * **To change the HTML structure:** Edit `index.template.html`.

5.  **Build the Final File**:
    * After making your changes, run the build script from the main project folder:
        ```bash
        node build.js
        ```
    * This will regenerate the `openswitch-playbook.html` file with your changes included.

6.  **Test Your Changes**:
    * Open the **newly-generated** `openswitch-playbook.html` file in your browser to make sure everything works as expected.

7.  **Commit Changes**:
    * Stage and commit **all** the files you changed, *including* the generated `openswitch-playbook.html`.
        ```bash
        git add .
        git commit -m "Your descriptive commit message"
        ```

8.  **Push to Your Fork**:
    ```bash
    git push origin your-branch-name
    ```

9.  **Submit a Pull Request**:
    * Go to the main repository and submit a pull request with a clear description of your changes.

## Contribution Types

-   **New Troubleshooting Flows**: Add steps for issues like Spanning Tree (STP), stacking, QoS, or multicast. Edit `src/playbook-data.js`.
-   **More Vendor Commands**: Add command examples for other vendors (e.g., HP/Aruba, Extreme) to the `how` object in `src/playbook-data.js`.
-   **Bug Fixes**: Correct issues in the app's functionality (e.g., search, command copying). Edit `src/app.js`.
-   **Documentation Improvements**: Enhance this file or the `README.md`.

## Guidelines
-   **Keep It Offline-Compatible**: Do not add any external URLs for scripts, images, or stylesheets (e.g., no CDN links).
-   **Test Changes**: Verify that `openswitch-playbook.html` renders correctly and functions after you run the build.
-   **Follow the License**: All contributions must comply with the [CC BY-SA 4.0 license](https://creativecommons.org/licenses/by-sa/4.0/).
-   **Be Descriptive**: Use clear commit messages and PR descriptions.

## Code of Conduct
-   Be respectful and inclusive in all interactions.
-   Provide constructive feedback.

## License
By contributing, you agree that your contributions will be licensed under the **Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)**.
