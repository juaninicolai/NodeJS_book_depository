<script>
  import { baseURL, cartItems, token } from "../Stores/bookStore.js";
  import { onMount } from "svelte";
  import Button from "../Shared/Button.svelte";
  import Card from "../../src/Shared/Card.svelte";
  import { getNotificationsContext } from "svelte-notifications";

  let books = [];
  let filteredBooks = [];
  let bookGenre = "All";
  let emptyList = "There are no books with this genre";
  let response;

  onMount(async () => {
    const response = await fetch($baseURL + "/api");
    const { data } = await response.json();
    books = data;
  });

  async function getBookGenre() {
    if (bookGenre === "All") {
      response = await fetch($baseURL + "/api");
      const { data } = await response.json();
      return books = data;
     } else {
      filteredBooks = books.filter((book) => book.genre === bookGenre);
      books = filteredBooks;
     } 
  }

  const { addNotification } = getNotificationsContext();
  function addBookToCart(book) {
    cartItems.update((cartItems) => {
      cartItems.push(book);
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      console.log(cartItems);
      return cartItems;
    });

    addNotification({
      text: `${book.title} added to the cart`,
      position: "top-center",
      type: "success",
      removeAfter: 2000,
    });
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
  {#each books as book (book._id)}
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
        <div class="buy">
          <Button
            order="secondary"
            on:click={() => {
              addBookToCart(book);
            }}>Add to Cart</Button
          >
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
    justify-content:space-around;
    align-items: center;
  }
</style>
