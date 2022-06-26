<script>
  import { Link } from "svelte-navigator";
  import Genre from "../Pages/Genres.svelte";
</script>

<h2>👋 Welcome to the home page</h2>

<h4>Buy our books <Link to="/books">here</Link></h4>

<p>Find books by genre 👇</p>
<Genre />

<style>
  h2 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 2em;
    font-weight: 100;
    text-align: center;
  }
</style>
