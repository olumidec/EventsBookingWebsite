$(document).ready(function () {
    console.log("jQuery is working");

    // CAPTCHA functionality
    const $captchaDisplay = $('.code_display input');
    const $captchaReload = $('.reload_btn');
    const $captchaInput = $('.code_input input');
    const $verifyButton = $('#verify-code-btn');
    const $statusMessage = $('.status_message');
    const $submitButton = $('.jobaction'); // Submit button for the form

    // Disable the submit button initially
    $submitButton.prop('disabled', true);

    // Function to generate a random CAPTCHA
    function generateCaptcha() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let captcha = '';
        for (let i = 0; i < 6; i++) {
            captcha += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return captcha;
    }

    // Function to refresh the CAPTCHA
    function refreshCaptcha() {
        const newCaptcha = generateCaptcha();
        $captchaDisplay.val(newCaptcha);
        $statusMessage.text('').removeClass('error success');
    }

    // Initialize CAPTCHA on page load
    refreshCaptcha();

    // Reload CAPTCHA on click
    $captchaReload.on('click', function () {
        refreshCaptcha();
    });

    // CAPTCHA verification on button click
    $verifyButton.on('click', function () {
        const enteredCaptcha = $captchaInput.val().trim();
        const displayedCaptcha = $captchaDisplay.val().trim();
        if (enteredCaptcha === displayedCaptcha) {
            $statusMessage.text('CAPTCHA validation successful!').addClass('success').removeClass('error');
            // Enable the submit button after successful CAPTCHA verification
            $submitButton.prop('disabled', false);
        } else {
            $statusMessage.text('Invalid CAPTCHA. Please try again.').addClass('error').removeClass('success');
        }
    });

    // Fetch and display events using AJAX
    const $eventContainer = $('.right-images');
    
    $.getJSON('data.json', function (events) {
        // Ensure we're displaying only events 1, 2, 3, and 4
        for (let i = 0; i < 4; i++) {
            const event = events[i]; // Get each event one by one

            const eventCard = `
                <section>
                    <a href="event-details.html?id=${event.id}">
                        <img src="${event.imageUrl}" alt="${event.title}">
                    </a>
                    <p>${event.title}</p>
                </section>`;
            
            $eventContainer.append(eventCard); // Append to the container
        }
    }).fail(function (error) {
        console.error('Error fetching events:', error);
    });

    // Dark mode toggle functionality
    const $switch = $('#switch');
    const DARK_MODE_CLASS = 'dark';
    const DARK_MODE_KEY = 'darkModeEnabled';

    // Function to enable or disable dark mode
    function setDarkMode(enabled) {
        $('body').toggleClass(DARK_MODE_CLASS, enabled);
        localStorage.setItem(DARK_MODE_KEY, enabled);
    }

    const isDarkModeEnabled = localStorage.getItem(DARK_MODE_KEY) === 'true';
    $switch.prop('checked', isDarkModeEnabled);
    setDarkMode(isDarkModeEnabled);

    // Change dark mode when switch is toggled
    $switch.on('change', () => setDarkMode($switch.prop('checked')));

    // Contact form validation
    $('#contactForm').on('submit', function (e) {
        e.preventDefault();
        const namePattern = /^[a-zA-Z\s]+$/;
        const phonePattern = /^07[0-9]{9}$/;

        const $nameInput = $('#name');
        const $emailInput = $('#email');
        const $phoneInput = $('#phone');

        // Validate the name
        if (!namePattern.test($nameInput.val())) {
            alert('Name should only contain letters and spaces.');
            return;
        }
        // Validate the email
        if (!$emailInput[0].validity.valid) {
            alert('Please enter a valid email address.');
            return;
        }
        // Validate the phone number
        if (!phonePattern.test($phoneInput.val())) {
            alert('Phone number must be 11 digits and start with 07.');
            return;
        }

        alert('Form submitted successfully!');
    });

    // Font size controls
    let fontSizeScale = 100;

    // Apply the font size scale
    function applyFontSize() {
        $('html').css('font-size', `${fontSizeScale}%`);
        localStorage.setItem('fontsizeScale', fontSizeScale);
    }

    $('.fontgrow').on('click', () => {
        if (fontSizeScale < 150) fontSizeScale += 10;
        applyFontSize();
    });

    $('#fontdec').on('click', () => {
        if (fontSizeScale > 50) fontSizeScale -= 10;
        applyFontSize();
    });

    $('#font-reset').on('click', () => {
        fontSizeScale = 100;
        applyFontSize();
    });

    const savedFontSize = localStorage.getItem('fontsizeScale');
    if (savedFontSize) fontSizeScale = parseInt(savedFontSize, 10);
    applyFontSize();
});
