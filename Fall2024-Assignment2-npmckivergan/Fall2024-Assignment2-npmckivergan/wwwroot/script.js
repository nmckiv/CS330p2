// Replace these with your actual Bing Search API URL and key
const apiUrl = 'https://api.bing.microsoft.com/v7.0/search'; // Use the actual endpoint URL with "/v7.0/search"
const apiKey = '5cfc2670fc954d5486d138575de24ef8'; // Replace with your actual API key

// Function to perform the search using the Bing Search API
function apiSearch(query) {
    $.ajax({
        url: apiUrl,
        type: 'GET',
        data: { q: query }, // Bing search query
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Ocp-Apim-Subscription-Key', apiKey);
        },
        success: function (data) {
            // Handle successful API response and display the results
            displayResults(data);
        },
        error: function (err) {
            console.log('Error: ', err);
            alert('Something went wrong with the API request!');
        }
    });
}

// Function to display search results
function displayResults(data) {
    let resultsDiv = $('#searchResults');
    resultsDiv.empty(); // Clear any previous results
    if (data.webPages && data.webPages.value.length > 0) {
        data.webPages.value.forEach(function (result) {
            let resultHtml = `<p><a href="${result.url}" target="_blank">${result.name}</a><br>${result.snippet}</p>`;
            resultsDiv.append(resultHtml);
        });
    } else {
        resultsDiv.append('<p>No results found</p>');
    }
    resultsDiv.css('visibility', 'visible'); // Show the results div
}

// Search button click handler
$('#searchButton').click(function () {
    let query = $('#query').val(); // Get search query from input box
    if (query) {
        apiSearch(query); // Call the search function
    } else {
        alert('Please enter a search query');
    }
});

// Function to toggle the background image using Unsplash API
$(document).click(function (event) {
    if (!$(event.target).closest('#searchButton, #timeButton').length) { // Ignore clicks on buttons
        let randomImageUrl = `https://api.unsplash.com/photos/random?query=puppy&client_id=${unsplashAccessKey}`;
        $.get(randomImageUrl, function (data) {
            $('body').css('background-image', `url(${data.urls.regular})`);
        });
    }
});

// Function to get the current time and display in a jQueryUI dialog
$('#timeButton').click(function () {
    let now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    minutes = minutes < 10 ? '0' + minutes : minutes; // Add leading zero to minutes
    let timeString = hours + ':' + minutes;

    $('#time').html(`<p>Current time: ${timeString}</p>`);
    $('#time').css('visibility', 'visible');
    $('#time').dialog({ title: 'Current Time' }); // Display time in a jQueryUI dialog box
});
