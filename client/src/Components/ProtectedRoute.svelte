<script>
  import { Route } from "svelte-navigator";
  import Login from "../Pages/Login.svelte";
  import { token } from "../Stores/bookStore.js";

  export let path;
  export let component;

  $: isAuthorized = $token;
</script>

{#if isAuthorized === true}
  <Route {path} {component} />
{:else}
  <Route {path} component={Login} />
{/if}
