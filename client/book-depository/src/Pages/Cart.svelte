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


  function checkout() {
    navigate("/checkout")
  }
</script>

<h2>Cart</h2>

<div class="cart-list">
  {#each booksInCart as item (item._id)}
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
<br>

{#if booksInCart.length > 0}
<Button order="secondary" on:click={checkout}>Proceed to checkout</Button>
{:else}
<h3>The cart is empty</h3>
<h4><a href="/">Shop today's deals</a></h4>
{/if}

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
    justify-content:space-around;
    align-items: center;
  }
</style>
