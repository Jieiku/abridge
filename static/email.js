(function() {
    // Find all the elements on the page that use class="m-protected"
    var allElements = document.getElementsByClassName('m-protected');

    // Loop through all the elements, and update them
    for (var i = 0; i < allElements.length; i++) {
        // fetch the hex-encoded string from the href property
        var encoded = allElements[i].getAttribute('href');

        // decode the email address
        var decoded = atob(encoded.substring(1));

        // Set the link to be a "mailto:" link
        allElements[i].href = 'mailto:' + decoded;
    }
})();
