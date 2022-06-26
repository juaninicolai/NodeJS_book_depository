<script>
  import { baseURL } from "../Stores/bookStore.js";
  import { getNotificationsContext } from "svelte-notifications";
  import { navigate } from "svelte-navigator";

  const { addNotification } = getNotificationsContext();

  let email;

  async function getPassword() {
    let password = await fetch($baseURL + "/api/sendmail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        subject: "Reset your password",
        message: "Your new password is testpass",
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
</script>

<form on:submit|preventDefault={getPassword}>
  <input type="text" bind:value={email} placeholder="email" />
  <button type="submit">Reset password</button>
</form>

<style>
</style>
