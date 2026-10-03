// --- Interactive 3D Parallax Logic ---
const logoCard = document.getElementById('logoCard');

// Track mouse movement to rotate the container
document.addEventListener('mousemove', (e) => {
    // Calculate rotation based on center of screen
    const xAxis = (window.innerWidth / 2 - e.pageX) / 30; // Divide by higher number for subtler tilt
    const yAxis = (window.innerHeight / 2 - e.pageY) / 30;
    
    logoCard.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
});

// Reset rotation when mouse leaves window
document.addEventListener('mouseleave', () => {
    logoCard.style.transform = `rotateY(0deg) rotateX(0deg)`;
});


// --- Countdown Logic ---
const launchDate = new Date("Oct 6, 2026 13:30:00 UTC").getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = launchDate - now;

    if (distance < 0) {
        document.getElementById("countdown").innerHTML = "<div class='live-text'>SERVER IS LIVE!</div>";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = String(days).padStart(2, '0');
    document.getElementById("hours").innerText = String(hours).padStart(2, '0');
    document.getElementById("minutes").innerText = String(minutes).padStart(2, '0');
    document.getElementById("seconds").innerText = String(seconds).padStart(2, '0');
}

setInterval(updateCountdown, 1000);
updateCountdown();


// --- IP Copy Logic ---
function copyIP() {
    navigator.clipboard.writeText("play.aegosmp.xyz");
    const btn = document.querySelector(".btn-copy");
    btn.innerText = "Copied!";
    
    // Reset button text after 2 seconds
    setTimeout(() => {
        btn.innerText = "Copy IP";
    }, 2000);
}