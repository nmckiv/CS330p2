// API stuff
const apiUrl = 'https://api.bing.microsoft.com/v7.0/search';
const apiKey = '5cfc2670fc954d5486d138575de24ef8';
const unsplashAccessKey = 'C7cTfj8gueMHbhdxwf90TkSjq7-u-7liwGHxjyeCINA';

// Bing API search function
function apiSearch(query, lucky = false) {
    $.ajax({
        url: apiUrl,
        type: 'GET',
        data: { q: query }, 
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Ocp-Apim-Subscription-Key', apiKey);
        },
        success: function (data) {
            // Redirect if I'm Feeling Lucky was hit
            if (lucky) {
                if (data.webPages && data.webPages.value.length > 0) {
                    window.open(data.webPages.value[0].url, '_blank');
                } else {
                    alert('No results found for your query.');
                }
            } else {
                // Display results normally
                displayResults(data);
            }
        },
    });
}

// Function to display search results
function displayResults(data) {
    let resultsDiv = $('#searchResults');
    resultsDiv.empty();
    if (data.webPages && data.webPages.value.length > 0) {
        data.webPages.value.forEach(function (result) {
            let resultHtml = `<p><a href="${result.url}" target="_blank">${result.name}</a><br>${result.snippet}</p>`;
            resultsDiv.append(resultHtml);
        });
    } else {
        resultsDiv.append('<p>No results found</p>');
    }
    resultsDiv.css('visibility', 'visible');
}

// Search button click handler
$('#searchButton').click(function () {
    let query = $('#query').val();
    if (query) {
        apiSearch(query);
    } else {
        alert('Please enter a search query');
    }
});

// Search on Enter key
$('#query').keydown(function (event) {
    if (event.key === "Enter" || event.keyCode === 13) {
        event.preventDefault();
        $('#searchButton').click();
    }
});

// "I'm Feeling Lucky" button click handler
$('#luckyButton').click(function () {
    let query = $('#query').val();
    if (query) {
        apiSearch(query, true);
    } else {
        alert('Please enter a search query');
    }
});

// Function to change the background image to a random puppy
function changeBackgroundImage() {
    let randomImageUrl = `https://api.unsplash.com/photos/random?query=puppy&client_id=${unsplashAccessKey}`;
    $.get(randomImageUrl, function (data) {
        $('body').css('background-image', `url(${data.urls.regular})`);
    });
}

// Change background image on document click, except on buttons
$(document).click(function (event) {
    if (!$(event.target).closest('#searchButton, #timeButton, #luckyButton, #query, #searchResults').length) { // Ignore clicks on buttons
        changeBackgroundImage();
        $('#searchResults').hide();
    }
});

// Function to get the current time with dialog box
$('#timeButton').click(function () {
    let now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    minutes = minutes < 10 ? '0' + minutes : minutes;
    let timeString = hours + ':' + minutes;

    $('#time').html(`<p>Current time: ${timeString}</p>`);
    $('#time').css('visibility', 'visible');
    $('#time').dialog({ title: 'Current Time' });
});
