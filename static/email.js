//btoa(unescape(encodeURIComponent(str))))
//atob(escape(decodeURIComponent(str))))

// Find all the elements on the page that use class="m-protected"
var allElements = document.getElementsByClassName('m-protected');

// Loop through all the elements, and update them
for (var i = 0; i < allElements.length; i++) {
    updateAnchor(allElements[i]);
}

function updateAnchor(el) {
    // fetch the hex-encoded string from the title property
    var encoded = el.getAttribute('title');

    // replace the title
    el.title = 'Mail';

    // decode the email address and remove the added string 'abridge'.
    var decoded = atob(encoded).substring(7);

    // Set the link to be a "mailto:" link
    el.href = 'mailto:' + decoded;
}
