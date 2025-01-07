$(document).ready(function() {
    console.log("Hey there, ready to go")
    const $eventDetailsContainer = $('#event-details');
    const $bookNowButton = $('#book-now');
    

    // Extract event ID from the query string
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = urlParams.get('id');

    if (!eventId) {
        $eventDetailsContainer.html('<h2>No event selected!</h2>');
        return;
    }

    // Fetch event data from JSON file
    $.getJSON('data.json', function(events) {
        const event = events.find(e => e.id === eventId);

        if (!event) {
            $eventDetailsContainer.html('<h2>Event not found!</h2>');
            return;
        }

        // Display event details
        $eventDetailsContainer.html(`
            <h1 class="event-header">${event.title}</h1>
            <img src="${event.imageUrl}" alt="${event.title}" class="event-image">
            <div class = "Info">
                <p class= "description">${event.description}</p>
                <p class= "event-date"><strong>Date:</strong> ${event.date}</p>
                <p class= "event-time"><strong>Time:</strong> ${event.time.start} - ${event.time.end} (${event.time.timezone})</p>
                <p class= "event-location"><strong>Location:</strong> ${event.location.venue}, ${event.location.address.street}, ${event.location.address.city}</p>
                <p class= "event-organizer"><strong>Organizer:</strong> ${event.organizer.name}</p>
                <p class= "event-contact"><strong>Contact:</strong> ${event.organizer.contactEmail} | ${event.organizer.phone}</p>
                <p class= "event-price"><strong>Price:</strong> ${event.ticketInfo.price} ${event.ticketInfo.currency}</p>
                <p class= "event-availability"><strong>Availability:</strong> ${event.ticketInfo.Availability}</p>
                <button id="book-now" style="display: ${event.ticketInfo.Availability === 'Available' ? 'block' : 'none'};">Book Now</button>
            </div>
        `);
        console.log(`Event availability: ${event.ticketInfo.Availability}`);
        // Show "Book Now" button if tickets are available
        if (event.ticketInfo.Availability === 'Available') {
            console.log('Tickets available, showing button');
            $bookNowButton.show().off('click').on('click', function() {
                alert(`Booking confirmed for ${event.title}!`);
            });
        } else {
            console.log('Tickets not available, button not shown');
        }
    }).fail(function(error) {
        $eventDetailsContainer.html('<h2>Error loading event details.</h2>');
        console.error(error);
    });

    // Dark Mode
    const $switch = $('#switch');
    const DARK_MODE_CLASS = 'dark';
    const DARK_MODE_KEY = 'darkModeEnabled';

    // Function to toggle dark mode
    function setDarkMode(enabled) {
        if (enabled) {
            $('body').addClass(DARK_MODE_CLASS);
        } else {
            $('body').removeClass(DARK_MODE_CLASS);
        }
        localStorage.setItem(DARK_MODE_KEY, enabled ? 'true' : 'false');
    }

    // Load dark mode state from localStorage
    const isDarkModeEnabled = localStorage.getItem(DARK_MODE_KEY) === 'true';
    $switch.prop('checked', isDarkModeEnabled);
    setDarkMode(isDarkModeEnabled);

    // Event listener for switch
    $switch.on('change', () => {
        setDarkMode($switch.prop('checked'));
    });


    // Font size management
    const $fontGrow = $('.fontgrow');
    const $fontDec = $('#fontdec');
    const $fontReset = $('#font-reset');
    const $paragraph = $('.Time');

    // Display current date
    $paragraph.text("Today's Date: " + new Date().toDateString());

    // Default font size scale
    let fontSizeScale = 100;

    function applyFontSize() {
        $('html').css('font-size', `${fontSizeScale}%`);
        localStorage.setItem('fontsizeScale', fontSizeScale); // Save to localStorage
    }

    function increaseSize() {
        if (fontSizeScale < 150) {
            fontSizeScale += 10;
            applyFontSize();
        }
    }

    function decreaseSize() {
        if (fontSizeScale > 50) {
            fontSizeScale -= 10;
            applyFontSize();
        }
    }

    function resetFontSize() {
        fontSizeScale = 100;
        applyFontSize();
    }

    function loadPreferences() {
        const savedFontSizeScale = localStorage.getItem('fontsizeScale');
        if (savedFontSizeScale) {
            fontSizeScale = parseInt(savedFontSizeScale, 10);
            applyFontSize();
        }
    }

    // Event listeners
    $fontGrow.on('click', increaseSize);
    $fontDec.on('click', decreaseSize);
    $fontReset.on('click', resetFontSize);

    // Load user preferences on page load
    loadPreferences();
});
