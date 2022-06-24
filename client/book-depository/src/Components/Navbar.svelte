<script>
  import { Router, Route, Link, navigate } from "svelte-navigator";
  import About from "../Pages/About.svelte";
  import Login from "../Pages/Login.svelte";
  import Signup from "../Pages/Signup.svelte";
  import ProtectedRoute from "./ProtectedRoute.svelte";
  import Home from "../Pages/Home.svelte";
  import Cart from "../Pages/Cart.svelte";
  import Checkout from "../Pages/Checkout.svelte";
  import { user } from '../Stores/bookStore.js';

  const logout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };
</script>

<Router>
  <nav>
    <ul>
      <li>
        <Link to="/">Home |</Link>
      </li>
      <li>
        <Link to="/about">About |</Link>
      </li>
      {#if $user === null }
      <li>
        <Link to="/login">Log in |</Link>
      </li>
      <li>
        <Link to="/signup">Sign up |</Link>
      </li>
      {:else}
      <li>
        <Link to="/" on:click={logout}>Logout |</Link>
      </li>
      {/if}
      <li>
        <Link to="/cart">Cart</Link>
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
