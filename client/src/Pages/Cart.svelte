<script>
  import { cartItems, baseURL } from "../Stores/bookStore.js";
  import Card from "../Shared/Card.svelte";
  import Button from "../Shared/Button.svelte";
  import { getNotificationsContext } from "svelte-notifications";
  import { navigate } from "svelte-navigator";

  import { onMount } from "svelte";
  onMount(() => {
    console.log($cartItems);
  });

  const { addNotification } = getNotificationsContext();

  $: booksInCart = [...$cartItems];

  function removeFromCart(item) {
    let updatedCart = booksInCart.filter((book) => book.id != item.id);
    booksInCart = updatedCart;
    addNotification({
      text: `${item.title} removed from cart`,
      position: "top-center",
      type: "warning",
      removeAfter: 2000,
    });
    localStorage.setItem("cartItems", JSON.stringify(booksInCart));
  }

  //type in your email to get a custom email instead of sending to the test user
  let email = localStorage.getItem("email");

  async function submitOrder() {
    let order = await fetch($baseURL + "/api/sendmail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        subject: "Confirmation order",
        message: `You have bought: ${JSON.stringify(booksInCart)}`,
      }),
    });
    let response = await order.json();
    if (response === true) {
      addNotification({
        text: "Thank you for your order, you will recieve a confirmation email soon.",
        position: "top-center",
        type: "success",
        removeAfter: 2000,
      });
    }
    booksInCart = [];
    localStorage.setItem("cartItems", JSON.stringify(booksInCart));
    navigate("/books");
  }
</script>

<h2>Cart</h2>

<a on:click={() => navigate("/books")}>Back to Books</a>

<div class="cart-list">
  {#each booksInCart as item (item.id)}
    <Card>
      <div>
        <h4>{item.title}</h4>
        <p>Author: {item.author}</p>
        <p>Genre: {item.genre}</p>
        <p>Price: {item.price}</p>
      </div>
      <Button
        on:click={() => {
          removeFromCart(item);
        }}>Remove</Button
      >
    </Card>
  {/each}
</div>

<Button order="secondary" on:click={submitOrder}>Pay</Button>

<style>
  h2 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 2em;
    font-weight: 100;
  }
  .cart-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
  }
</style>
