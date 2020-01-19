let documentClone = document.cloneNode(true);
let article = new Readability(documentClone).parse();
console.log(article);
console.log("HERE IS YOUR TITLE");
console.log(article.title);
console.log("HERE IS YOUR TEXT");
console.log(article.textContent);

let wikiRankBar = document.createElement("header");
document.body.parentNode.insertBefore(wikiRankBar, document.body.nextSibling);
