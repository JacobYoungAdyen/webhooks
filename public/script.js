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
                <button class="copy-button" onclick="copyToClipboard(this)" style="margin-left: 10px;">Copy JSON</button>
                <div class="json-container" style="display: none;">${JSON.stringify(webhook.notificationItem, null, 2) || 'No Data'}</div>
            </td>
            <td>${new Date(webhook.receivedAt).toLocaleString()}</td>
        `;
        tableBody.appendChild(row);
    });
}

function toggleJSONDisplay(button) {
    const container = button.nextElementSibling.nextElementSibling; // Select the json-container
    const isVisible = container.style.display === 'block';

    container.style.display = isVisible ? 'none' : 'block';
    button.textContent = isVisible ? 'Show Data' : 'Hide Data';
}

function copyToClipboard(button) {
    const jsonContainer = button.nextElementSibling.nextElementSibling; // Select the json-container correctly
    console.log(jsonContainer)
    const jsonData = jsonContainer.textContent; // Get the text content from the json-container

    // Use the Clipboard API to copy the text
    navigator.clipboard.writeText(jsonData)
        .then(() => {
            button.textContent = 'Copied!';
            setTimeout(() => {
                button.textContent = 'Copy JSON'; // Reset button text after a short period
            }, 2000);
        })
        .catch(err => {
            console.error('Failed to copy: ', err);
        });
}

async function filterWebhooks() {
    const typeFilter = document.getElementById('type').value;
    const dataFilter = document.getElementById('data').value;

    const response = await fetch(`/api/webhooks?type=${typeFilter}&data=${dataFilter}`);
    const filteredWebhooks = await response.json();
    displayWebhooks(filteredWebhooks);
}

fetchWebhooks();
