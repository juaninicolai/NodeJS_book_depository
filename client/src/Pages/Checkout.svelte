<script>
  import { baseURL, cartItems, user } from "../Stores/bookStore";
  import Button from '../Shared/Button.svelte';
  import { navigate } from "svelte-navigator";
  import { io } from "socket.io-client";
  import { getNotificationsContext } from "svelte-notifications";

  
  const { addNotification } = getNotificationsContext();
  $: booksInCart = [...$cartItems];
  
  function calculateTotal() {
    let total = 0;
    let amount = booksInCart.forEach((book) => {
      total = total + book.price;
      return total;
    })
    return total;
  }

  function showBookTitles() {
    let titles = booksInCart.map(book => book.title);
    return titles;
  }

  async function reduceInventory() {
    await fetch($baseURL + "/api/completeOrder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({
        books: $cartItems
      })
    });
  };

  async function sendEmail() {
      let order = await fetch($baseURL + "/api/sendmail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: $user,
        subject: "Confirmation order",
        message: `You have bought: ${showBookTitles()}. \n Total amount: ${calculateTotal()} DKK.`
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
    };
  ;}

  async function submitOrder() {

    await reduceInventory();
    await sendEmail();
    // calculateTotal();
    // showBookTitles();

    const socket = io("https://bookdepository.herokuapp.com");
    socket.emit("reduceInventory");

    cartItems.update((cartItems) => {
      cartItems = [];
      return cartItems;
    });

    navigate("/");
    }
</script>

<form on:submit|preventDefault={submitOrder} method="post">
            <div class="fields">
              <label class="labelStyle" for="cardname">Card Name</label>
              <input
                name="cardname"
                type="text"
                id="cardname"
                placeholder="Alan Applewood"
                required
              />
            </div>
            <div class="fields">
              <label class="labelStyle" for="cardnumber">Card Number</label>
              <input
                name="cardnumber"
                type="text"
                id="cardnumber"
                placeholder="5567 4458 8723 0985"
              />
            </div>
            <div class="fields">
              <label class="labelStyle" for="expdate">Exp. Date</label>
              <input
                name="expdate"
                type="text"
                id="expdate"
                placeholder="01/30"
              />
            </div>
            <div class="fields">
              <label class="labelStyle" for="cvc">CVC</label>
              <input name="cvc" type="text" id="cvc" placeholder="012" />
            </div>
            <br>
            <Button order="secondary">Pay</Button>
    </form>

<style>
    form{
  width: 360px;
  margin: 0 auto;
  padding: 30px;
  box-shadow: 1px 2px 3px rgba(0,0,0,0.1);
  border-radius: 10px;
  background: white;
}

.fields {
    display: flex;
    flex-direction: column;
    margin: var(--half-margin);
}

.labelStyle {
    margin-bottom: 0.25rem;}
</style>