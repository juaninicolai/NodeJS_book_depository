<script>
  export let showAddModal = false;
  export let isAddPromo = false;
</script>

{#if showAddModal}
  <div class="add-backdrop" class:add-promo={isAddPromo} on:click|self>
    <div class="add-modal">
      <slot />
    </div>
  </div>
{/if}

<style>
  .add-backdrop {
    width: 100%;
    height: 100%;
    position: relative;
    background: rgba(0, 0, 0, 0.8);
  }
  .add-modal {
    padding: 10px;
    border-radius: 10px;
    max-width: 400px;
    margin: 10% auto;
    text-align: center;
    background: white;
  }
  .add-promo .add-modal {
    background: crimson;
    color: white;
  }
</style>
