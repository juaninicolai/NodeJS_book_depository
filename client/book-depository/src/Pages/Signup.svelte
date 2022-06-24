<script>
  import { useNavigate } from "svelte-navigator";
  import { baseURL, user } from "../Stores/bookStore.js";

    let email;
    let password;
    let emailError;
    let passwordError;
    const navigate = useNavigate();

    async function signup() {
        emailError = "";
        passwordError = "";

        const auth = await fetch($baseURL + "/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
            email,
            password,
            }),
        });

        const data = await auth.json();

        if (data.errors) {
            emailError = data.errors.email;
            passwordError = data.errors.password;
        };

        if (data.user) {
            console.log(data.user);
            localStorage.setItem('user', data.email);
            user.set(localStorage.getItem('user'));
            console.log($user);
            navigate("/");
        };
  };
</script>

<form on:submit|preventDefault={signup}>
	<h2>Sign up</h2>
	<label for="email">Email</label>
	<input type="text" name="email" bind:value={email} required/>
	<div class="email error" contenteditable="false" bind:textContent={emailError} />
	<label for="password">Password</label>
	<input type="password" name="password" bind:value={password} required/>
	<div class="password error" contenteditable="false" bind:textContent={passwordError}/>
	<button>Sign up</button>
</form>

<style>

    /* google fonts */
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap');

form h2{
  font-size: 2.4em;
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
.error{
  color: #ff0099;
  margin: 10px 2px;
  font-size: 0.8em;
  font-weight: bold;
}
</style>