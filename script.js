
// =========================================
// AEGO SMP — INTERACTIONS
// =========================================

document.addEventListener("DOMContentLoaded", () => {
    const SERVER_IP = "aegosmp.xyz";

    // -----------------------------------------
    // Mobile navigation
    // -----------------------------------------

    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    function closeMenu() {
        if (!menuToggle || !navLinks) return;

        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        document.body.classList.remove("menu-open");
    }

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            const isOpen = navLinks.classList.toggle("open");

            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close navigation menu" : "Open navigation menu"
            );

            menuToggle.innerHTML = isOpen
                ? '<i class="fas fa-times"></i>'
                : '<i class="fas fa-bars"></i>';

            document.body.classList.toggle("menu-open", isOpen);
        });

        navLinks.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", closeMenu);
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") closeMenu();
        });

        document.addEventListener("click", (event) => {
            if (
                navLinks.classList.contains("open") &&
                !navLinks.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {
                closeMenu();
            }
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth > 720) closeMenu();
        });
    }

    // -----------------------------------------
    // Toast notifications
    // -----------------------------------------

    const toast = document.getElementById("toast");
    let toastTimeout;

    function showToast(message, isError = false) {
        if (!toast) return;

        clearTimeout(toastTimeout);

        toast.textContent = message;
        toast.classList.toggle("error", isError);
        toast.classList.add("show");

        toastTimeout = setTimeout(() => {
            toast.classList.remove("show");
        }, 2600);
    }

    // -----------------------------------------
    // Copy server IP
    // -----------------------------------------

    const copyButton = document.getElementById("copyIp");
    const copyFeedback = document.getElementById("copyFeedback");

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

        let successful = false;

        try {
            successful = document.execCommand("copy");
        } catch {
            successful = false;
        }

        textarea.remove();
        return successful;
    }

    async function copyServerIP() {
        let successful = false;

        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(SERVER_IP);
                successful = true;
            } else {
                successful = await fallbackCopy(SERVER_IP);
            }
        } catch {
            try {
                successful = await fallbackCopy(SERVER_IP);
            } catch {
                successful = false;
            }
        }

        if (successful) {
            const buttonText = copyButton.querySelector("span");

            if (buttonText) buttonText.textContent = "Copied!";
            copyButton.innerHTML =
                '<i class="fas fa-check"></i><span>Copied!</span>';

            copyButton.style.background = "#23794e";

            if (copyFeedback) {
                copyFeedback.textContent =
                    "Server IP copied. See you in-game!";
            }

            showToast("Server IP copied: " + SERVER_IP);

            setTimeout(() => {
                copyButton.innerHTML =
                    '<i class="fas fa-copy"></i><span>Copy IP</span>';

                copyButton.style.background = "";
            }, 2000);
        } else {
            if (copyFeedback) {
                copyFeedback.textContent =
                    "Copy failed. Please select and copy the IP manually.";
            }

            showToast("Please copy aegosmp.xyz manually.", true);
        }
    }

    if (copyButton) {
        copyButton.addEventListener("click", copyServerIP);
    }

    // -----------------------------------------
    // Subtle 3D logo parallax
    // -----------------------------------------

    const logo = document.getElementById("parallaxLogo");
    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );

    if (
        logo &&
        window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
        !prefersReducedMotion.matches
    ) {
        logo.addEventListener("mousemove", (event) => {
            const rect = logo.getBoundingClientRect();

            const x = (event.clientX - rect.left) / rect.width - 0.5;
            const y = (event.clientY - rect.top) / rect.height - 0.5;

            logo.style.transform =
                `perspective(700px) rotateY(${x * 7}deg) rotateX(${-y * 6}deg)`;
        });

        logo.addEventListener("mouseleave", () => {
            logo.style.transform =
                "perspective(700px) rotateY(0deg) rotateX(0deg)";
        });
    }

    // -----------------------------------------
    // Automatically update footer year
    // -----------------------------------------

    const yearElement = document.getElementById("currentYear");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});
