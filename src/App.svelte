<script>
  import Bar from "./lib/bar.svelte";
  import LotteryDisplay from "./lib/lotteryDisplay.svelte";
  const url = "http://127.0.0.1:5000"; // In production will either be testing testnet-1 to -3, but might also just be selectable
  const transactionIDTEST = "kryo:5VXdN1K7VuSC8es21bbVpmRG4GPrgG5BsYyc"; // This is just a transaction on my local chain, easier to test if it's pre-set

  let response = "";
  let displayData = [];

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
      .then((contractObj) => {
        response = JSON.stringify(contractObj);
        contractObj["address"] = address;
        display(contractObj);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async function display(contract) {
    console.log(contract);
    displayData.push(
      {
        text: `${contract.address}`,
        color: `blue`,
      },
      {
        text: `Entries are ${contract.registeration_open ? "open" : "closed"}`,
        color: `${contract.registeration_open ? "green" : "red"}`,
      },
      {
        text: `Price: ${contract.ticket_price}`,
        color: "white",
      }
    );
    // If last winner isn't null, display it
    if (contract.last_winner.address != "kryo:11111111111111111111111111") {
      displayData.push(
        {
          text: `Last winner: ${contract.last_winner.address}`,
          color: "white",
          size: "1em",
        },
        {
          text: `Last won prize: ${contract.last_winner.reward}`,
          color: "white",
          size: "1em",
        }
      );
    }
    displayData = displayData;
  }
</script>

<body>
  <Bar
    input_placeholder_text="Enter lottery address"
    submit_button_text="Load"
    on:inputSubmitted={addressInputted}
  />
  {#if displayData.length > 0}
    <LotteryDisplay bind:displayable={displayData} />
  {/if}
</body>

<style>
  p {
    color: var(--color);
  }
</style>
