<script>
  import { baseURL, cartItems } from "../Stores/bookStore.js";
  import { onMount } from "svelte";
  import Button from "../Shared/Button.svelte";
  import Card from "../../src/Shared/Card.svelte";
  import { getNotificationsContext } from "svelte-notifications";
  import { io } from "socket.io-client";

  $: books = [];
  let filteredBooks = [];
  let bookGenre;
  let emptyList = "Sorry, there are no books with the genre"

  onMount(async () => {
    const response = await fetch($baseURL + "/api");
    const { data } = await response.json();
    books = data;
    const socket = io("http://localhost:3000" || process.env.BASE_URL);
    socket.on("updateInventory", () => {
      getBookGenre();
    });
  });

  async function getBookGenre() {
    if (bookGenre === "All") {
      const response = await fetch($baseURL + "/api", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Credentials: "include",
        }
      });
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
<br>
<div class="list">
  {#each books as book (book._id)}
    {#if books.length === 0}
      <h3>{emptyList}</h3>
    {:else}
      <Card>
        <div style="font-size: 15px;">
          <h4 style="font-size: 20px;">{book.title}</h4>
          <p>Author: {book.author}</p>
          <p>Genre: {book.genre}</p>
          <p id="price">{book.price} DKK</p>
          {#if book.inventory === undefined}
          <p>Inventory: 0</p>
          {:else}
          <p>Inventory: {book.inventory}</p>
          {/if}
        </div>
        {#if book.inventory > 0}
        <div class="buy">
          <Button
            order="secondary"
            on:click={() => {
              addBookToCart(book);
            }}>Add to Cart</Button
          >
        </div>
        {:else}
        <p style="color:red">Out of stock</p>
        {/if}
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

  #price {
    color: green;
  }
</style>
