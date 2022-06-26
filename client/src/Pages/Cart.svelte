<script>
  import { cartItems, baseURL, token } from "../Stores/bookStore.js";
  import Card from "../Shared/Card.svelte";
  import Button from "../Shared/Button.svelte";
  import { getNotificationsContext } from "svelte-notifications";
  import { navigate } from "svelte-navigator";

  const { addNotification } = getNotificationsContext();

  $: booksInCart = [...$cartItems];

  function removeFromCart(item) {
    let updatedCart = booksInCart.filter((book) => book._id != item._id);
    booksInCart = updatedCart;
    addNotification({
      text: `${item.title} removed from cart`,
      position: "top-center",
      type: "warning",
      removeAfter: 2000,
    });
    cartItems.update((cartItems)=> {
      cartItems = [...booksInCart];
      return cartItems;
    });
  }

  async function goToCheckout() {
  await fetch($baseURL + "/api/checkout", {
      method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
    })
    .then(response => {
      if (response.status === 200) {
        $token = true;
        navigate("/checkout");
      } else {
        addNotification({
          text: `You must be logged in to checkout`,
          position: "top-center",
          type: "warning",
          removeAfter: 2000,
        });
        navigate("/login");
      }
    })
    };

    function goToHome() {
      navigate("/");
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
        <p>Inventory: {item.inventory}</p>
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
<Button order="secondary" on:click={goToCheckout}>Proceed to checkout</Button>
{:else}
<h3>The cart is empty</h3>
<!-- svelte-ignore a11y-missing-attribute -->
<h4><a style="text-decoration: underline;" on:click={goToHome}>Shop today's deals</a></h4>
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
