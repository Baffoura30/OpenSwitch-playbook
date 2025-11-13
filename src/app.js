// --- XLSX File Handling (from original file) ---
function filledCell(cell) {
  return cell !== '' && cell != null;
}
function loadFileData(filename) {
if (gk_isXlsx && gk_xlsxFileLookup[filename]) {
    try {
        var workbook = XLSX.read(gk_fileData[filename], { type: 'base64' });
        var firstSheetName = workbook.SheetNames[0];
        var worksheet = workbook.Sheets[firstSheetName];

        var jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1, blankrows: false, defval: '' })
        var filteredData = jsonData.filter(row => row.some(filledCell));

        var headerRowIndex = filteredData.findIndex((row, index) =>
          row.filter(filledCell).length >= filteredData[index + 1]?.filter(filledCell).length
        );
      
        if (headerRowIndex === -1 || headerRowIndex > 25) {
          headerRowIndex = 0;
        }

        // Convert filtered JSON back to CSV
        var csv = XLSX.utils.aoa_to_sheet(filteredData.slice(headerRowIndex)); 
        csv = XLSX.utils.sheet_to_csv(csv, { header: 1 });
        return csv;
    } catch (e) {
        console.error(e);
        return "";
    }
}
return gk_fileData[filename] || "";
}

// --- CORE PLAYBOOK LOGIC ---
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) { document.documentElement.classList.add('dark'); }
    buildSymptoms();
    buildBaudTable();
    buildRegexTable();
    loadState();
});
function buildSymptoms() {
    const container = document.getElementById('symptoms-container');
    container.innerHTML = '';
    symptoms.forEach(symptom => {
        const details = document.createElement('details');
        details.className = 'troubleshooting-section';
        details.id = symptom.id;
        const summary = document.createElement('summary');
        summary.textContent = symptom.title;
        const contentDiv = document.createElement('div');
        contentDiv.className = 'card troubleshooting-content p-4 border border-t-0 rounded-b-md border-gray-200 dark:border-gray-700';
        const table = document.createElement('table');
        table.className = 'w-full text-sm text-left';
        table.innerHTML = `<thead><tr><th class="p-2 w-1/12"></th><th class="p-2 w-3/12">What to Do</th><th class="p-2 w-4/12">How to Do It</th><th class="p-2 w-4/12">What It Means</th></tr></thead>`;
        const tbody = document.createElement('tbody');
        symptom.steps.forEach(step => {
            const tr = document.createElement('tr');
            tr.className = 'border-b dark:border-gray-700';
            let meansHTML = step.means.map(mean => `<div class="cue"><span class="cue-icon">${mean.cue}</span><span>${mean.text}</span></div>`).join('');
            let howHTML = buildHowToCell(step.how, step.id);
            tr.innerHTML = `<td class="p-2 align-top"><input type="checkbox" id="${step.id}" onchange="saveState(this)" class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"></td><td class="p-2 align-top">${step.do}</td><td class="p-2 align-top">${howHTML}</td><td class="p-2 align-top">${meansHTML}</td>`;
            tbody.appendChild(tr);
        });
        const notesHTML = `<div class="mt-4"><label for="notes-${symptom.id}" class="block text-sm font-medium mb-1">Troubleshooting Notes:</label><textarea id="notes-${symptom.id}" onkeyup="saveState(this)" class="w-full p-2 border rounded-md bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500" rows="3" placeholder="Log your findings here..."></textarea></div>`;
        table.appendChild(tbody);
        contentDiv.appendChild(table);
        contentDiv.insertAdjacentHTML('beforeend', notesHTML);
        details.appendChild(summary);
        details.appendChild(contentDiv);
        container.appendChild(details);
    });
}
function buildHowToCell(how, stepId) {
    if (how.generic) return how.generic;
    const vendors = ['cisco_ios', 'juniper_junos', 'arista_eos'];
    const tabs = vendors.map((v, i) => `<button class="vendor-tab ${i === 0 ? 'active' : ''}" onclick="switchTab(event, '${stepId}', '${v}')" aria-label="Show commands for ${v.replace(/_/g, ' ').toUpperCase()}">${v.replace(/_/g, ' ').toUpperCase()}</button>`).join('');
    const content = vendors.map((v, i) => `<div id="${stepId}-${v}" class="vendor-content mt-2 ${i === 0 ? 'active' : ''}">${how[v]}<button class="copy-btn" onclick="copyToClipboard(this.previousElementSibling, this)">Copy</button><span class="copied-feedback"></span></div>`).join('');
    return `<div class="flex space-x-1">${tabs}</div>${content}`;
}
function switchTab(event, stepId, vendor) {
    const parent = event.target.closest('.p-2');
    parent.querySelectorAll('.vendor-tab').forEach(t => t.classList.remove('active'));
    event.target.classList.add('active');
    parent.querySelectorAll('.vendor-content').forEach(c => c.classList.remove('active'));
    document.getElementById(`${stepId}-${vendor}`).classList.add('active');
    localStorage.setItem(`vendor-tab-${stepId}`, vendor);
}
function saveState(element) {
    const state = JSON.parse(localStorage.getItem('playbookState')) || {};
    state[element.id] = element.type === 'checkbox' ? element.checked : element.value;
    localStorage.setItem('playbookState', JSON.stringify(state));
}
function loadState() {
    const state = JSON.parse(localStorage.getItem('playbookState')) || {};
    Object.keys(state).forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            if (element.type === 'checkbox') element.checked = state[id];
            else if (element.type === 'textarea') element.value = state[id];
        }
    });
    symptoms.forEach(symptom => {
        symptom.steps.forEach(step => {
            const vendor = localStorage.getItem(`vendor-tab-${step.id}`) || 'cisco_ios';
            const tabButton = document.querySelector(`button.vendor-tab[onclick*="switchTab(event, '${step.id}', '${vendor}'"]`);
            if (tabButton) tabButton.click();
        });
    });
}
function generateReport() {
    const state = JSON.parse(localStorage.getItem('playbookState')) || {};
    let report = `OpenSwitch Playbook Troubleshooting Report\nGenerated: ${new Date().toLocaleString()}\n\n`;
    symptoms.forEach(symptom => {
        report += `${symptom.title}\n${'='.repeat(symptom.title.length)}\nChecked Steps:\n`;
        const checkedSteps = Array.from(document.querySelectorAll(`#${symptom.id} input[type="checkbox"]:checked`));
        report += checkedSteps.length > 0 ? checkedSteps.map(step => `- ${step.closest('tr').querySelector('td:nth-child(2)').textContent}`).join('\n') + '\n' : "- No steps completed.\n";
        report += `\nNotes:\n${state[`notes-${symptom.id}`] || "No notes taken."}\n\n`;
    });
    return report;
}
function showExportModal() {
    const report = generateReport();
    document.getElementById('export-content').textContent = report;
    document.getElementById('export-modal').classList.remove('hidden');
}
function hideExportModal() { document.getElementById('export-modal').classList.add('hidden'); }
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}
function copyToClipboard(element, button) {
    const textToCopy = element.textContent;
    const feedback = button.nextElementSibling;
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(textToCopy).then(() => {
            button.textContent = 'Copied!';
            feedback.style.opacity = '1';
            showToast('Command copied to clipboard!');
            setTimeout(() => {
                button.textContent = 'Copy';
                feedback.style.opacity = '0';
            }, 2000);
        }).catch(err => {
            try {
                const textarea = document.createElement('textarea');
                textarea.value = textToCopy;
                textarea.style.position = 'fixed';
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand('copy');
                document.body.removeChild(textarea);
                button.textContent = 'Copied!';
                feedback.style.opacity = '1';
                showToast('Command copied to clipboard!');
                setTimeout(() => {
                    button.textContent = 'Copy';
                    feedback.style.opacity = '0';
                }, 2000);
            } catch (fallbackErr) {
                alert('Failed to copy text to clipboard. Please copy manually.');
                console.error('Clipboard copy failed:', err, fallbackErr);
            }
        });
    } else {
        try {
            const textarea = document.createElement('textarea');
            textarea.value = textToCopy;
            textarea.style.position = 'fixed';
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            button.textContent = 'Copied!';
            feedback.style.opacity = '1';
            showToast('Command copied to clipboard!');
            setTimeout(() => {
                button.textContent = 'Copy';
                feedback.style.opacity = '0';
            }, 2000);
        } catch (err) {
            alert('Failed to copy text to clipboard. Please copy manually.');
            console.error('Clipboard copy failed:', err);
        }
    }
}
function copyExportContent() {
    const text = generateReport();
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
            showToast('Report copied to clipboard!');
        }).catch(err => {
            try {
                const textarea = document.createElement('textarea');
                textarea.value = text;
                textarea.style.position = 'fixed';
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand('copy');
                document.body.removeChild(textarea);
                showToast('Report copied to clipboard!');
            } catch (fallbackErr) {
                alert('Failed to copy report to clipboard. Please copy manually from the modal.');
                console.error('Clipboard copy failed:', err, fallbackErr);
            }
        });
    } else {
        try {
            const textarea = document.createElement('textarea');
            textarea.value = text;
            textarea.style.position = 'fixed';
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            showToast('Report copied to clipboard!');
        } catch (err) {
            alert('Failed to copy report to clipboard. Please copy manually from the modal.');
            console.error('Clipboard copy failed:', err);
        }
    }
}
function downloadTxt() {
    const text = generateReport();
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Troubleshooting_Report_${new Date().toISOString().replace(/[:.]/g, '-')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Report downloaded as TXT!');
}
function printPdf() {
    const state = JSON.parse(localStorage.getItem('playbookState')) || {};
    const printDiv = document.getElementById('print-report');
    printDiv.innerHTML = '';
    let reportHTML = `<h1>OpenSwitch Playbook Troubleshooting Report</h1><p>Generated: ${new Date().toLocaleString()}</p>`;
    symptoms.forEach(symptom => {
        reportHTML += `<div class="print-section"><h3>${symptom.title}</h3><h4>Checked Steps:</h4>`;
        const checkedSteps = Array.from(document.querySelectorAll(`#${symptom.id} input[type="checkbox"]:checked`));
        reportHTML += checkedSteps.length > 0 ? `<ul>${checkedSteps.map(step => `<li>${step.closest('tr').querySelector('td:nth-child(2)').textContent}</li>`).join('')}</ul>` : '<p>No steps completed.</p>';
        reportHTML += `<h4>Notes:</h4><p>${state[`notes-${symptom.id}`] || "No notes taken."}</p></div>`;
    });
    printDiv.innerHTML = reportHTML;
    window.print();
}
function buildBaudTable() { 
    // Data is now in playbook-data.js
    const container = document.getElementById('baud-rate-table-container'); 
    const table = document.createElement('table'); 
    table.className = 'w-full text-sm'; 
    table.innerHTML = `<thead><tr class="border-b dark:border-gray-700"><th class="p-2 text-left">Baud Rate (bps)</th><th class="p-2 text-left">Common Use</th></tr></thead>`; 
    const tbody = document.createElement('tbody'); 
    baudRates.forEach(item => { 
        tbody.innerHTML += `<tr><td class="p-2">${item.rate}</td><td class="p-2">${item.use}</td></tr>`; 
    }); 
    table.appendChild(tbody); 
    container.appendChild(table); 
}
function buildRegexTable() {
    // Data is now in playbook-data.js
    const container = document.getElementById('regex-table-container');
    const table = document.createElement('table');
    table.className = 'w-full text-sm';
    table.innerHTML = `<thead><tr class="border-b dark:border-gray-700"><th class="p-2 text-left">Goal</th><th class="p-2 text-left">Regex Pattern</th><th class="p-2 text-left">Example Usage (Cisco)</th></tr></thead>`;
    const tbody = document.createElement('tbody');
    regexes.forEach(item => {
        tbody.innerHTML += `<tr><td class="p-2">${item.goal}</td><td class="p-2">${item.pattern}</td><td class="p-2">${item.example}</td></tr>`;
    });
    table.appendChild(tbody);
    container.appendChild(table);
}
// --- UTILITY FUNCTIONS ---
function toggleTheme() { 
    const html = document.documentElement; 
    html.classList.toggle('dark'); 
    localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light'); 
}
function filterPlaybook() { 
    const searchTerm = document.getElementById('search-input').value.toLowerCase(); 
    document.querySelectorAll('.troubleshooting-section').forEach(section => { 
        const content = section.textContent.toLowerCase(); 
        section.style.display = content.includes(searchTerm) ? '' : 'none'; 
    }); 
}
