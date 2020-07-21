// const e = require("express");

let teddiesURL = "http://localhost:3000/api/teddies";
let result;
let request = new XMLHttpRequest();

class Teddy {
  constructor(pId, pName, pDescription, pPrice, pImageUrl, pColor) {
    this.id = pId;
    this.name = pName;
    this.description = pDescription;
    this.price = pPrice;
    this.imageUrl = pImageUrl;
    this.tColors = pColor;
  }
}

request.addEventListener("load", function () {
  if (request.status <= 200 && request.status < 300) {
    //Inscrire ici les path pour accéder aux infos de la réponse server, avec un JSON.parce(request.responseText.[...])
    result = JSON.parse(request.responseText);
    // Affichage et formatage des différents éléments récupérés dans result
    formatReqResult(result);
  }
});
request.open("GET", teddiesURL, true);
request.send();

//Formating each API request response
function formatReqResult(pPesult) {
  for (var response of pPesult) {
    const teddy = new Teddy(
      response._id,
      response.name,
      response.description,
      response.price,
      response.imageUrl,
      response.colors
    );

    cardSection = document.querySelector("#cards");
    col = document.createElement("div");
    div1 = document.createElement("div");
    div2 = document.createElement("div");
    img = document.createElement("img");
    title = document.createElement("h2");
    description = document.createElement("p");
    price = document.createElement("p");
    commandBtn = document.createElement("button");

    cardSection.appendChild(col);
    col.appendChild(div1);
    div1.appendChild(div2);
    div1.appendChild(img);
    div2.appendChild(title);
    div1.appendChild(description);
    div1.appendChild(price);
    div1.appendChild(commandBtn);

    col.setAttribute("class", "col-4 my-3");
    div1.setAttribute("class", "card shadow");
    div2.setAttribute("class", "card-body");
    img.setAttribute("class", "card-img-top h-75");
    let imgPath = teddy.imageUrl;
    img.setAttribute("src", imgPath);
    title.setAttribute("class", "card-title text-center");
    description.setAttribute("class", "card-text m-1");
    price.setAttribute("class", "card-text text-right mr-3 my-2 h4");
    commandBtn.id = "commandeBtn";
    commandBtn.setAttribute(
      "class",
      "btn btn-primary " + /*stretched-link*/ " w-50 mx-auto my-3"
    );
    //Add tooltip if more than 1 colour available:
    if (teddy.tColors.length > 1) {
      commandBtn.setAttribute("data-toggle", "tooltip");
      commandBtn.setAttribute("data-placement", "right");
      commandBtn.setAttribute("title", "Plusieurs couleurs disponibles !");
    }

    commandBtn.addEventListener("click", function () {
      localStorage.setItem("item", JSON.stringify(teddy));
      window.location = "item-details.html";
    });

    title.textContent = teddy.name;
    description.textContent = teddy.description;
    price.textContent = teddy.price + " €";
    commandBtn.textContent = "Je le veux !";
  }
  $(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();
  });
}

//Set cart Qty in header on page load:
let cartQtyElt = document.querySelector("#cartQty");
if (localStorage.getItem("cartQty")) {
  cartQtyElt.textContent = localStorage.getItem("cartQty");
} else {
  cartQtyElt.style.display = "none";
}

// Pour stocker infos sur sesion storage > JSON.stringify puis JSON.parse
