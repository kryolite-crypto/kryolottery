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

<div id="barContainer" class="mb-10 flex justify-between">
  <input
    class="bg-slate-700 w-3/4 text-white m-1"
    bind:value={input}
    placeholder={input_placeholder_text}
  />
  <button
    class="bg-green-300 rounded-sm text-black ml-1 h-12 w-12"
    on:click={inputSubmitted}>{submit_button_text}</button
  >
</div>

<style>
</style>
