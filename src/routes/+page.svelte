<!-- landing page (for preloading assets and ensuring audio playback) -->

<script>
    // we will play this empty sound to test the browser's autoplay policy
    import blankSound from "$lib/assets/sounds/nothing.mp3";

    import { onMount, onDestroy } from "svelte";
    import { goto } from "$app/navigation";

    // assets to preload
    import logoImage from "$lib/assets/images/game-logo.png";
    // TODO: import the rest of your assets here

    /**
     * Scrape assets (attempt to preload)
     * @param {string[]} urlList list of URLs to load
     */
    function loadAssets(urlList) {
        for (let url of urlList) fetch(url);
    }

    let autoplayAllowed = true;

    onMount(() => {
        loadAssets([
            logoImage,
            // TODO: add the rest of your assets here
        ]);

        let aud = new Audio(blankSound);
        aud.addEventListener("canplaythrough", () => {
            aud.play().then(() => {
                // media autoplay allowed
                goto("./menu");
            }).catch((e) => {
                // media autoplay not allowed, need user interaction
                console.log(e.message);
                autoplayAllowed = false;
            });
        });
    });
</script>

{#if autoplayAllowed}
    <!-- no need for the Run button, because audio can already be played -->
    <rect width="100%" height="100%" x="0" y="0" fill="black" />
{:else}
    <foreignObject width="100%" height="100%">
        <div style:display="flex" style:flex-direction="column" style:align-items="center" style:justify-content="center"
            style:width="100%" style:height="100%">
            <!-- audio may require user interaction to play -->
            <button on:click={() => {
                goto("./menu");
            }}>Run Game</button>
        </div>
    </foreignObject>
{/if}