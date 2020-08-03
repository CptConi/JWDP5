import { Teddy, setCartQtyHeader, Cart, initCart } from "./cartManager.js";
import { ajaxGet } from "./ajax.js";

let teddiesURL = "http://localhost:3000/api/teddies";

ajaxGet(teddiesURL).then(formatReqResult).catch(()=>{
  console.error(err);
});

//Formating each API request response
function formatReqResult(pResult) {
  pResult = JSON.parse(pResult);
  for (let response of pResult) {
    const teddy = new Teddy(
      response._id,
      response.name,
      response.description,
      response.price,
      response.imageUrl,
      response.colors
    );

    let cardSection = document.querySelector("#cards");
    let col = document.createElement("div");
    let div1 = document.createElement("div");
    let div2 = document.createElement("div");
    let img = document.createElement("img");
    let title = document.createElement("h2");
    let description = document.createElement("p");
    let price = document.createElement("p");
    let commandBtn = document.createElement("button");

    cardSection.appendChild(col);
    col.appendChild(div1);
    div1.appendChild(div2);
    div1.appendChild(img);
    div2.appendChild(title);
    div1.appendChild(description);
    div1.appendChild(price);
    div1.appendChild(commandBtn);

    col.setAttribute("class", "col-md-6 col-lg-4 my-3");
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
      localStorage.setItem("Orinoco-item", JSON.stringify(teddy));
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
let orinocoCart = new Cart();
initCart(orinocoCart);
setCartQtyHeader(orinocoCart);
