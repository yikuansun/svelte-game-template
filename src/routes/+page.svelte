<script>
    import { onMount } from "svelte";

    const gameWidth = 1280, gameHeight = 720;

    let player = {
        width: 40,
        height: 70,
        x: 100,
        y: 100,
        velocityX: 0,
        velocityY: 0,
        grounded: false,
    }

    let keyInputs = {};

    function tick() {
        if (keyInputs["ArrowUp"] && player.grounded) {
            player.velocityY = -20;
        }
        if (keyInputs["ArrowLeft"]) {
            player.x -= 5;
        }
        if (keyInputs["ArrowRight"]) {
            player.x += 5;
        }

        // gravity
        player.velocityY += 1;

        // collision
        if (player.x < 0) {
            player.x = 0;
            player.velocityX = 0;
        }
        if (player.y > gameHeight - player.height) {
            player.y = gameHeight - player.height;
            player.velocityY = 0;
            player.grounded = true;
        }
        else player.grounded = false;

        player.y += player.velocityY;
        player.x += player.velocityX;

        requestAnimationFrame(tick);
    }

    onMount(() => {
        window.addEventListener("keydown", (e) => {
            keyInputs[e.key] = true;
        });
        window.addEventListener("keyup", (e) => {
            keyInputs[e.key] = false;
        });

        tick();
    });
</script>


<div id="svgContainer">
    <svg viewBox="0 0 {gameWidth} {gameHeight}" style:background-color="aliceblue">
        <!-- Player -->
        <rect width={player.width} height={player.height} x={player.x} y={player.y} fill="blue" />
    </svg>
</div>

<style>
    #svgContainer {
        background-color: black;
        position: fixed;
        width: 100vw;
        height: 100vh;
        top: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    #svgContainer svg {
        max-width: 100vw;
        max-height: 100vh;
    }
</style>