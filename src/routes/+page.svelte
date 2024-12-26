<script>
    import { onMount } from "svelte";

    const gameWidth = 1280, gameHeight = 720;

    let player = {
        width: 40,
        height: 70,
        x: 100,
        y: 100,
    }

    let keyInputs = {};

    function tick() {
        if (keyInputs["ArrowUp"]) {
            player.y -= 4;
        }
        if (keyInputs["ArrowDown"]) {
            player.y += 4;
        }
        if (keyInputs["ArrowLeft"]) {
            player.x -= 4;
        }
        if (keyInputs["ArrowRight"]) {
            player.x += 4;
        }

        // bounds
        if (player.x < 0) player.x = 0;
        else if (player.x > gameWidth - player.width) player.x = gameWidth - player.width;
        if (player.y < 0) player.y = 0;
        else if (player.y > gameHeight - player.height) player.y = gameHeight - player.height;

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