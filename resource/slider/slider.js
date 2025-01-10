document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    let isTransitioning = false;
    
    // Show first slide
    slides[0].classList.add('active');
    
    function nextSlide() {
        if (isTransitioning) return;
        isTransitioning = true;
        
        // Start fade out
        slides[currentSlide].classList.add('fade-out');
        slides[currentSlide].classList.remove('active');
        
        // Wait for fade out to complete
        setTimeout(() => {
            slides[currentSlide].classList.remove('fade-out');
            
            // Move to next slide
            currentSlide = (currentSlide + 1) % slides.length;
            
            // Show new slide
            slides[currentSlide].classList.add('active');
            
            // Reset transition flag
            setTimeout(() => {
                isTransitioning = false;
            }, 1200); // Match the CSS transition duration
        }, 1200); // Match the CSS transition duration
    }
    
    // Change slide every 5 seconds
    setInterval(nextSlide, 5000);
});
