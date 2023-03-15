<script>
  import { onMount } from "svelte";

  export let displayable = {};
  let displaydiv;
  let text_class;
  let placeholderobject;
  onMount(async () => {
    text_class = placeholderobject.classList[0];
  });
  $: if (displayable) {
    if (text_class && displaydiv) {
      parseDisplayable();
    }
  }
  function parseDisplayable() {
    let displayInner = ``;
    for (const displaydisplayable in displayable) {
      const displayElement = displayable[displaydisplayable];
      let generatedHtml = ``;
      let style = ``;
      let text = ``;
      for (const displayProperty in displayElement) {
        const content = displayElement[displayProperty];
        const htmlContent = displayPropertyToHTML(displayProperty, content);
        if (htmlContent[0] === "style") {
          style += htmlContent[1];
        }
        if (htmlContent[0] === "text") {
          text += htmlContent[1];
        }
      }
      generatedHtml = `<p style="${style}" class=${text_class}>${text}</p>`;
      displayInner += generatedHtml;
    }
    displaydiv.innerHTML = displayInner;
  }
  function displayPropertyToHTML(property, content) {
    switch (property) {
      case "color":
        return ["style", `color:${content};`];
      case "size":
        return ["style", `font-size:${content};`];
      case "style":
        return ["style", `${content};`];
      case "text":
        return ["text", `${content}`];
      default:
        return ["none", null];
    }
  }
</script>

<body>
  <div id="display" bind:this={displaydiv}>
    <p id="PLACEHOLDER_FOR_GET_CLASS" bind:this={placeholderobject}>
      PLACEHOLDER
    </p>
  </div>
</body>

<style>
  #display {
    width: 80%;
    height: 20em;
    border: solid var(--color) 1px;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    max-width: 100%;
    max-height: 100%;
    overflow: auto;
    display: grid;

    -ms-overflow-style: none; /* Internet Explorer 10+ */
    scrollbar-width: none; /* Firefox */
  }
  #display::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }
  #display p {
    justify-self: center;
    color: var(--color);
    font-family: var(--font);
    font-size: 2em;
  }

  @media only screen and (max-width: 1000px) {
    #display p {
      font-size: 1.5em;
    }
  }
  @media only screen and (max-width: 700px) {
    #display p {
      font-size: 1em;
    }
  }
  @media only screen and (max-width: 450px) {
    #display {
      width: 100%;
      height: auto;
      border: none;
      margin-top: 10em;
    }
    #display p {
      font-size: 2em;
      justify-self: auto;
    }
  }
</style>
