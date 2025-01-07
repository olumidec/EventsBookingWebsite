$(document).ready(function () {
    console.log("jQuery is initialized");

    const $eventContainer = $('.eventInformation');
    const $searchTitle = $('#searchTitle');
    const $searchPlace = $('#searchPlace');
    const $switch = $('#switch');
    const $fontGrow = $('.fontgrow');
    const $fontDec = $('#fontdec');
    const $fontReset = $('#font-reset');
    const $modifiableContent = $('.main-content, .mainHeader, .Header, .eventInformation');
    const DARK_MODE_CLASS = 'dark';
    const DARK_MODE_KEY = 'darkModeEnabled';
    let fontSizeScale = 100;
    const typingDelay = 300;
    let events = [];
    

    // Load Events
    function fetchEvents() {
        $.getJSON('data.json', function (data) {
            events = data;
            displayInitialEvents(events);
        }).fail(function (error) {
            console.error('Error fetching events:', error);
        });
    }

    function displayInitialEvents(events) {
        $eventContainer.empty();
        events.forEach(event => {
            const $eventCard = createEventCard(event);
            $eventContainer.append($eventCard);
        });
    }

    function createEventCard(event) {
        return $(`
            <div class="event-card">
                <img src="${event.imageUrl}" alt="${event.title}" class="event-image">
                <div class="event-details">
                    <h2>${event.title}</h2>
                    <p class="event-date"><strong>Date:</strong> ${event.date}</p>
                    <p class="event-location"><strong>Location:</strong> ${event.location.venue}, ${event.location.address.city}</p>
                    <p class="event-preview">${event.description.slice(0, 100)}...</p>
                    <a href="event-details.html?id=${event.id}" class="event-link">Read More</a>
                </div>
            </div>
        `);
    }

    // Search Functionality
    const searchEvents = () => {
        const titleQuery = $searchTitle.val().trim().toLowerCase();
        const placeQuery = $searchPlace.val().trim().toLowerCase();

        const filteredResults = events.filter(event => {
            const matchesTitle = event.title.toLowerCase().includes(titleQuery);
            const matchesPlace = event.location?.address?.city?.toLowerCase().includes(placeQuery) ||
                event.location?.venue?.toLowerCase().includes(placeQuery);
            return matchesTitle || matchesPlace;
        });

        setTimeout(() => {
            if (titleQuery || placeQuery) {
                $eventContainer.hide();
                displaySearchResults(filteredResults, titleQuery, placeQuery);
            } else {
                resetToInitialState();
            }
        }, typingDelay);
    };

    function displaySearchResults(results, titleQuery, placeQuery) {
        $eventContainer.empty();
        if (results.length > 0) {
            results.forEach(event => {
                const $eventCard = createEventCard(event);
                $eventContainer.append($eventCard);
            });
        } else {
            $eventContainer.html(`<p>No events found for "${titleQuery} ${placeQuery}".</p>`);
        }
        $eventContainer.show();
    }

    function resetToInitialState() {
        $eventContainer.show();
        displayInitialEvents(events);
    }

    // Dark Mode Functionality
    function setDarkMode(enabled) {
        if (enabled) {
            $('body').addClass(DARK_MODE_CLASS);
        } else {
            $('body').removeClass(DARK_MODE_CLASS);
        }
        localStorage.setItem(DARK_MODE_KEY, enabled ? 'true' : 'false');
    }

    const isDarkModeEnabled = localStorage.getItem(DARK_MODE_KEY) === 'true';
    $switch.prop('checked', isDarkModeEnabled);
    setDarkMode(isDarkModeEnabled);

    $switch.on('change', () => {
        setDarkMode($switch.prop('checked'));
    });

    // Font Size Management
    function applyFontSize() {
        $('html').css('font-size', `${fontSizeScale}%`);
        localStorage.setItem('fontsizeScale', fontSizeScale);
    }

    function increaseFontSize() {
        if (fontSizeScale < 150) {
            fontSizeScale += 10;
            applyFontSize();
        }
    }

    function decreaseFontSize() {
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

    $fontGrow.on('click', increaseFontSize);
    $fontDec.on('click', decreaseFontSize);
    $fontReset.on('click', resetFontSize);


    // Load user preferences
    loadPreferences();

    // Attach Search Event Listeners
    $('#searchTitle, #searchPlace').on('input', searchEvents);

    // Initialize
    fetchEvents();
});
