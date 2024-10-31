
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
                        <div class="json-container">${formatJSON(webhook.notificationItem)}</div>
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
