<script>
  import Footer from "./Components/Footer.svelte";
  import Notifications from "svelte-notifications";
  import Navbar from "./Components/Navbar.svelte";
</script>

<Notifications>
  <main>
    <Navbar />
    <Footer />
  </main>
</Notifications>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
    min-height: calc(100vh - 100px);
  }
  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
