// Add hover effect to header text
document.addEventListener('DOMContentLoaded', function() {
    const headerText = document.querySelector('.header-text h1');
    const text = 'DexOnClouds';
    headerText.innerHTML = ''; // Clear existing text
    
    // Create spans for each letter
    const letters = text.split('').map((letter, index) => {
        const span = document.createElement('span');
        span.textContent = letter;
        span.className = 'animated-letter';
        
        // Assign different directions
        if (index % 3 === 0) {
            span.classList.add('from-left');
        } else if (index % 3 === 1) {
            span.classList.add('from-top');
        } else {
            span.classList.add('from-right');
        }
        
        headerText.appendChild(span);
        return span;
    });

    function animateLetters() {
        // Reset all letters (they'll animate out)
        letters.forEach(span => {
            span.classList.remove('visible');
        });

        // Wait 1 second before bringing letters back in
        setTimeout(() => {
            // Animate letters one by one with smoother timing
            letters.forEach((span, index) => {
                setTimeout(() => {
                    span.classList.add('visible');
                }, index * 150); // 150ms delay between each letter for smoother flow
            });
        }, 1000); // 1 second delay when header is empty
    }

    // Initial animation
    setTimeout(animateLetters, 500);

    // Repeat animation every 7 seconds
    setInterval(animateLetters, 7000);
});
