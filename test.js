const searchEvents = () => {
    showPreloader(); // Show preloader while searching

    // Get search inputs
    const titleQuery = $searchTitle.val().trim().toLowerCase();
    const placeQuery = $searchPlace.val().trim().toLowerCase();

    // Filter events by title and place
    const filteredResults = events.filter((event) => {
        const matchesTitle = event.name.toLowerCase().includes(titleQuery);
        const matchesPlace = event.venue?.address?.toLowerCase().includes(placeQuery) || event.venue?.name?.toLowerCase().includes(placeQuery);
        return matchesTitle || matchesPlace;
    });

    // Simulate a delay to mimic loading
    setTimeout(() => {
        hidePreloader(); // Hide preloader
        if (titleQuery || placeQuery) {
            $eventContainer.hide(); // Hide initial events when searching
            displaySearchResults(filteredResults, ${titleQuery} ${placeQuery}.trim()); // Display results
        } else {
            resetToInitialState(); // Reset to initial state if search is cleared
        }
    }, typingDelay);
    };