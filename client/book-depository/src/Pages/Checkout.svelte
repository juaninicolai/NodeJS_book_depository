<script>
  import { baseURL, cartItems } from "../Stores/bookStore";
  import Button from '../Shared/Button.svelte';
  import { navigate } from "svelte-navigator";
  
  $: booksInCart = [...$cartItems];

 async function submitOrder() {
    // let order = await fetch($baseURL + "/api/sendmail", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     email,
    //     subject: "Confirmation order",
    //     message: `You have bought: ${JSON.stringify(booksInCart)}`,
    //   }),
    // });
    // let response = await order.json();
    // if (response === true) {
    //   addNotification({
    //     text: "Thank you for your order, you will recieve a confirmation email soon.",
    //     position: "top-center",
    //     type: "success",
    //     removeAfter: 2000,
    //   });
    // }
    booksInCart = [];
    localStorage.setItem("cartItems", JSON.stringify(booksInCart));
    navigate("/");
  }
</script>

<form>
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
                placeholder="5567 4458"
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
            <Button order="secondary" on:click={submitOrder}>Proceed to checkout</Button>
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