<script>
  export let buttons = [];
</script>

<div id="navbar" class="mb-10 mt-1 flex justify-between">
  <pre class="text-white">
█▄▀ █▀▄ ▀▄▀ ▄▀▄ █   █ ▀█▀ ██▀
█ █ █▀▄  █  ▀▄▀ █▄▄ █  █  █▄▄
  </pre>
  <div id="buttoncontainer" class="flex flex-row">
    {#each buttons as button}
      <button
        on:click={() => {
          window.location.href = button.link;
        }}
        class="hover:bg-blue-200 text-gray-800 bg-slate-200 rounded mr-3 scalebutton"
      >
        {button.text}
      </button>
    {/each}
  </div>
</div>

<style>
  .scalebutton {
    height: 3rem;
    width: 7rem;
  }
  @media only screen and (max-width: 768px) {
    .scalebutton {
      height: 2rem;
      width: 100%;
    }
    #navbar {
      flex-direction: column;
      align-items: center;
    }
    #buttoncontainer {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(2, 1fr);
      grid-column-gap: 0.5rem;
      grid-row-gap: 0.5rem;
    }
  }
</style>
