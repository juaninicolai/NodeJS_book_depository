<script>
  import { Router, Route, Link, navigate } from "svelte-navigator";
  import About from "../Pages/About.svelte";
  import Login from "../Pages/Login.svelte";
  import Signup from "../Pages/Signup.svelte";
  import ProtectedRoute from "./ProtectedRoute.svelte";
  import Home from "../Pages/Home.svelte";
  import Cart from "../Pages/Cart.svelte";
  import Checkout from "../Pages/Checkout.svelte";
  import { baseURL, token, user } from '../Stores/bookStore.js';
  
  const logout = async () => {
    await fetch($baseURL + "/auth/logout")
    .then(res => {
      if(res.status === 200){
        document.cookie = `jwt= \" \" `;
        token.set(null);
        user.set(null);
      }
      window.location.reload();
    });
    
  };
</script>

<Router>
  <nav>
    <ul >
      <li>
        <Link to="/" style="text-decoration: none">Home |</Link>
      </li>
      <li>
        <Link to="/about" style="text-decoration: none">About |</Link>
      </li>
      {#if $user === null }
      <li>
        <Link to="/login" style="text-decoration: none">Log in |</Link>
      </li>
      <li>
        <Link to="/signup" style="text-decoration: none">Sign up |</Link>
      </li>
      {:else}
      <li>
        <Link to="/" on:click={logout} style="text-decoration: none">Logout |</Link>
      </li>
      {/if}
      <li>
        <Link to="/cart" style="text-decoration: none">Cart</Link>
      </li>
    </ul>
  </nav>
  <Route path="/" component={Home} />
  <Route path="/signup" component={Signup} />
  <Route path="/login" component={Login} />
  <Route path="/about" component={About} />
  <Route path="/cart" component={Cart} /> 
  <ProtectedRoute path="/checkout" component={Checkout} />

</Router>

<style>
  ul {
    display: flex;
    justify-content: flex-end;
    flex-direction: row;
    align-items: center;
    text-decoration: none;
    list-style-type: none;
  }

  li {
    margin-right: 5px;
  }
</style>
