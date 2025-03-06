function renderCases() {
    console.log("first")
  fetch(
    `https://raw.githubusercontent.com/ONDC-Official/developer-docs/main/protocol-network-extension/error-codes.md`
  )
    .then((response) => response.text())
    .then((text) => {
      const html = marked.parse(text);
      document.getElementById("error-container").innerHTML = html;
    });
}
renderCases()