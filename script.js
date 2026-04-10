document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. Main Search Bar Functionality ---
    const searchInput = document.querySelector('input[placeholder="Search for a procedure, notice, or legal topic..."]');
    const searchBtn = document.querySelector('.search-btn');

    function handleSearch() {
        const query = searchInput.value.trim();
        if(query) {
            // Change button to a loading spinner for a cool UX effect
            searchBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
            
            // Simulate backend delay (1 second)
            setTimeout(() => {
                alert(`Action: Sending "${query}" to the backend.\n\n(During the hackathon, connect this to your Python API!)`);
                searchBtn.innerHTML = '<i class="fa-solid fa-magnifying-glass"></i>'; // Reset button
            }, 1000);
        } else {
            alert("Please enter a procedure or upload a document first.");
        }
    }

    if(searchBtn && searchInput) {
        searchBtn.addEventListener('click', handleSearch);
        
        // Allow user to hit "Enter" on their keyboard to search
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') handleSearch();
        });
    }

    // --- 2. Make Suggestion Pills Clickable ---
    const pills = document.querySelectorAll('.suggestion-pill');
    pills.forEach(pill => {
        pill.addEventListener('click', () => {
            searchInput.value = pill.innerText; // Put pill text into search bar
            handleSearch(); // Automatically trigger search
        });
    });

    // --- 3. "Ask NagrikNetra" AI Form Submission ---
    const askTextarea = document.getElementById('ask-textarea');
    const askBtn = document.getElementById('ask-btn');

    if(askBtn && askTextarea) {
        askBtn.addEventListener('click', () => {
            const question = askTextarea.value.trim();
            if(question) {
                const originalText = askBtn.innerHTML;
                // Show loading state
                askBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> <span>Analyzing...</span>';
                
                // Simulate sending to your Gemini AI backend
                setTimeout(() => {
                    alert(`Sending to AI Engine:\n"${question}"\n\n(Wait for JSON response from backend)`);
                    askBtn.innerHTML = originalText; // Reset button
                    askTextarea.value = ''; // Clear textarea after sending
                }, 1500);
            } else {
                alert("Please describe your issue in the box first.");
            }
        });
    }

    // --- 4. Language Selector Interaction ---
    // Makes the language bubbles highlight when clicked
    const langContainers = document.querySelectorAll('.language-grid > div');
    langContainers.forEach(container => {
        container.addEventListener('click', function() {
            // Remove active styling from all bubbles
            langContainers.forEach(l => {
                const iconBox = l.querySelector('.lang-icon');
                if(iconBox) iconBox.classList.remove('ring-2', 'ring-blue-600', 'ring-offset-2');
            });
            
            // Add active styling to the clicked bubble
            const iconBox = this.querySelector('.lang-icon');
            const spanText = this.querySelector('span').innerText;
            if(iconBox && !spanText.includes("More")) {
                iconBox.classList.add('ring-2', 'ring-blue-600', 'ring-offset-2');
            }
        });
    });

    // --- 5. Trigger CSS Animations on Load ---
    const sections = document.querySelectorAll('.animate-section');
    sections.forEach((sec, index) => {
        sec.classList.add('fade-in');
        sec.style.animationDelay = `${index * 0.15}s`; // Stagger the animation timing
    });

});