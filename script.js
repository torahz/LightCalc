document.addEventListener("DOMContentLoaded", () => {
    const gameArea = document.getElementById("gameArea");
    const pepino = document.getElementById("pepino");
    const btnLeft = document.getElementById("left");
    const btnRight = document.getElementById("right");
    const btnJump = document.getElementById("jump");

    let isJumping = false;
    let velocity = 0;
    let gravity = 0.5;
    let moveLeft = false;
    let moveRight = false;
    let health = 2;

    pepino.style.bottom = "0px";
    pepino.style.left = "50%";

    // Movimentação para a esquerda
    btnLeft.addEventListener("mousedown", () => moveLeft = true);
    btnLeft.addEventListener("mouseup", () => moveLeft = false);

    // Movimentação para a direita
    btnRight.addEventListener("mousedown", () => moveRight = true);
    btnRight.addEventListener("mouseup", () => moveRight = false);

    // Pulo
    btnJump.addEventListener("mousedown", () => {
        if (!isJumping) {
            isJumping = true;
            velocity = -10;
        }
    });

    // Geração de inimigos e obstáculos
    const obstacles = [
        { type: 'enemy', left: 150 },
        { type: 'enemy', left: 250 },
        { type: 'spike', left: 100 },
    ];

    obstacles.forEach(obstacle => {
        const obstacleElement = document.createElement("div");
        if (obstacle.type === 'enemy') {
            obstacleElement.classList.add("enemy");
        } else if (obstacle.type === 'spike') {
            obstacleElement.classList.add("spike");
            obstacleElement.style.backgroundImage = 'url("https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Red_Spike.png/64px-Red_Spike.png")'; // Imagem de espeto
            obstacleElement.style.height = "16px";
            obstacleElement.style.width = "32px";
            obstacleElement.style.bottom = "0px";
        }
        obstacleElement.style.left = `${obstacle.left}px`;
        gameArea.appendChild(obstacleElement);
    });

    // Loop principal do jogo
    function gameLoop() {
        if (moveLeft && parseInt(pepino.style.left) > 0) {
            pepino.style.left = `${parseInt(pepino.style.left) - 5}px`;
        }

        if (moveRight && parseInt(pepino.style.left) < 288) {
            pepino.style.left = `${parseInt(pepino.style.left) + 5}px`;
        }

        if (isJumping) {
            pepino.style.bottom = `${parseInt(pepino.style.bottom) + velocity}px`;
            velocity += gravity;

            if (parseInt(pepino.style.bottom) >= 400) {
                velocity = 0;
            }

            if (parseInt(pepino.style.bottom) <= 0) {
                isJumping = false;
                pepino.style.bottom = "0px";
            }
        }

        checkCollisions();

        requestAnimationFrame(gameLoop);
    }

    function checkCollisions() {
        const pepinoRect = pepino.getBoundingClientRect();

        document.querySelectorAll(".enemy, .spike").forEach(obstacle => {
            const obstacleRect = obstacle.getBoundingClientRect();
            if (
                pepinoRect.left < obstacleRect.left + obstacleRect.width &&
                pepinoRect.left + pepinoRect.width > obstacleRect.left &&
                pepinoRect.bottom < obstacleRect.bottom + obstacleRect.height &&
                pepinoRect.height + pepinoRect.bottom > obstacleRect.bottom
            ) {
                if (obstacle.classList.contains("enemy")) {
                    gameArea.removeChild(obstacle); // Mata o inimigo
                } else if (obstacle.classList.contains("spike")) {
                    takeDamage();
                }
            }
        });
    }

    function takeDamage() {
        health -= 1;
        if (health <= 0) {
            alert("Você perdeu! Tente novamente.");
            resetGame();
        }
    }

    function resetGame() {
        health = 2;
        pepino.style.left = "50%";
        pepino.style.bottom = "0px";
        gameArea.innerHTML = '';
        gameArea.appendChild(pepino);
        obstacles.forEach(obstacle => {
            const obstacleElement = document.createElement("div");
            if (obstacle.type === 'enemy') {
                obstacleElement.classList.add("enemy");
            } else if (obstacle.type === 'spike') {
                obstacleElement.classList.add("spike");
                obstacleElement.style.backgroundImage = 'url("https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Red_Spike.png/64px-Red_Spike.png")'; 
                obstacleElement.style.height = "16px";
                obstacleElement.style.width = "32px";
                obstacleElement.style.bottom = "0px";
            }
            obstacleElement.style.left = `${obstacle.left}px`;
            gameArea.appendChild(obstacleElement);
        });
    }

    gameLoop();
});
