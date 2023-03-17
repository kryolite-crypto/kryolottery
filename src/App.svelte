<script>
  import Bar from "./lib/bar.svelte";

  const urlParams = new URLSearchParams(window.location.search);

  if (urlParams.get("address") != undefined) {
    addressInputted({ detail: { data: urlParams.get("address") } });
  }

  const url = "http://127.0.0.1:5000"; // In production will either be testing testnet-1 to -3, but might also just be selectable
  const transactionIDTEST = "kryo:5VXdN1K7VuSC8es21bbVpmRG4GPrgG5BsYyc"; // This is just a transaction on my local chain, easier to test if it's pre-set

  let response = "";
  let contract;

  let showingLastWinner = false;
  let showingRegistrants = false;

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
        contract = contractObj;
        showingLastWinner = false;
        showingRegistrants = false;
        display();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async function display() {
    if (!contract) return;
    // @ts-ignore
    address.innerHTML = `${contract.address}`;
    // @ts-ignore
    ticket_price.innerHTML = `ticket_price : ${contract.ticket_price}`;
    // @ts-ignore
    registration_open.innerHTML = `registration_open : ${contract.registration_open}`;
    if (showingRegistrants) {
      // @ts-ignore
      registrants.innerHTML = `registrants : ${contract.registrants}`;
    } else {
      // @ts-ignore
      registrants.innerHTML = `( Show registrants [${contract.registrants.length}] )`;
    }

    if (showingLastWinner) {
      // @ts-ignore
      last_winner_reward.innerHTML = `last_winner_reward : ${contract.last_winner.reward}`;
      // @ts-ignore
      last_winner_address.innerHTML = `last_winner_address : ${contract.last_winner.address}`;
    }
  }
</script>

<body>
  <Bar
    input_placeholder_text="Enter lottery address"
    submit_button_text="Load"
    on:inputSubmitted={addressInputted}
  />
  <div class="flex flex-col items-center">
    <div
      id="lotteryDisplay"
      class="flex flex-col items-center bg-zinc-900 rounded-lg w-11/12"
    >
      <p id="address" class="font-mono text-3xl m-2">[address]</p>
      <p id="ticket_price" class="font-mono">[ticket_price]</p>
      <p id="registration_open" class="font-mono">[registration_open]</p>
      {#if showingRegistrants}
        <div id="registrants_container">
          <p id="registrants" class="font-mono">[registrants]</p>
        </div>
      {:else}
        <button
          class="font-mono text-xs text-slate-500"
          id="registrants"
          on:click={() => {
            showingRegistrants = !showingRegistrants;
            setTimeout(display, 1);
          }}>( Show registrants [?] )</button
        >
      {/if}
      {#if showingLastWinner === true}
        <div id="last_winner" class="flex flex-col items-center m-3">
          <p id="last_winner_reward" class="font-mono text-xs">
            [last_winner_reward]
          </p>
          <p id="last_winner_address" class="font-mono text-xs">
            [last_winner_address]
          </p>
        </div>
      {:else}
        <button
          class="font-mono text-xs text-slate-500"
          on:click={() => {
            showingLastWinner = true;
            setTimeout(display, 1);
          }}>(Show last winner)</button
        >
      {/if}
    </div>
  </div>
</body>

<style>
  p {
    color: var(--color);
  }
</style>
