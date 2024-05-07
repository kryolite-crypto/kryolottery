<script>
  import Navbar from "./lib/navbar.svelte";

  const contractAddress = "kryo:ag7td4m4c6ks7qhevxayamdjc5qbe5rcimmqyfqd";
  const url = "https://testnet-1.kryolite.io";

  let response = "";
  let contract;
  let tickets = [];

  const evtSource = new EventSource(url + `/contract/${contractAddress}/listen`);

  evtSource.onmessage = (event) => {
    var ev = JSON.parse(event.data);
    console.log(ev);

    if (ev.Type === "Custom" && ev.Event.EventData[0] === "0") {
      load();
    }
  };

  load();

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

  async function load() {
    post(url, `/contract/${contractAddress}/call`, { method: "GetState" })
      .then((contractObj) => {
        response = JSON.stringify(contractObj);
        contractObj["address"] = contractAddress;
        contract = contractObj;

        contract.tickets.forEach(owner => {
          owner.tickets.forEach(ticket => {
            tickets.push(
              {
                address: owner.address,
                numbers: ticket.description.match(/\[(.*?)\]/)[1]
              }
            )
          });
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const stringToHex = (str) => {
    let hex = '';
    for (let i = 0; i < str.length; i++) {
      const charCode = str.charCodeAt(i);
      const hexValue = charCode.toString(16);

      // Pad with zeros to ensure two-digit representation
      hex += hexValue.padStart(2, '0');
    }
    return hex;
  };

  export function updateParams()
  {
      return stringToHex(JSON.stringify({"method": "BuyTicket"}));
  }

  const params = updateParams();
</script>

<body>
  <Navbar />
  {#if contract}
  <div class="main">
    <div class="info">
      <p class="title">Info</p>
      <div class="container">
          <div class="column" style="width: 100%">
            <div class="row">
              <p class="header">Contract address</p>
              <p class="text">{contractAddress}</p>
            </div>
            <div class="row">
              <p class="header">Ticket sale</p>
              <p class="text">{contract.registrationOpen ? "Open" : "Closed"}</p>
            </div>
            <div class="row">
              <p class="header">Ticket price</p>
              <p class="text">{(contract.ticketPrice / 1_000_000).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 6})} kryo</p>
            </div>
            <div class="row">
              <p class="header">Current pot</p>
              <p class="text">{(contract.ticketPrice * tickets.length / 1_000_000 * 0.99).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 6})} kryo</p>
            </div>
            <div style="display: flex; justify-content: center">
              <a class="btn-5" href="kryolite:call/{contractAddress}/{contract.ticketPrice}/{params}">BUY TICKET</a>
            </div>
          </div>
      </div>
      <p class="title">Last Draw</p>
      <div class="container">
        <div class="column" style="width: 100%">
          <div class="row">
            <p class="header">Lucky Numbers</p>
            <p class="text">{contract.previousDigits}</p>
          </div>
          <div class="row" style="display:flex; justify-content: space-between">
            <span>
              <p class="header">Winners</p>
              {#each contract.winners as {address}}
              <div class="row">
                <p class="text">
                  <a href="https://kryolite-crypto.github.io/explorer/ledger/{address}">{address}</a>
                </p>
              </div>
              {/each}
            </span>
            <span>
              <p class="header">Reward</p>
              {#each contract.winners as {reward}}
              <div class="row">
                <p class="text">{(reward / 1_000_000).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 6})} kryo</p>
              </div>
              {/each}
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="instructions">
      <p class="title">Instructions</p>
      <div class="container fill-height">
          <div class="column">
            <div style="margin-bottom: 10px;">This is a demo application utilizing Kryolite Standard Token interface.</div>
            <!--div>To participate in this lottery you need to buy a token using Kryolite Wallet.</div>
            <ul>
              <li>Open wallet and go to Send tab</li>
              <li>Select wallet where to send funds from</li>
              <li>Copy {contractAddress} to recipient field, this is the contract address</li>
              <li>Amount to send: {(contract.ticketPrice / 1_000_000)}</li>
              <li>From the next dropdown select <i>Buy ticket</i></li>
              <li>Click Send</li>
              <li>Wait for transaction to complete</li>
              <li>Your wallet should receive token named <i>Lottery Ticket #X</i></li>
            </ul>
            <div style="margin-bottom: 10px;">
              Multiple tickets can be bought for same draw. If you don't see the dropdown which lets you select <i>Buy ticket</i> your walelt might not have fully synchronized yet.
            </div>
            <div>
              After winner has been drawn old tokens in your wallet will show up as consumed and they will not participate in future draws.
            </div-->
          </div>
      </div>
    </div>
  </div>
  
  <p class="title">Sold tickets</p>
  <div class="container">
    <div class="column">
      <p class="header">Address</p>
      {#each tickets as {address}}
      <p class="text">
        <a href="https://kryolite-crypto.github.io/explorer/ledger/{address}">{address}</a>
      </p>
    {/each}
    </div>
    <div class="column">
      <p class="header">Lotto numbers</p>
      {#each tickets as {numbers}}
      <p class="text">
        {numbers}
      </p>
    {/each}
    </div>
  </div>
  {/if}
</body>

<style>
    .main {
        display:flex;
        align-content: space-between;
        margin-bottom: 80px;
    }

    .info {
        min-width: 50%;
        margin-right: 20px;
        height: 100%;
        margin-bottom: -59px;
    }

    .instructions {
        width: 50%;
    }

    .row {
      margin-bottom: 20px;
    }

    .fill-height {
      height: 100%;
    }
</style>
