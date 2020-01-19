const wikiRankBar = document.createElement("header");
wikiRankBar.classList.add("wikirankbar");
const logo = document.createElement("img");
logo.setAttribute("src", chrome.runtime.getURL("images/WikiRankLogo.png"));
logo.classList.add("logo");
wikiRankBar.appendChild(logo);
const loadingAnimation = document.createElement("div");
loadingAnimation.classList.add("lds-ellipsis");
for (let i = 0; i < 4; i++) {
  loadingAnimation.appendChild(document.createElement("div"));
}
const loadingText = document.createElement("p");
loadingText.textContent = "Generating rankings";
loadingText.classList.add("loading-text");
loadingAnimation.appendChild(loadingText);
wikiRankBar.appendChild(loadingAnimation);

const documentClone = document.cloneNode(true);
const article = new Readability(documentClone).parse();
const dataToSend = {
  text: article.title + article.textContent,
  url: window.location.href
};
console.log(dataToSend);

fetch("https://8491171d.ngrok.io/", {
  method: "POST",
  mode: "cors",
  headers: {
    "Content-Type": "application/json;charset=utf-8"
  },
  body: JSON.stringify(dataToSend) // body data type must match "Content-Type" header
})
  .then(response => response.json())
  .then(listOfKeys => {
    wikiRankBar.removeChild(loadingAnimation);
    console.log(listOfKeys);
  });

document.body.parentNode.insertBefore(wikiRankBar, document.body);
