// =========================================
// AEGO SMP — SITE INTERACTIONS
// =========================================

document.addEventListener("DOMContentLoaded", () => {
    const SERVER_IP = "aegosmp.xyz";

    // Mobile navigation
    const menuToggle = document.getElementById("mobileMenuToggle");
    const mobileMenu = document.getElementById("mobileMenu");

    function closeMobileMenu() {
        if (!menuToggle || !mobileMenu) return;
        mobileMenu.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    }

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener("click", () => {
            const open = !mobileMenu.classList.contains("open");
            mobileMenu.classList.toggle("open", open);
            menuToggle.setAttribute("aria-expanded", String(open));
            menuToggle.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
            menuToggle.innerHTML = open
                ? '<i class="fas fa-times"></i>'
                : '<i class="fas fa-bars"></i>';
        });

        mobileMenu.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", closeMobileMenu);
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") closeMobileMenu();
        });

        document.addEventListener("click", (event) => {
            if (
                mobileMenu.classList.contains("open") &&
                !mobileMenu.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {
                closeMobileMenu();
            }
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth > 720) closeMobileMenu();
        });
    }

    // Copy server IP from either copy button
    const copyButtons = [
        document.getElementById("copyIpButton"),
        document.getElementById("copyIpButtonBottom")
    ].filter(Boolean);
    const feedback = document.getElementById("copyFeedback");
    let feedbackTimer;

    async function fallbackCopy(text) {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.setAttribute("readonly", "");
        textarea.style.position = "fixed";
        textarea.style.left = "-9999px";
        textarea.style.top = "0";
        document.body.appendChild(textarea);
        textarea.select();
        textarea.setSelectionRange(0, textarea.value.length);
        let copied = false;
        try {
            copied = document.execCommand("copy");
        } catch {
            copied = false;
        }
        textarea.remove();
        return copied;
    }

    async function copyIP(button) {
        let copied = false;
        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(SERVER_IP);
                copied = true;
            } else {
                copied = await fallbackCopy(SERVER_IP);
            }
        } catch {
            copied = await fallbackCopy(SERVER_IP);
        }

        if (copied) {
            if (feedback) feedback.textContent = "Copied! Paste aegosmp.xyz into Minecraft.";
            const original = button.innerHTML;
            button.innerHTML = '<i class="fas fa-check"></i><span>Copied!</span>';
            button.disabled = true;
            window.setTimeout(() => {
                button.innerHTML = original;
                button.disabled = false;
            }, 1800);
        } else {
            if (feedback) feedback.textContent = "Couldn't copy automatically. Please copy aegosmp.xyz manually.";
        }

        window.clearTimeout(feedbackTimer);
        if (feedback) {
            feedbackTimer = window.setTimeout(() => {
                feedback.textContent = "";
            }, 3500);
        }
    }

    copyButtons.forEach((button) => {
        button.addEventListener("click", () => copyIP(button));
    });

    // Update copyright year
    const year = document.querySelector(".copyright");
    if (year) {
        year.textContent = `© ${new Date().getFullYear()} Aego SMP. Not affiliated with Mojang or Microsoft.`;
    }
});
