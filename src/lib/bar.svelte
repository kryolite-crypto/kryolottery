<script>
  export let input_placeholder_text;
  export let submit_button_text;
  import { createEventDispatcher } from "svelte";
  let input = "";

  const dispatch = createEventDispatcher();

  function inputSubmitted() {
    dispatch("inputSubmitted", {
      data: input,
    });
  }
</script>

<div id="barContainer">
  <input bind:value={input} placeholder={input_placeholder_text} />
  <button on:click={inputSubmitted}>{submit_button_text}</button>
</div>

<style>
  #barContainer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  #barContainer * {
    background-color: #252525;
    border: solid 1px aliceblue;
    color: aliceblue;
  }

  #barContainer input {
    margin: 0px;
    width: 90%;
    height: 2rem;
    font-size: 2rem;
    font-family: monospace;
  }

  #barContainer button {
    margin: 0px;
    width: 4rem;
    height: 4rem;
    font-size: 1rem;
    font-family: monospace;
  }
</style>
