<script>
let url = "http://127.0.0.1:5000"
let wallet = "kryo:5VXdN1K7VuSC8es21bbVpmRG4GPrgG5BsYyc"
let response = "[loading]"

async function run() {
  fetch(`${url}/contract/${wallet}/call`, {
      body: '{"method": "get_state"}',
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST"
    }).then(response => response.text())
    .then(text => {
      console.log(text)
      response = text
    })
    .catch((error) => {
      console.error(error)
    })
}
run()
</script>
<body>
    Response: {response}
</body>

<style>
</style>
