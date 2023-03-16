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
    // @ts-ignore
    address.innerHTML = `${contract.address}`;
    // @ts-ignore
    ticket_price.innerHTML = `ticket_price : ${contract.ticket_price}`;
    // @ts-ignore
    registration_open.innerHTML = `registration_open : ${contract.registration_open}`;
    // @ts-ignore
    registrants.innerHTML = `registrants : ${contract.registrants}`;
    // @ts-ignore
    last_winner_reward.innerHTML = `last_winner_reward : ${contract.last_winner.reward}`;
    // @ts-ignore
    last_winner_address.innerHTML = `last_winner_address : ${contract.last_winner.address}`;
  }
</script>

<body>
  <Bar
    input_placeholder_text="Enter lottery address"
    submit_button_text="Load"
    on:inputSubmitted={addressInputted}
  />
  <div id="lotteryDisplay" class="flex flex-col items-center">
    <p id="address" class="font-mono text-3xl m-2">[address]</p>
    <p id="ticket_price" class="font-mono">[ticket_price]</p>
    <p id="registration_open" class="font-mono">[registration_open]</p>
    <div id="registrants_container">
      <p id="registrants" class="font-mono">[registrants]</p>
    </div>
    <div id="last_winner" class="flex flex-col items-center m-3">
      <p id="last_winner_reward" class="font-mono text-xs">
        [last_winner_reward]
      </p>
      <p id="last_winner_address" class="font-mono text-xs">
        [last_winner_address]
      </p>
    </div>
  </div>
</body>

<style>
  p {
    color: var(--color);
  }
</style>
