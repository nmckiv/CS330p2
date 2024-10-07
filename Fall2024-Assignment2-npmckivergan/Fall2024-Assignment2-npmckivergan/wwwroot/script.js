// API stuff
const apiUrl = 'https://api.bing.microsoft.com/v7.0/search?';
const apiKey = '5cfc2670fc954d5486d138575de24ef8';
const unsplashAccessKey = 'C7cTfj8gueMHbhdxwf90TkSjq7-u-7liwGHxjyeCINA';

// Bing API search function
//function apiSearch(query, lucky = false) {
//    $.ajax({
//        url: apiUrl,
//        type: 'GET',
//        data: { q: query },
//        beforeSend: function (xhr) {
//            xhr.setRequestHeader('Ocp-Apim-Subscription-Key', apiKey);
//        },
//        success: function (data) {
//            // Redirect if I'm Feeling Lucky was hit
//            if (lucky) {
//                if (data.webPages && data.webPages.value.length > 0) {
//                    window.open(data.webPages.value[0].url, '_blank');
//                } else {
//                    alert('No results found for your query.');
//                }
//            } else {
//                // Display results normally
//                displayResults(data);
//            }
//        },
//    });
//}

function apiSearch(callback) {
    var params = {
        'q': $('#query').val(),
        'count': 50,
        'offset': 0,
        'mkt': 'en-us'
    };

    $.ajax({
        url: 'https://api.bing.microsoft.com/v7.0/search?' + $.param(params),
        type: 'GET',
        headers: {
            'Ocp-Apim-Subscription-Key': apiKey
        }
    })
        .done(function (data) {
            if (callback) {
                callback(data);
            }
            else {
                var len = data.webPages.value.length;
                var results = '';
                for (i = 0; i < len; i++) {
                    results += `<p><a href="${data.webPages.value[i].url}">${data.webPages.value[i].name}</a>: ${data.webPages.value[i].snippet}</p>`;
                }

                $('#searchResults').html(results);
                $('#searchResults').show();
            }
        })
        .fail(function () {
            alert('error');
        });
}

//Search button click handler
$('#searchButton').on('click', function () {
    apiSearch();
    document.getElementById("searchResults").style.visibility = 'visible';
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
    apiSearch(function (data) {
        window.location.href = data.webPages.value[0].url;
    });
});

// Function to change the background image to a random puppy
function changeBackgroundImage() {
    let randomImageUrl = `https://api.unsplash.com/photos/random?query=puppy&client_id=${unsplashAccessKey}`;
    $.get(randomImageUrl, function (data) {
        $('body').css('background-image', `url(${data.urls.regular})`);
    });
}

// Change background image on header click
$(document).click(function (event) {
    if ($(event.target).closest('#searchEngineName').length) { // Ignore clicks on buttons
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
