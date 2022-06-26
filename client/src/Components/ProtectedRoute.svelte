<script>
  import { Route } from "svelte-navigator";
  import AccessDenied from "../Pages/AccessDenied.svelte";
  import { token } from "../Stores/bookStore.js";

  export let path;
  export let component;

  $: isAuthorized = $token;
</script>

{#if isAuthorized}
  <Route {path} {component} />
{:else}
  <Route {path} component={AccessDenied} />
{/if}
