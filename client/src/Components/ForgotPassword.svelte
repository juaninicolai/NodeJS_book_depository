<script>
  import { baseURL } from "../Stores/bookStore.js";
  import { getNotificationsContext } from "svelte-notifications";
  import { navigate } from "svelte-navigator";
  import { createEventDispatcher } from 'svelte';

  const { addNotification } = getNotificationsContext();
  const dispatch = createEventDispatcher();

  let email;

  async function getPassword() {
    let password = await fetch($baseURL + "/api/sendmail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        subject: "Reset your password",
        message: "Your password is testpass123",
      }),
    });
    let response = await password.json();

    if (response === true) {
      addNotification({
        text: "Email sent with new password",
        position: "top-center",
        type: "success",
        removeAfter: 2000,
      });
    }
    navigate("/");
  }
  function backToLogin(menu) {
    dispatch('backToLogin', {
      menu: 1
    });
  }

</script>

<form on:submit|preventDefault={getPassword}>
  <h2>Forgot Password</h2>	
  <label for="email">Email</label>
  <input type="text" name="email" bind:value={email} placeholder="email"/>
  <button type="submit">Reset password</button>
  <button on:click={backToLogin}>Back</button>
</form>

<style>
  form h2{
  font-size: 2.0em;
  font-weight: 900;
  margin-bottom: 40px;
}
form{
  width: 360px;
  margin: 0 auto;
  padding: 30px;
  box-shadow: 1px 2px 3px rgba(0,0,0,0.1);
  border-radius: 10px;
  background: white;
}
input{
  padding: 10px 12px;
  border-radius: 4px;
  border: 1px solid #ddd;
  font-size: 1em;
  width: 100%;
}
label{
  display: block;
  margin: 20px 0 10px;
}
button{
  margin-top: 30px;
  border-radius: 36px;
  background: #FEE996;
  border:0;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 0.8em;
  display: block;
  padding: 10px 16px;
  letter-spacing: 2px;
}
</style>
