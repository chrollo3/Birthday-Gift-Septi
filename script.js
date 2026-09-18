/* =========================================
   OPEN WEBSITE
========================================= */

const openButton = document.getElementById("openButton");
const opening = document.getElementById("opening");
const mainContent = document.getElementById("mainContent");

openButton.addEventListener("click", () => {

    opening.style.opacity = "0";
    opening.style.transform = "scale(1.05)";
    opening.style.transition = "all 0.8s ease";

    setTimeout(() => {

        opening.style.display = "none";

        mainContent.classList.remove("hidden");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }, 800);

});


/* =========================================
   MUSIC PLAYER
========================================= */

const audio = document.getElementById("audio");
const playButton = document.getElementById("playButton");
const progress = document.getElementById("progress");
const currentTimeText = document.getElementById("currentTime");
const durationText = document.getElementById("duration");
const musicPlayer = document.querySelector(".music-player");


/* Format time */

function formatTime(seconds) {

    if (isNaN(seconds)) {
        return "0:00";
    }

    const minutes = Math.floor(seconds / 60);

    const remainingSeconds =
        Math.floor(seconds % 60)
        .toString()
        .padStart(2, "0");

    return `${minutes}:${remainingSeconds}`;
}


/* Play / Pause */

playButton.addEventListener("click", () => {

    if (audio.paused) {

        audio.play()
            .then(() => {

                playButton.textContent = "❚❚";

                musicPlayer.classList.add("playing");

            })
            .catch((error) => {

                console.log(
                    "Audio tidak dapat dimainkan:",
                    error
                );

            });

    } else {

        audio.pause();

        playButton.textContent = "▶";

        musicPlayer.classList.remove("playing");

    }

});


/* When metadata loaded */

audio.addEventListener("loadedmetadata", () => {

    durationText.textContent =
        formatTime(audio.duration);

});


/* Update progress */

audio.addEventListener("timeupdate", () => {

    if (!audio.duration) return;

    const percentage =
        (audio.currentTime / audio.duration) * 100;

    progress.value = percentage;

    currentTimeText.textContent =
        formatTime(audio.currentTime);

});


/* Seek */

progress.addEventListener("input", () => {

    if (!audio.duration) return;

    audio.currentTime =
        (progress.value / 100) * audio.duration;

});


/* When song ended */

audio.addEventListener("ended", () => {

    playButton.textContent = "▶";

    musicPlayer.classList.remove("playing");

    progress.value = 0;

    currentTimeText.textContent = "0:00";

});


/* =========================================
   WISH BUTTON
========================================= */

const wishButton = document.getElementById("wishButton");
const wishMessage = document.getElementById("wishMessage");

wishButton.addEventListener("click", () => {

    wishButton.style.display = "none";

    wishMessage.classList.remove("hidden");

    createConfetti();

});


/* =========================================
   CONFETTI
========================================= */

function createConfetti() {

    const symbols = [
        "♡",
        "✦",
        "✧",
        "♥",
        "•"
    ];

    for (let i = 0; i < 70; i++) {

        const confetti =
            document.createElement("div");

        confetti.classList.add("confetti");

        confetti.textContent =
            symbols[
                Math.floor(
                    Math.random() * symbols.length
                )
            ];

        confetti.style.left =
            Math.random() * 100 + "vw";

        confetti.style.fontSize =
            (Math.random() * 12 + 7) + "px";

        confetti.style.animationDuration =
            (Math.random() * 2 + 2) + "s";

        confetti.style.animationDelay =
            Math.random() * 0.5 + "s";

        document.body.appendChild(confetti);


        setTimeout(() => {

            confetti.remove();

        }, 4000);

    }

}


/* =========================================
   SCROLL REVEAL
========================================= */

const revealElements =
    document.querySelectorAll(
        ".message-card, .photo-card, .wish-card, .letter"
    );


const observer =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";

                    entry.target.style.transform =
                        "translateY(0)";

                    observer.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.1
        }
    );


revealElements.forEach(element => {

    element.style.opacity = "0";

    element.style.transform =
        "translateY(30px)";

    element.style.transition =
        "opacity 0.8s ease, transform 0.8s ease";

    observer.observe(element);

});


/* =========================================
   CONSOLE MESSAGE
========================================= */

console.log(
    "Happy Birthday, Septiyana! 🎂💗"
);