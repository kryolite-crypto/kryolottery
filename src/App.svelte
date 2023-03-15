<script>
  import Bar from "./lib/bar.svelte";
  let url = "http://127.0.0.1:5000"; // In production will either be testing testnet-1 to -3, but might also just be selectable
  const transactionIDTEST = "kryo:5VXdN1K7VuSC8es21bbVpmRG4GPrgG5BsYyc"; // This is just a transaction on my local chain, easier to test if it's pre-set
  let response = "";

  async function addressInputted(event) {
    let address = event.detail.data;
    if (!address) return;
    if (!address.startsWith("kryo:")) return;
    if (address === "kryo:test") address = transactionIDTEST;

    fetch(`${url}/contract/${address}/call`, {
      body: '{"method": "get_state"}',
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    })
      .then((response) => response.json())
      .then((transactionObj) => {
        console.log(transactionObj);
        response = JSON.stringify(transactionObj);
      })
      .catch((error) => {
        console.error(error);
      });
  }
</script>

<body>
  <Bar
    input_placeholder_text="Enter lottery address"
    submit_button_text="Load"
    on:inputSubmitted={addressInputted}
  />
  {#if response.length > 1}
    <p>Response: {response}</p>
  {/if}
</body>

<style>
  p {
    color: var(--color);
  }
</style>
