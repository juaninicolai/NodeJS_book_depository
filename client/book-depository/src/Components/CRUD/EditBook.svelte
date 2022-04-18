<script>
  import Button from "../../Shared/Button.svelte";
  import { baseURL } from "../../Stores/bookStore";
  import { createEventDispatcher } from "svelte";

  let dispatch = createEventDispatcher();

  let title;
  let author;
  let genre;
  let price;
  let stock;

  async function editBook(id) {
    id = localStorage.getItem("book_id");
    const book = await fetch($baseURL + "/api/books/" + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: title,
        author: author,
        genre: genre,
        price: price,
        stock: stock,
      }),
    });
    dispatch("editBook", book);
  }
</script>

<h2>Edit a Book</h2>

<form on:submit={editBook}>
  <input type="text" placeholder="Title" bind:value={title} />
  <input type="text" placeholder="Author" bind:value={author} />
  <input type="text" placeholder="Genre" bind:value={genre} />
  <input type="number" placeholder="Price" bind:value={price} />
  <input type="number" placeholder="Stock" bind:value={stock} />
  <Button type="secondary">Edit Book</Button>
</form>

<style>
  h2 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 2em;
    font-weight: 100;
  }
</style>
