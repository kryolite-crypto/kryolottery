<script>
  import Bar from "./lib/bar.svelte";

  const urlParams = new URLSearchParams(window.location.search);
  const url = "http://127.0.0.1:5000"; // In production will either be testing testnet-1 to -3, but might also just be selectable
  const transactionIDTEST = "kryo:5VXdN1K7VuSC8es21bbVpmRG4GPrgG5BsYyc"; // This is just a transaction on my local chain, easier to test if it's pre-set

  let response = "";
  let contract;

  let showingLastWinner = urlParams.get("showWin") === "true" || false;
  let showingRegistrants = urlParams.get("showReg") === "true" || false;
  if (urlParams.get("address") != undefined) {
    addressInputted({ detail: { data: urlParams.get("address") } });
  }

  // Extracting this allows us to have multiple urls to fetch from later on
  // Such as testnet-1, -2, and -3
  async function post(url, path, body) {
    return new Promise((resolve, reject) => {
      fetch(`${url}${path}`, {
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      })
        .then((response) => response.json())
        .then((resObj) => {
          resolve(resObj);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  async function addressInputted(event) {
    let address = event.detail.data;

    if (!address) return;
    if (!address.startsWith("kryo:")) return; // All kryo addresses should start with this
    if (address === "kryo:test") address = transactionIDTEST;

    post(url, `/contract/${address}/call`, { method: "get_state" }) // https://kryolite-crypto.github.io/api/
      .then((contractObj) => {
        response = JSON.stringify(contractObj);
        contractObj["address"] = address;

        if (address === transactionIDTEST) {
          let list = [];
          for (let i = 0; i < 32; i++) {
            list.push(
              `kryo:${(Math.random().toString(36) + "0").slice(2, 10 + 2)}`
            );
          }
          contractObj["registrants"] = list;
        }

        contract = contractObj;
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
      let text = "";
      contract.registrants.forEach((address) => {
        text += `${address}\n`;
      });
      // @ts-ignore
      registrants.textContent = text;
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
      <p id="address" class="font-mono text-3xl m-2 text-slate-100">
        [address]
      </p>
      <p id="ticket_price" class="font-mono text-slate-100">[ticket_price]</p>
      <p id="registration_open" class="font-mono text-slate-100">
        [registration_open]
      </p>
      {#if showingRegistrants}
        <div id="registrants_container">
          <textarea
            disabled
            class="bg-slate-600 h-96 w-64 font-mono text-slate-100 rounded-lg"
            id="registrants"
            name="registrants"
          />
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
      {#if showingLastWinner}
        <div id="last_winner" class="flex flex-col items-center m-3">
          <p id="last_winner_reward" class="font-mono text-xs text-slate-100">
            [last_winner_reward]
          </p>
          <p id="last_winner_address" class="font-mono text-xs text-slate-100">
            [last_winner_address]
          </p>
        </div>
      {:else}
        <button
          class="font-mono text-xs text-slate-500"
          on:click={() => {
            showingLastWinner = true;
            setTimeout(display, 1); // Timeout so the DOM can update
          }}>(Show last winner)</button
        >
      {/if}
    </div>
  </div>
</body>

<style>
</style>
