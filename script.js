const btnYes = document.getElementById("yes");
const btnNo = document.getElementById("no");
const mensaje = document.getElementById("mensaje");
const buttonsContainer = document.querySelector(".buttons");

let yesScale = 1;
let yesBaseWidth = 100;
let yesBaseHeight = 50;

function moverBotonNo() {
    const btnRect = btnNo.getBoundingClientRect();

    if (btnNo.style.position !== "fixed") {
        btnNo.style.position = "fixed";
        btnNo.style.transition = "all 0.01s ease"; // ⏩ más rápido
        btnNo.style.zIndex = "999";
        btnNo.style.left = `${btnRect.left}px`;
        btnNo.style.top = `${btnRect.top}px`;
    }

    const padding = 10;
    const windowW = window.innerWidth;
    const windowH = window.innerHeight;

    const maxX = windowW - btnRect.width - padding;
    const maxY = windowH - btnRect.height - padding;
    const minX = padding;
    const minY = padding;

    let newX, newY;
    const minDistance = 60;
    let attempts = 0;
    const maxAttempts = 100;

    const prevX = parseFloat(btnNo.style.left) || btnRect.left;
    const prevY = parseFloat(btnNo.style.top) || btnRect.top;

    do {
        newX = Math.random() * (maxX - minX) + minX;
        newY = Math.random() * (maxY - minY) + minY;

        const dx = newX - prevX;
        const dy = newY - prevY;
        var distance = Math.sqrt(dx * dx + dy * dy);
        attempts++;

        if (attempts > maxAttempts) {
            distance = minDistance + 1;
        }
    } while (distance < minDistance);

    newX = Math.min(Math.max(newX, minX), maxX);
    newY = Math.min(Math.max(newY, minY), maxY);

    btnNo.style.left = `${newX}px`;
    btnNo.style.top = `${newY}px`;

    detectarSuperposicion();

    yesScale += 0.15;
    const newWidth = yesBaseWidth * yesScale;
    const newHeight = yesBaseHeight * yesScale;

    btnYes.style.width = `${newWidth}px`;
    btnYes.style.height = `${newHeight}px`;
    btnYes.style.lineHeight = `${newHeight}px`;
    btnYes.style.fontSize = `${1.5 * yesScale}rem`;
    btnYes.style.zIndex = "10";
}

function detectarSuperposicion() {
    const rectYes = btnYes.getBoundingClientRect();
    const rectNo = btnNo.getBoundingClientRect();

    const overlap = !(
        rectYes.right < rectNo.left ||
        rectYes.left > rectNo.right ||
        rectYes.bottom < rectNo.top ||
        rectYes.top > rectNo.bottom
    );

    btnYes.style.pointerEvents = overlap ? "none" : "auto";
}

// Evento botón Sí
btnYes.addEventListener("click", () => {
    buttonsContainer.style.display = "none";
    btnNo.style.display = "none";
    mensaje.style.display = "block";
});

// Eventos botón No
btnNo.addEventListener("mousedown", moverBotonNo); // ⏱️ antes del clic
btnNo.addEventListener("touchstart", moverBotonNo);
btnNo.addEventListener("mouseover", moverBotonNo);

window.addEventListener("resize", () => {
    btnNo.style.left = "";
    btnNo.style.top = "";
});
