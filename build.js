const fs = require('fs');
const path = require('path');

console.log("Starting build...");

// Define paths
const srcPath = path.join(__dirname, 'src');
const templatePath = path.join(__dirname, 'index.template.html');
const outputPath = path.join(__dirname, 'openswitch-playbook.html');

try {
    // 1. Read all the source files
    const cssContent = fs.readFileSync(path.join(srcPath, 'style.css'), 'utf8');
    const dataContent = fs.readFileSync(path.join(srcPath, 'playbook-data.js'), 'utf8');
    const appContent = fs.readFileSync(path.join(srcPath, 'app.js'), 'utf8');
    const template = fs.readFileSync(templatePath, 'utf8');

    // 2. Replace the placeholders
    let finalHtml = template.replace('/* {{PLACEHOLDER_CSS}} */', cssContent);
    finalHtml = finalHtml.replace('// {{PLACEHOLDER_DATA_JS}}', dataContent);
    finalHtml = finalHtml.replace('// {{PLACEHOLDER_APP_JS}}', appContent);

    // 3. Write the final, single file
    fs.writeFileSync(outputPath, finalHtml);

    console.log("Build complete!");
    console.log(`Successfully created: ${outputPath}`);

} catch (err) {
    console.error("Error during build process:", err);
}
