<script>
    import { afterNavigate, onNavigate } from "$app/navigation";
    import { fade } from "svelte/transition";

    let screenWidth = 960;
    let screenHeight = 540;

    let curtainVisible = false;
    let TRANSITION_DURATION = 700; // in milliseconds

    onNavigate(async () => {
        curtainVisible = true;
        await new Promise(r => setTimeout(r, TRANSITION_DURATION));
    });

    afterNavigate(() => {
        curtainVisible = false;
    })
</script>


<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {screenWidth} {screenHeight}"
    style:position="fixed" style:top="50vh" style:left="50vw" style:transform="translate(-50%, -50%)"
    style:width="100vw" style:height="100vh">
    <defs>
        <!-- necessary to prevent game objects from going outside the viewport -->
        <clipPath id="screenClip">
            <rect width={screenWidth} height={screenHeight} x="0" y="0" />
        </clipPath>
    </defs>
    <g clip-path="url(#screenClip)">
        <slot {screenWidth} {screenHeight} /> <!-- game content goes into slot -->
    </g>
    {#if curtainVisible}
        <!-- screen transition - feel free to replace with other effects like fly or slide -->
        <rect width={screenWidth} height={screenHeight} x="0" y="0" fill="black"
            transition:fade={{ duration: TRANSITION_DURATION }} />
    {/if}
</svg>

<svelte:head>
    <!-- be sure to add your own game title and description :) -->
    <title>Svelte Game</title>
    <meta name="description" content="Svelte Game" />
    <!-- change favicon in /static/favicon.png -->
</svelte:head>