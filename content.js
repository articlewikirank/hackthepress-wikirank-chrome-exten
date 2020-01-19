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
loadingAnimation.appendChild(loadingText);
wikiRankBar.appendChild(loadingAnimation);

const documentClone = document.cloneNode(true);
const article = new Readability(documentClone).parse();
const dataToSend = {
  text: article.title + article.textContent.replace(/\n/g, "").trim(),
  url: window.location.href
};
console.log(dataToSend);
console.log(article.textContent.replace(/\n/g, "").trim());

fetch("https://8491171d.ngrok.io/", {
  method: "POST",
  mode: "cors",
  headers: {
    "Content-Type": "application/json;charset=utf-8"
  },
  body: JSON.stringify(dataToSend) // body data type must match "Content-Type" header
})
  .then(response => response.json())
  .then(responseObj => {
    document.querySelector(".wikirankbar").removeChild(loadingAnimation);
    console.log(responseObj);
    const requestURL = responseObj.request_url;
    const rankingObj = responseObj.ranking;
    const siteNamesArray = Object.keys(rankingObj);
    const sitesTable = document.createElement("table");
    sitesTable.classList.add("sitestable");
    const legend = document.createElement("tr");
    legend.innerHTML = "<tr><th>Rank</th><th>Website</th></tr>";
    sitesTable.appendChild(legend);
    siteNamesArray.forEach(siteName => {
      const tableRow = document.createElement("tr");
      tableRow.classList.add("site");
      if (siteName === requestURL)
        tableRow.classList.add("highlight-currentdomain");
      const ranking = document.createElement("td");
      ranking.innerText = rankingObj[siteName];
      ranking.classList.add("ranking");
      const name = document.createElement("td");
      const namelink = document.createElement("a");
      namelink.setAttribute("href", "https://" + siteName);
      namelink.setAttribute("target", "_blank");
      namelink.innerText = siteName;
      name.appendChild(namelink);
      tableRow.appendChild(name);
      tableRow.appendChild(ranking);
      sitesTable.appendChild(tableRow);
      console.log(sitesTable);
      document.querySelector(".wikirankbar").appendChild(sitesTable);
    });
  });

document.body.parentNode.insertBefore(wikiRankBar, document.body);
