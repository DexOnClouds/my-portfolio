document.addEventListener('DOMContentLoaded', function() {
    const headerText = document.querySelector('.header-text h1');
    const TEXT = 'DexOnClouds';
    let isAnimating = false;
    
    // Clear and initialize
    headerText.innerHTML = '';
    const letters = [];
    
    // Create and append all spans
    for(let i = 0; i < TEXT.length; i++) {
        const span = document.createElement('span');
        span.textContent = TEXT[i];
        span.className = 'letter-span';
        headerText.appendChild(span);
        letters.push(span);
    }
    
    function animateIn() {
        if(isAnimating) return;
        isAnimating = true;
        
        letters.forEach((span, index) => {
            setTimeout(() => {
                span.classList.add('show');
                
                span.addEventListener('transitionend', (e) => {
                    if (e.propertyName === 'transform' && span.classList.contains('show')) {
                        span.classList.add('bounce');
                    }
                }, { once: true });
                
                // Last letter animation completed
                if(index === letters.length - 1) {
                    setTimeout(() => {
                        isAnimating = false;
                    }, 1000);
                }
            }, index * 150);
        });
    }
    
    function animateOut() {
        if(isAnimating) return;
        isAnimating = true;
        
        letters.forEach((span, index) => {
            setTimeout(() => {
                span.classList.remove('bounce');
                span.classList.add('hide');
                span.classList.remove('show');
                
                // Last letter animation completed
                if(index === letters.length - 1) {
                    setTimeout(() => {
                        isAnimating = false;
                    }, 800);
                }
            }, index * 100);
        });
    }
    
    function reset() {
        letters.forEach(span => {
            span.className = 'letter-span';
        });
    }
    
    function runAnimationCycle() {
        // Start with animate in
        animateIn();
        
        // After 2 seconds, animate out
        setTimeout(() => {
            animateOut();
            
            // After animation out + 1 second, reset and animate in again
            setTimeout(() => {
                reset();
                setTimeout(animateIn, 100);
            }, 2000);
        }, 2000);
    }
    
    // Initial animation
    setTimeout(() => {
        runAnimationCycle();
        // Start the interval after the first cycle
        setInterval(runAnimationCycle, 6000);
    }, 500);
});
