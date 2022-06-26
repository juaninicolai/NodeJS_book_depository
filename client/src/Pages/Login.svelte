<script>
  import { useNavigate } from "svelte-navigator";
  import { baseURL, token } from "../Stores/bookStore.js";
  import { getNotificationsContext } from "svelte-notifications";
  import { user } from "../Stores/bookStore.js";
  import ForgotPassword from "../Components/ForgotPassword.svelte";

  const { addNotification } = getNotificationsContext();

  let email;
  let password;
  const navigate = useNavigate();

  async function login() {
    const auth = await fetch($baseURL + "/auth/login", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email,
        password
      }),
    });

    const data = await auth.json();
    if (data.errors) {
      addNotification({
        text: `Invalid email or password`,
        position: "top-center",
        type: "warning",
        removeAfter: 2000,
      });
    };

    if (data.user) {
      user.set(data.email);
      token.set(data.token);
      document.cookie = `jwt=${data.token}`;
      navigate("/");
    }
  }

  export let menu = 1;
  function forgotPassword() {
    menu = 2;
  }
</script>


{#if menu === 1}
<form on:submit|preventDefault={login}>
	<h2>Log in</h2>
	<label for="email">Email</label>
	<input type="text" name="email" bind:value={email} required/>
	<label for="password">Password</label>
	<input type="password" name="password" bind:value={password} required/>
	<button>Log in</button>
  <button on:click={forgotPassword}>Forgot Password</button>
</form>
{:else}
  <ForgotPassword on:backToLogin={()=> menu = 1}/>
{/if}

<style>
/* google fonts */
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap');

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
