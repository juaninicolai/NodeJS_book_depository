<script>
  import { baseURL, cartItems, token } from "../Stores/bookStore.js";
  import { onMount } from "svelte";
  import Button from "../Shared/Button.svelte";
  import Card from "../../src/Shared/Card.svelte";
  import { Link } from "svelte-navigator";
  import { getNotificationsContext } from "svelte-notifications";

  // onMount(async () => {
  //   const login = await fetch("http://localhost:3000/auth/login/protected");
  //   const response = await login.json();
  //   console.log(response);
  // });

  const logout = () => {
    localStorage.clear();
    token.set(localStorage.getItem("isLogged"));
  };

  let books = [];

  onMount(async () => {
    const response = await fetch($baseURL + "/api/books");
    const { data } = await response.json();
    books = data;
  });

  const { addNotification } = getNotificationsContext();

  function addBookToCart(book) {
    cartItems.update((cartItems) => {
      cartItems.push(book);
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return cartItems;
    });

    addNotification({
      text: `${book.title} added to the cart`,
      position: "top-center",
      type: "success",
      removeAfter: 2000,
    });
  }

  let user = localStorage.getItem("email");
</script>

<h2>Welcome {user}</h2>
<ul>
  <li>
    <Link to="/" on:click={logout}>Logout</Link>
  </li>
  <li>
    <Link to="/cart">Cart</Link>
  </li>
</ul>

<div class="list">
  {#each books as book (book.id)}
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
  {/each}
</div>

<style>
  h2 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 2em;
    font-weight: 100;
  }
  .list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
  }
  ul {
    display: flex;
    justify-content: center;
    flex-direction: row;
    align-items: center;
    text-decoration: none;
    list-style-type: none;
  }
  li {
    margin-right: 5px;
  }
</style>
