<script>
    import { onMount, onDestroy } from "svelte";
    import { goto } from "$app/navigation";

    // default parameters passed into the slot from +layout.svelte
    export let screenWidth = 960;
    export let screenHeight = 540;

    /** @type {Object.<string, boolean>} keyboard inputs */
    let keysPressed = {};

    /** @type {number} ID of the next animation frame (can be canceled with cancelAnimationFrame) */
    let animationFrameId;

    // tracking time in between frames, we can calculate deltaTime to get smooth movement
    let lastTime = Date.now();
    let deltaTime = 0;

    /** @type {{
     *     x: number,
     *     y: number,
     *     width: number,
     *     height: number,
     *     speed: number,
     * }} info about the player */
    let player = {
        x: 10,
        y: 10,
        width: 50,
        height: 50,
        speed: 150, // all speeds are in pixels per second
    };

    /**
     * Main game loop (tick) function
     */
    function loop() {
        let startTime = Date.now();
        deltaTime = (startTime - lastTime) / 1000; // seconds per frame
        lastTime = startTime;

        // TODO: implement your game logic here

        // player movement
        if (keysPressed["ArrowLeft"]) {
            player.x -= player.speed * deltaTime; // remember to multiply speeds by deltaTime
        }
        if (keysPressed["ArrowRight"]) {
            player.x += player.speed * deltaTime;
        }
        if (keysPressed["ArrowUp"]) {
            player.y -= player.speed * deltaTime;
        }
        if (keysPressed["ArrowDown"]) {
            player.y += player.speed * deltaTime;
        }

        // cap player position
        if (player.x < 0) player.x = 0;
        if (player.x > screenWidth - player.width) player.x = screenWidth - player.width;
        if (player.y < 0) player.y = 0;
        if (player.y > screenHeight - player.height) player.y = screenHeight - player.height;

        animationFrameId = requestAnimationFrame(loop);
    }

    onMount(() => {
        // start the game loop
        lastTime = Date.now();
        animationFrameId = requestAnimationFrame(loop);
    })

    onDestroy(() => {
        // make sure the game is doesn't keep running when user navigates away
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
    });
</script>

<!-- track keyboard inputs -->
<svelte:window on:keydown={(e) => {
        keysPressed[e.key] = true;
    }} on:keyup={(e) => {
        keysPressed[e.key] = false;
    }} />

<!-- (FPS display)
    <text x="10" y="25">FPS: {(1 / deltaTime).toFixed(0)}</text>
-->

<!-- player -->
<rect x={player.x} y={player.y} width={player.width} height={player.height} fill="red" />