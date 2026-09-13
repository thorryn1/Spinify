
(function Spinify() {

    if (document.getElementById("spinify-panel")) return;

    // =========================
    // PANEL
    // =========================

    const panel = document.createElement("div");

    panel.id = "spinify-panel";

    Object.assign(panel.style, {
        position: "fixed",
        right: "25px",
        bottom: "90px",
        width: "240px",
        padding: "18px",
        background: "#181818",
        color: "white",
        borderRadius: "14px",
        zIndex: "99999",
        boxShadow: "0 8px 30px rgba(0,0,0,0.5)",
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
        userSelect: "none"
    });


    // =========================
    // TITLE
    // =========================

    const title = document.createElement("div");

    title.textContent = "🎰 SPINIFY";

    Object.assign(title.style, {
        fontSize: "18px",
        fontWeight: "bold",
        marginBottom: "15px",
        cursor: "grab",
        padding: "5px"
    });


    // =========================
    // MODE LABEL
    // =========================

    const modeLabel = document.createElement("div");

    modeLabel.textContent = "Mode";

    Object.assign(modeLabel.style, {
        textAlign: "left",
        fontSize: "12px",
        color: "#aaa",
        marginBottom: "5px"
    });


    // =========================
    // MODE SELECT
    // =========================

    const mode = document.createElement("select");

    mode.innerHTML = `
        <option value="random">🎲 Random</option>
        <option value="chaos">💀 Chaos</option>
    `;

    Object.assign(mode.style, {
        width: "100%",
        padding: "8px",
        marginBottom: "15px",
        border: "none",
        borderRadius: "8px",
        background: "#282828",
        color: "white",
        fontSize: "13px",
        outline: "none",
        cursor: "pointer"
    });


    // =========================
    // STATUS
    // =========================

    const status = document.createElement("div");

    status.textContent = "Ready to spin...";

    Object.assign(status.style, {
        fontSize: "13px",
        color: "#aaa",
        marginBottom: "15px",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis"
    });


    // =========================
    // SPIN BUTTON
    // =========================

    const spinButton = document.createElement("button");

    spinButton.textContent = "🎰 SPIN";

    Object.assign(spinButton.style, {
        width: "100%",
        padding: "11px",
        border: "none",
        borderRadius: "20px",
        background: "#1db954",
        color: "white",
        fontSize: "15px",
        fontWeight: "bold",
        cursor: "pointer"
    });


    panel.appendChild(title);
    panel.appendChild(modeLabel);
    panel.appendChild(mode);
    panel.appendChild(status);
    panel.appendChild(spinButton);

    document.body.appendChild(panel);


    // =========================
    // MEME POPUP
    // =========================

    const memePopup = document.createElement("div");

    memePopup.id = "spinify-meme";

    Object.assign(memePopup.style, {
        position: "fixed",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%) scale(0.5)",
        width: "320px",
        maxWidth: "70vw",
        padding: "10px",
        background: "#111",
        borderRadius: "16px",
        zIndex: "100000",
        boxShadow: "0 10px 50px rgba(0,0,0,0.8)",
        opacity: "0",
        pointerEvents: "none",
        transition: "all 0.25s ease"
    });


    const memeImage = document.createElement("img");

    Object.assign(memeImage.style, {
        width: "100%",
        display: "block",
        borderRadius: "10px"
    });


    memePopup.appendChild(memeImage);

    document.body.appendChild(memePopup);


    // =========================
    // MEME LIST
    // =========================

    const memes = [
        "meme01_nah-bro.png",
        "meme02_why-this-song.png",
        "meme03_absolute-cinema.png",
        "meme04_the-chosen-one.png",
        "meme05_bro-really-thought.png",
        "meme06_peak-music.png",
        "meme07_we-are-cooked.png",
        "meme08_no-way.png",
        "meme09_what-did-i-just-hear.png",
        "meme10_certified-banger.png",
        "meme11_mission-failed.png",
        "meme12_who-invited-this-song.png",
        "meme13_he-cant-keep-getting-away.png",
        "meme14_its-joever.png",
        "meme15_spin-again.png",
        "meme16_algorithm-knows.png"
    ];


    // =========================
    // SHOW RANDOM MEME
    // =========================

    function showRandomMeme() {

        const randomIndex =
            Math.floor(Math.random() * memes.length);

        const memeName = memes[randomIndex];

        /*
         * Meme berada di folder:
         *
         * Spinify/
         * ├── spinify.js
         * └── memes/
         *     └── meme01_nah-bro.png
         *
         */

        const memePath =
        "http://127.0.0.1:8765/memes/" + memeName;

        memeImage.src = memePath;

        memePopup.style.opacity = "1";

        memePopup.style.transform =
            "translate(-50%, -50%) scale(1)";


        setTimeout(function() {

            memePopup.style.opacity = "0";

            memePopup.style.transform =
                "translate(-50%, -50%) scale(0.5)";

        }, 3000);
    }


    // =========================
    // DRAG SYSTEM
    // =========================

    let dragging = false;
    let offsetX = 0;
    let offsetY = 0;


    title.addEventListener("mousedown", function(e) {

        dragging = true;

        title.style.cursor = "grabbing";

        const rect =
            panel.getBoundingClientRect();

        offsetX =
            e.clientX - rect.left;

        offsetY =
            e.clientY - rect.top;

        panel.style.left =
            rect.left + "px";

        panel.style.top =
            rect.top + "px";

        panel.style.right = "auto";
        panel.style.bottom = "auto";
    });


    document.addEventListener("mousemove", function(e) {

        if (!dragging) return;

        panel.style.left =
            (e.clientX - offsetX) + "px";

        panel.style.top =
            (e.clientY - offsetY) + "px";
    });


    document.addEventListener("mouseup", function() {

        if (!dragging) return;

        dragging = false;

        title.style.cursor = "grab";
    });


    // =========================
    // SPIN
    // =========================

    spinButton.onclick = function() {

        let songs = document.querySelectorAll(
            '[data-testid="tracklist-row"], [role="row"]'
        );


        songs = [...songs].filter(song => {

            return song.innerText &&
                   song.innerText.trim().length > 0;

        });


        if (songs.length === 0) {

            status.textContent =
                "❌ Buka playlist dulu!";

            return;
        }


        spinButton.disabled = true;
        mode.disabled = true;

        spinButton.textContent =
            "🌀 SPINNING...";


        const selectedMode = mode.value;


        // =========================
        // WINNER
        // =========================

        let winnerIndex;


        if (selectedMode === "random") {

            winnerIndex =
                Math.floor(
                    Math.random() * songs.length
                );

            status.textContent =
                "🎲 Random mode";
        }


        if (selectedMode === "chaos") {

            winnerIndex = 0;

            for (let i = 0; i < 10; i++) {

                winnerIndex =
                    Math.floor(
                        Math.random() * songs.length
                    );
            }

            status.textContent =
                "💀 CHAOS MODE";
        }


        // =========================
        // ROULETTE
        // =========================

        let current = 0;

        let speed = 60;

        let elapsed = 0;

        const maxTime = 3500;


        function roulette() {

            songs.forEach(song => {

                song.style.outline = "";
                song.style.boxShadow = "";

            });


            const song =
                songs[current];


            song.scrollIntoView({
                behavior: "auto",
                block: "center"
            });


            song.style.outline =
                "3px solid #1db954";

            song.style.boxShadow =
                "0 0 20px #1db954";


            current++;


            if (current >= songs.length) {
                current = 0;
            }


            elapsed += speed;


            if (elapsed > 2000) {
                speed += 40;
            }


            if (elapsed >= maxTime) {

                finishSpin();

                return;
            }


            setTimeout(
                roulette,
                speed
            );
        }


        // =========================
        // FINISH
        // =========================

        function finishSpin() {

            songs.forEach(song => {

                song.style.outline = "";
                song.style.boxShadow = "";

            });


            const winner =
                songs[winnerIndex];


            winner.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });


            winner.style.outline =
                "4px solid #1db954";

            winner.style.boxShadow =
                "0 0 30px #1db954";


            const name =
                winner.innerText
                    .split("\n")
                    .filter(x => x.trim())[0];


            status.textContent =
                "🎉 " + name;


            spinButton.disabled = false;
            mode.disabled = false;

            spinButton.textContent =
                "🎰 SPIN";


            // =========================
            // 30% MEME CHANCE
            // =========================

            if (Math.random() < 0.30) {

                setTimeout(function() {
                    showRandomMeme();
                }, 400);

            }
        }


        roulette();

    };

})();