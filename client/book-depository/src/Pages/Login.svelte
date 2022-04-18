<script>
  import { useNavigate } from "svelte-navigator";
  import { baseURL } from "../Stores/bookStore.js";
  import { getNotificationsContext } from "svelte-notifications";
  import { token } from "../Stores/bookStore.js";
  import ForgotPassword from "../Components/ForgotPassword.svelte";

  const { addNotification } = getNotificationsContext();

  let email;
  let password;
  const navigate = useNavigate();

  //email: user@test.com
  //pass: testpass
  async function login() {
    const auth = await fetch($baseURL + "/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const response = await auth.json();
    localStorage.setItem("isLogged", response.authOK);
    localStorage.setItem("email", response.email);
    token.set(localStorage.getItem("isLogged"));
    checkLogin();
  }

  function checkLogin() {
    if ($token === "true") {
      navigate("/books", { replace: true });
    } else {
      addNotification({
        text: "Wrong credentials",
        position: "top-center",
        type: "warning",
        removeAfter: 2000,
      });
    }
  }

  export let menu = 1;
  function menu2() {
    menu = 2;
  }
</script>

<h2>Login</h2>

<!-- 
  email: user@test.com
  pass: testpass 
-->

{#if menu === 1}
  <form on:submit|preventDefault={login}>
    <input type="text" bind:value={email} placeholder="email" />
    <input type="password" bind:value={password} placeholder="password" />
    <button type="submit">Login</button>
  </form>
  <button class="forgot-btn" on:click={menu2}><p>Forgot Password</p></button>
{:else}
  <ForgotPassword />
{/if}

<style>
  h2 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 2em;
    font-weight: 100;
  }
  .forgot-btn {
    width: 100px;
    height: 40px;
  }
  .forgot-btn p {
    font-size: 10px;
  }
  p {
    margin: 0;
  }
</style>
