<script>
  import { baseURL } from "../Stores/bookStore.js";
  import Card from "../Shared/Card.svelte";
  import { onMount } from "svelte";

  let books = [];
  let bookGenre;
  let emptyList;
  let response;

  onMount(async () => {
    const response = await fetch($baseURL + "/api/books");
    const { data } = await response.json();
    books = data;
  });

  async function getBookGenre() {
    if (bookGenre === "All") {
      response = await fetch($baseURL + "/api/books");
      const { data } = await response.json();
      books = data;
    } else {
      response = await fetch($baseURL + "/api/books/genre/" + bookGenre);
      const { data } = await response.json();
      books = data;
    }
  }
</script>

<form on:submit|preventDefault={getBookGenre}>
  <br />
  <select bind:value={bookGenre}>
    <option value="All">All</option>
    <option value="Fantasy">Fantasy</option>
    <option value="Self-Help">Self-help</option>
    <option value="Sci-Fi">History</option>
    <option value="Tragedy">Tragedy</option>
    <option value="Adventure">Adventure</option>
    <option value="Thriller">Thriller</option>
    <option value="Novel">Novel</option>
  </select>
  <button>Filter</button>
</form>

<div class="list">
  {#each books as book (book.id)}
    {#if books.length === 0}
      <h3>{emptyList}</h3>
    {:else}
      <Card>
        <div>
          <h4>{book.title}</h4>
          <p>Author: {book.author}</p>
          <p>Genre: {book.genre}</p>
          <p>Price: {book.price} DKK</p>
        </div>
      </Card>
    {/if}
  {/each}
</div>

<style>
  .list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
  }
</style>
