<script>
  import Bar from "./lib/bar.svelte";

  const urlParams = new URLSearchParams(window.location.search);
  const url = "https://testnet-1.kryolite.io"; // TODO: Check multiple places
  const KRYO_DIVISION = 1000000;

  let response = "";
  let contract;

  let showingLastWinner = urlParams.get("showWin") === "true" || false;
  let showingRegistrants = urlParams.get("showReg") === "true" || false;
  if (urlParams.get("address") != undefined) {
    addressInputted({ detail: { data: urlParams.get("address") } });
  } else {
    // By default give this address:
    addressInputted({
      detail: { data: "kryo:5VWWgFqhghrZvPmmXa48ajnd7vTawvYgbT4f" },
    });
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
        .then((response) =>
          response.json().catch((error) => {
            console.error(error);
          })
        )
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

    post(url, `/contract/${address}/call`, { method: "get_state" }) // https://kryolite-crypto.github.io/api/
      .then((contractObj) => {
        response = JSON.stringify(contractObj);
        contractObj["address"] = address;
        contract = contractObj;
        console.log(contract);
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
  {#if contract}
    <div class="flex flex-col items-center">
      <div
        id="lotteryDisplay"
        class="flex flex-col items-center bg-zinc-900 rounded-lg w-11/12"
      >
        <p class="font-mono m-2 text-slate-100 scaletext">
          {contract.address}
        </p>
        <p class="font-mono text-slate-100 scaletext">
          Entry cost: {contract.ticket_price / KRYO_DIVISION}
        </p>
        {#if contract.registration_open}
          <p class="font-mono text-slate-100 scaletext">
            Registerations are open!
          </p>
        {:else}
          <p class="font-mono text-slate-100 scaletext">
            Registerations are closed!
          </p>
        {/if}
        <div id="registrants_container" class="flex flex-col items-center">
          <div
            class="bg-slate-600 font-mono w-full h-full text-slate-100 rounded-lg text-center"
            id="registrants"
          >
            {#each contract.registrants as registerant}
              <a
                class="underline"
                href="https://kryolite-crypto.github.io/explorer/wallet/?wallet={registerant}"
                >{registerant}
              </a>
            {/each}
          </div>
        </div>
        <div id="last_winner" class="flex flex-col items-center m-5">
          <a
            id="last_winner_address"
            class="font-mono text-xs text-slate-100 underline"
            href="https://kryolite-crypto.github.io/explorer/wallet/?wallet={contract
              .last_winner.address}"
          >
            Last winner: {contract.last_winner.address}
          </a>
          <p id="last_winner_reward" class="font-mono text-xs text-slate-100">
            Last won prize: {contract.last_winner.reward / KRYO_DIVISION}
          </p>
        </div>
      </div>
    </div>
  {/if}
</body>

<style>
  .scaletext {
    font-size: min(3.5vw, 2em);
  }
  #registrants_container {
    width: max(25vw, 200px);
    height: 50vh;
  }
  #registrants {
    font-size: max(1vw, 0.5em);
  }
  #last_winner_reward {
    font-size: min(3vw, 1em);
  }
  #last_winner_address {
    font-size: min(2vw, 1em);
  }
</style>
