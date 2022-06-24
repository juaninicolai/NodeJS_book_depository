<script>
import About from "./About.svelte";

import Books from "./Books.svelte";
import { user } from '../Stores/bookStore.js';
</script>

{#if $user === null}
<h2>👋 Welcome, guest</h2>
{:else}
<h2>👋 Welcome, {$user}</h2>
{/if}

<Books/>

<style>
  h2 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 2em;
    font-weight: 100;
    text-align: center;
  }
</style>
