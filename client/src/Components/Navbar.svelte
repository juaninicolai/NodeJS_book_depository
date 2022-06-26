<script>
  import { Router, Route, Link } from "svelte-navigator";
  import About from "../Pages/About.svelte";
  import Login from "../Pages/Login.svelte";
  import Books from "../Pages/Books.svelte";
  import ProtectedRoute from "./ProtectedRoute.svelte";
  import Home from "../Pages/Home.svelte";
  import Cart from "../Pages/Cart.svelte";
</script>

<Router>
  <nav>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  </nav>
  <Route path="/" component={Home} />
  <Route path="/login" component={Login} />
  <Route path="/about" component={About} />
  <ProtectedRoute path="/books" component={Books} />
  <ProtectedRoute path="/cart" component={Cart} />
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
