$(document).ready(function() {
    const $header = $('.Header');
    const $headerName = $('.HeaderName');
    const $subHeader = $('h3');
    const $button = $('.Button');

    // Ensure elements are visible before animations
    $header.css({ opacity: 0, transform: 'translateY(-100px)' });
    $headerName.css({ opacity: 0, transform: 'scale(0.8)' });
    $subHeader.css({ opacity: 0, transform: 'translateY(20px)' });
    $button.css({ opacity: 0, transform: 'translateY(50px)' });

    // Main Header Animation
    $header.animate(
        {
            opacity: 1,
            translateY: '0'
        },
        {
            duration: 1500,
            easing: 'swing',
            complete: function() {
                $header.css({ transform: '' }); // Clear transform after animation
            }
        }
    );

    // Header Name Animation
    setTimeout(function() {
        $headerName.animate(
            {
                opacity: 1,
                transform: 'scale(1)'
            },
            {
                duration: 1500,
                easing: 'swing',
                complete: function() {
                    $headerName.css({ transform: '' }); // Clear transform after animation
                }
            }
        );
    }, 500); // Reduced delay for smoother sequential appearance

    // Sub-Header Animation
    setTimeout(function() {
        $subHeader.animate(
            {
                opacity: 1,
                translateY: '0'
            },
            {
                duration: 1500,
                easing: 'swing',
                complete: function() {
                    $subHeader.css({ transform: '' }); // Clear transform after animation
                }
            }
        );
    }, 1000); // Added a slight gap for staggered animation

    // Button Animation
    setTimeout(function() {
        $button.animate(
            {
                opacity: 1,
                translateY: '0'
            },
            {
                duration: 1500,
                easing: 'swing',
                complete: function() {
                    $button.css({ transform: '' }); // Clear transform after animation
                }
            }
        );
    }, 1500); // Final staggered delay for a clear sequence
});
