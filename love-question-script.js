// Love Question Page Script - Interactive Logic and Animations
// Handles question flow, celebrations, and playful interactions

document.addEventListener('DOMContentLoaded', function() {
    const questionText = document.getElementById('question-text');
    const buttons = document.getElementById('buttons');
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    const celebration = document.getElementById('celebration');

    let currentQuestion = 1; // 1: First question, 2: Second question
    let runawayActive = false;

    // Animate initial elements
    setTimeout(() => {
        questionText.classList.add('animate');
        buttons.classList.add('animate');
    }, 100);

    // Yes Button Click - Celebration
    yesBtn.addEventListener('click', function() {
        celebrate();
        // Hide buttons after celebration
        setTimeout(() => {
            buttons.style.display = 'none';
            questionText.textContent = 'Thank you! I love you too! ❤️';
        }, 3000);
    });

    // No Button Click - Advance to Next Question
    noBtn.addEventListener('click', function() {
        if (currentQuestion === 1) {
            currentQuestion = 2;
            questionText.textContent = 'Think again (the last one)';
            // Make Yes prominent
            yesBtn.classList.add('prominent');
            // Activate runaway for No
            runawayActive = true;
            noBtn.classList.add('runaway');
            // Reposition No to center initially
            noBtn.style.position = 'fixed';
            noBtn.style.top = '50%';
            noBtn.style.left = '50%';
            noBtn.style.transform = 'translate(-50%, -50%)';
        } else if (currentQuestion === 2) {
            // On second No, runaway is already active, but clicking still triggers runaway logic
            // No additional action needed as runaway is handled by mousemove
        }
    });

    // Runaway No Button - Moves away from cursor but stays on page
    document.addEventListener('mousemove', function(e) {
        if (runawayActive && noBtn.classList.contains('runaway')) {
            const rect = noBtn.getBoundingClientRect();
            const buttonCenterX = rect.left + rect.width / 2;
            const buttonCenterY = rect.top + rect.height / 2;
            const buttonWidth = rect.width;
            const buttonHeight = rect.height;

            // Distance from cursor to button center
            const dx = e.clientX - buttonCenterX;
            const dy = e.clientY - buttonCenterY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) { // If cursor is close, move away
                const angle = Math.atan2(dy, dx);
                const moveDistance = 50; // Reduced for subtler movement
                let newLeft = buttonCenterX + Math.cos(angle) * moveDistance - buttonWidth / 2;
                let newTop = buttonCenterY + Math.sin(angle) * moveDistance - buttonHeight / 2;

                // Clamp to viewport to prevent disappearing off-screen
                newLeft = Math.max(0, Math.min(newLeft, window.innerWidth - buttonWidth));
                newTop = Math.max(0, Math.min(newTop, window.innerHeight - buttonHeight));

                noBtn.style.left = newLeft + 'px';
                noBtn.style.top = newTop + 'px';
                noBtn.style.transform = 'none'; // Override translate for absolute positioning
            }
        }
    });

    // Celebration Function - Enhanced Bursting Hearts from Button
    function celebrate() {
        celebration.classList.remove('hidden');
        celebration.innerHTML = ''; // Clear previous hearts

        // Get Yes button position for burst origin
        const rect = yesBtn.getBoundingClientRect();
        const originX = rect.left + rect.width / 2;
        const originY = rect.top + rect.height / 2;

        // Create 50 hearts for more impact
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.classList.add('heart');
                heart.innerHTML = '❤️';
                
                // Random direction and distance for burst
                const angle = (Math.PI * 2 * i) / 50;
                const distance = 50 + Math.random() * 100; // 50-150px spread
                const dx = Math.cos(angle) * distance;
                const dy = Math.sin(angle) * distance;
                
                heart.style.setProperty('--dx', dx + 'px');
                heart.style.setProperty('--dy', dy + 'px');
                
                // Vary size
                const size = 16 + Math.random() * 24; // 16-40px
                heart.style.fontSize = size + 'px';
                
                // Random delay for staggered burst
                heart.style.animationDelay = (i * 50) + 'ms';
                
                celebration.appendChild(heart);

                // Remove heart after animation (4s to match CSS)
                setTimeout(() => {
                    heart.remove();
                }, 4000);
            }, i * 50);
        }

        // Hide celebration after 6 seconds
        setTimeout(() => {
            celebration.classList.add('hidden');
        }, 6000);
    }

    // Ensure No button stays clickable but playful
    noBtn.addEventListener('mouseenter', function() {
        if (runawayActive) {
            // On hover, slightly move but allow click
            const rect = this.getBoundingClientRect();
            this.style.left = (rect.left + 20) + 'px';
        }
    });
});
