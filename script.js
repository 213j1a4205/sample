// File: script.js

let websites = [];

document.addEventListener('DOMContentLoaded', () => {
    fetch('/websites')
        .then(response => response.json())
        .then(data => {
            websites = data; // Store the data for filtering
            displayWebsites(websites);
        })
        .catch(error => console.error('Error fetching websites:', error));
});

function displayWebsites(data) {
    const websitesList = document.getElementById('websites-list');
    websitesList.innerHTML = ''; // Clear existing content
    data.forEach(website => {
        const li = document.createElement('li');
        li.innerHTML = `<a href="${website.url}" target="_blank">${website.name}</a> (${website.category})`;
        websitesList.appendChild(li);
    });
}

function filterSites() {
    const selectedCategory = document.getElementById('user-type').value;
    let filteredWebsites;
    if (selectedCategory === 'others') {
        filteredWebsites = websites.filter(website => !['.in', '.gov.in', '.org.in'].includes(website.category.toLowerCase()));
    } else {
        filteredWebsites = websites.filter(website => website.category.toLowerCase() === selectedCategory);
    }
    displayWebsites(filteredWebsites);
}
