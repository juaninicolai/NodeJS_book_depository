<script>
  export let showEditModal = false;
  export let isEditPromo = false;
</script>

{#if showEditModal}
  <div class="edit-backdrop" class:edit-promo={isEditPromo} on:click|self>
    <div class="edit-modal">
      <slot />
    </div>
  </div>
{/if}

<style>
  .edit-backdrop {
    width: 100%;
    height: 100%;
    position: relative;
    background: rgba(0, 0, 0, 0.8);
  }
  .edit-modal {
    padding: 10px;
    border-radius: 10px;
    max-width: 400px;
    margin: 10% auto;
    text-align: center;
    background: white;
  }
  .edit-promo .edit-modal {
    background: crimson;
    color: white;
  }
</style>
