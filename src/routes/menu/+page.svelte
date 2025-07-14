<script>
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";

    // import assets from $lib/assets
    import logoImage from "$lib/assets/images/game-logo.png";

    // default parameters passed into the slot from +layout.svelte
    export let screenWidth = 960;
    export let screenHeight = 540;

    onMount(() => {
        console.log(`screenWidth: ${screenWidth}, screenHeight: ${screenHeight}`);
    });
</script>

<!-- use foreignObject to add HTML UI elements such as buttons, text, etc. -->
<foreignObject width="100%" height="100%">
    <div style:display="flex" style:flex-direction="column" style:align-items="center" style:justify-content="center"
        style:width="100%" style:height="100%">
        <img src={logoImage} alt="Svelte" style:width="300px" style:height="auto" />
        <br />
        <button on:click={() => {
            goto("../level");
            // make sure to use ../ due to relative paths and trailingSlash=always
        }}>Play</button>
    </div>
</foreignObject>