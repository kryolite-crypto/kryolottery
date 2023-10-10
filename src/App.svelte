<script>
  import Navbar from "./lib/navbar.svelte";

  const contractAddress = "kryo:wea7jcaqpzm8vvdavbxqzv6zewue4f3u8y9wcz3492";
  const url = "https://testnet-1.kryolite.io";
  const KRYO_DIVISION = 1000000;

  let response = "";
  let contract;

  // By default give this address:
  addressInputted({
    detail: { data: contractAddress },
  });

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
  <Navbar />
  {#if contract}
  <div class="main">
    <div class="info">
      <p class="title">Info</p>
      <div class="container">
          <div class="column">
            <div class="row">
              <p class="header">Contract address</p>
              <p class="text">{contractAddress}</p>
            </div>
            <div class="row">
              <p class="header">Ticket price</p>
              <p class="text">{(contract.ticket_price / 1_000_000).toFixed(2)} kryo</p>
            </div>
            <div class="row">
              <p class="header">Ticket sale</p>
              <p class="text">{contract.registration_open ? "Open" : "Closed"}</p>
            </div>
            <div class="row">
              <p class="header">Current pot</p>
              <p class="text">{(contract.ticket_price * Object.keys(contract.tickets).length / 1_000_000 * 0.99).toFixed(2)} kryo</p>
            </div>
          </div>
      </div>
      <p class="title">Winner</p>
      <div class="container">
        <div class="column">
          <div class="row">
            <p class="header">Previous winner</p>
            <p class="text">{contract.last_winner.address}</p>
          </div>
          <div class="row">
            <p class="header">Amount won</p>
            <p class="text">{(contract.last_winner.reward / 1_000_000).toFixed(2)} kryo</p>
          </div>
        </div>
      </div>
    </div>
    <div class="instructions">
      <p class="title">Instructions</p>
      <div class="container fill-height">
          <div class="column">
            <div style="margin-bottom: 10px;">This is a demo application utilizing Kryolite Standard Token interface.</div>
            <div>To participate in this lottery you need to buy a token using Kryolite Wallet.</div>
            <ul>
              <li>Open wallet and go to Send tab</li>
              <li>Select wallet where to send funds from</li>
              <li>Copy {contractAddress} to recipient field, this is the contract address</li>
              <li>Amount to send: {(contract.ticket_price / 1_000_000)}</li>
              <li>From the next dropdown select <i>Buy ticket</i></li>
              <li>Click Send</li>
              <li>Wait for transaction to complete</li>
              <li>Your wallet should receive token named <i>Lottery Ticket #X</i></li>
            </ul>
            <div style="margin-bottom: 10px;">
              Multiple tickets can be bought for same draw. If you don't see the dropdown which lets you select <i>Buy ticket</i> your walelt might not have fully synchronized yet.
            </div>
            <div>
              After winner has been selected old tokens in your wallet will show up as consumed and they will not participate in future draws.
            </div>
          </div>
      </div>
    </div>
  </div>
  
  <p class="title">Sold tickets</p>
  <div class="container">
    <div class="column">
      <p class="header">Address</p>
      {#each Object.entries(contract.address_to_tickets) as [address, tickets]}
      <p class="text">
        <a href="https://kryolite-crypto.github.io/explorer/wallet/?wallet={address}">{address}</a>
      </p>
    {/each}
    </div>
    <div class="column">
      <p class="header">Tickets bought</p>
      {#each Object.entries(contract.address_to_tickets) as [address, tickets]}
      <p class="text">
        {tickets.length}
      </p>
    {/each}
    </div>
    <div class="column">
      <p class="header">Chance to win</p>
      {#each Object.entries(contract.address_to_tickets) as [address, tickets]}
      <p class="text">
        {(tickets.length / contract.tickets_sold * 100).toFixed(2)} %
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
