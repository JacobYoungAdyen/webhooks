
async function fetchWebhooks() {
    const response = await fetch('/api/webhooks');
    const webhooks = await response.json();
    displayWebhooks(webhooks);
}

function displayWebhooks(webhooks) {
    const tableBody = document.getElementById('webhookBody');
    tableBody.innerHTML = '';

    webhooks.forEach(webhook => {
        const row = document.createElement('tr');

        row.innerHTML = `
                    <td>${webhook.notificationItem.eventCode || 'No Type'}</td>

                    <td>
    <button onclick="toggleJSONDisplay(this)">Show Data</button>
    <button class="copy-button" onclick="copyToClipboard(this)">Copy JSON</button>
    <div class="json-container">${JSON.stringify(webhook.notificationItem, null, 2) || 'No Data'}</div>
</td>


                    <td>${new Date(webhook.receivedAt).toLocaleString()}</td>
                `;
        tableBody.appendChild(row);
    });
}

function toggleJSONDisplay(button) {
    const container = button.nextElementSibling;
    const isVisible = container.style.display === 'block';

    container.style.display = isVisible ? 'none' : 'block';
    button.textContent = isVisible ? 'Show Data' : 'Hide Data';
}

function copyToClipboard(button) {
    const jsonContainer = button.nextElementSibling;
    const jsonData = jsonContainer.innerText; // Get the text from the json-container

    // Use the Clipboard API to copy the text
    navigator.clipboard.writeText(jsonData)
        .then(() => {
            // Provide feedback that the text has been copied
            button.textContent = 'Copied!';
            setTimeout(() => {
                button.textContent = 'Copy JSON'; // Reset button text after a short period
            }, 2000);
        })
        .catch(err => {
            console.error('Failed to copy: ', err);
        });
}


function formatJSON(json) {
    const jsonStr = JSON.stringify(json, null, 2);
    return jsonStr.replace(
        /"(.*?)"(\s*:\s*)?("(.*?)"|true|false|null|\d+(\.\d+)?)/g,
        (match, key, separator, value) => {
            let result = `<span class="key">"${key}"</span>${separator || ''}`;

            if (/^".*"$/.test(value)) {
                result += `<span class="string">${value}</span>`;
            } else if (value === 'true' || value === 'false') {
                result += `<span class="boolean">${value}</span>`;
            } else if (value === 'null') {
                result += `<span class="null">${value}</span>`;
            } else {
                result += `<span class="number">${value}</span>`;
            }
            return result;
        }
    );
}

async function filterWebhooks() {
    const typeFilter = document.getElementById('type').value;
    const dataFilter = document.getElementById('data').value;

    const response = await fetch(`/api/webhooks?type=${typeFilter}&data=${dataFilter}`);
    const filteredWebhooks = await response.json();
    displayWebhooks(filteredWebhooks);
}

fetchWebhooks();
