// Wait for the DOM to load before executing
document.addEventListener('DOMContentLoaded', function () {

    // Get the form and elements
    const form = document.getElementById('urlForm');
    const urlInput = document.getElementById('urlInput');
    const htmlOutput = document.getElementById('htmlOutput');

    // Add an event listener to the form submission
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        const url = urlInput.value.trim();

        if (url === "") {
            alert("Please enter a valid URL.");
            return;
        }

        fetchHTML(url);
    });

    // Function to fetch HTML content from the given URL
    function fetchHTML(url) {
        // Clear previous output
        htmlOutput.value = "Fetching HTML...";

        // Use Fetch API to request the HTML of the given URL
        fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`)
            .then(response => response.json())
            .then(data => {
                if (data && data.contents) {
                    // Display the fetched HTML inside the textarea
                    htmlOutput.value = data.contents;
                } else {
                    htmlOutput.value = "Failed to fetch the HTML content. Please try again.";
                }
            })
            .catch(error => {
                console.error("Error fetching HTML:", error);
                htmlOutput.value = "An error occurred while fetching the content.";
            });
    }
});
