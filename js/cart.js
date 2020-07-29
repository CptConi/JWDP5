import { CartItem, setCartQtyHeader, Cart, initCart } from "./cartManager.js";

//Set cart Qty in header on page load:
let orinocoCart = new Cart();
initCart(orinocoCart);
setCartQtyHeader(orinocoCart);

let isEmpty;

function refreshPage() {
  if (orinocoCart.getTotalQty() > 0) {
    isEmpty = false;
  } else {
    isEmpty = true;
  }

  //Clearing content if qty < 0 while deleting stuff
  clearPage();

  //Set cart Qty in header and page title on page load:
  let cartQtyElt = document.querySelector("#cartQty");
  if (isEmpty) {
    isEmpty = true;
    cartQtyElt.style.display = "none";
    document.querySelector("#cartInfos").innerHTML =
      '<p id="cartInfos" class="h6 mt-3">Votre panier est vide.</p>';
  } else {
    document.querySelector("#cartInfos").innerHTML =
      '<p id="cartInfos" class="h6 mt-3">Votre panier contient <span id="cartNb"></span> produit(s).</p>';
    document.querySelector("#cartNb").textContent = orinocoCart.getTotalQty();
    document
      .querySelector(".container")
      .insertAdjacentHTML(
        "afterend",
        '<div class="container" id="cartTab"></div>'
      );
    let containerElt = document.querySelector("#cartTab");

    //Init tables Headers:
    //Cart:
    let tableElt = document.createElement("table");
    tableElt.setAttribute("class", "table table-hover");
    containerElt.appendChild(tableElt);
    tableElt.innerHTML =
      '<thead class="thead-dark"><tr><th scope="col"> </th> <th scope="col"> </th> <th scope="col">Article</th> <th scope="col">Prix</th> <th scope="col">Quantité</th> <th scope="col">Total</th> </tr></thead><tbody></tbody>';
    //Total price
    //tHeader
    let totalTableElt = document.createElement("table");
    totalTableElt.setAttribute("class", "col-6 table my-5 justify-content-end");
    containerElt.appendChild(totalTableElt);
    totalTableElt.innerHTML =
      '<thead class="thead-dark"><tr><th scope="col" colspan="2">Total du panier</th></tr></thead><tbody id="tbodyTotal"></tbody>';
    //tBody
    let totalCartTrElt1 = document.createElement("tr");
    document.querySelector("#tbodyTotal").appendChild(totalCartTrElt1);

    let totalCartText = document.createElement("td");
    totalCartText.setAttribute("scope", "row");
    totalCartText.textContent = "Total";
    totalCartTrElt1.appendChild(totalCartText);

    let totalCartValue = document.createElement("td");
    totalCartValue.textContent = orinocoCart.getTotalPrice() + " €";
    totalCartValue.style.fontWeight = 'bold';
    totalCartTrElt1.appendChild(totalCartValue);

    let totalCartTrElt2 = document.createElement("tr");
    document.querySelector("#tbodyTotal").appendChild(totalCartTrElt2);
    let commandBtn = document.createElement("button");
    let commandTdElt = document.createElement("td");
    commandTdElt.setAttribute("colspan", "2");
    totalCartTrElt2.appendChild(commandTdElt);
    commandTdElt.appendChild(commandBtn);
    commandTdElt.id = "commandTd";
    commandBtn.setAttribute("class", "btn btn-primary");
    commandBtn.id = "totalCartSubmit";
    commandBtn.textContent = "Procéder au paiement";

    formatTableContent();
  }
}

//Getting infos from localStorage:
//  ================Formating content from Object Cart===================
function clearPage() {
  let table = document.getElementsByTagName("table");
  for (let i = 0; i < table.length; i++) {
    while (table[i].firstChild) {
      table[i].removeChild(table[i].firstChild);
    }
  }
}

function clearTable() {
  let tbodyElt = document.querySelector("tbody");
  while (tbodyElt.firstChild) {
    tbodyElt.removeChild(tbodyElt.firstChild);
  }
}

function formatTableContent() {
  for (let i = 0; i < orinocoCart.itemsList.length; i++) {
    let tempItem = orinocoCart.itemsList[i];
    //Instance CartItem for each itemList in Cart:
    const myCartItem = new CartItem(
      tempItem.id,
      tempItem.name,
      tempItem.description,
      tempItem.price,
      tempItem.imageUrl,
      tempItem.tModifiers,
      tempItem.qty
    );
    //Then Format page with Infos:
    let tbodyElt = document.querySelector("tbody");
    let trElt = document.createElement("tr");
    tbodyElt.appendChild(trElt);

    let thElt = document.createElement("th");
    thElt.setAttribute("scope", "row");
    trElt.appendChild(thElt);
    //DEL Button
    let delBtn = document.createElement("button");
    delBtn.setAttribute("class", "btn btn-outline-danger btn-sm");
    delBtn.textContent = "X";
    thElt.appendChild(delBtn);
    //Item picture
    let imgTdElt = document.createElement("td");
    trElt.appendChild(imgTdElt);
    let imgElt = document.createElement("img");
    imgElt.setAttribute("src", myCartItem.imageUrl);
    imgElt.setAttribute("width", "60");
    imgTdElt.appendChild(imgElt);
    //Item name
    let nameTdElt = document.createElement("td");
    nameTdElt.setAttribute("class", "align-middle");
    nameTdElt.textContent = myCartItem.name;
    trElt.appendChild(nameTdElt);
    //Item Price
    let priceTdElt = document.createElement("td");
    priceTdElt.setAttribute("class", "align-middle");
    priceTdElt.textContent = myCartItem.price + " €";
    trElt.appendChild(priceTdElt);

    //Item Quantity
    let qtyTdElt = document.createElement("td");
    qtyTdElt.setAttribute("class", "row align-middle");
    // [ - ] Button
    let minusBtn = document.createElement("button");
    minusBtn.setAttribute("class", "btn btn-outline-secondary btn-sm mx-3");
    minusBtn.textContent = "-";
    // [ + ] Button
    let addBtn = document.createElement("button");
    addBtn.setAttribute("class", "btn btn-outline-secondary btn-sm mx-3");
    addBtn.textContent = "+";
    //Qty text
    let qtyElt = document.createElement("p");
    qtyElt.setAttribute("class", "align-middle");
    qtyElt.id = "qtyElt";
    qtyElt.textContent = myCartItem.qty;

    trElt.appendChild(qtyTdElt);
    qtyTdElt.appendChild(minusBtn);
    qtyTdElt.appendChild(qtyElt);
    qtyTdElt.appendChild(addBtn);
    //Total Price
    let totalPriceTdElt = document.createElement("td");
    totalPriceTdElt.setAttribute("class", "align-middle");
    totalPriceTdElt.textContent = myCartItem.price * myCartItem.qty + " €";
    totalPriceTdElt.style.fontWeight = "bold";
    trElt.appendChild(totalPriceTdElt);

    // =================EVENTS ON CLIC======================
    delBtn.addEventListener("click", function (e) {
      e.preventDefault();
      orinocoCart.removeItem(myCartItem);
      localStorage.setItem("Orinoco-cart", JSON.stringify(orinocoCart));
      setCartQtyHeader(orinocoCart);
      clearTable();
      refreshPage();
    });
    addBtn.addEventListener('click', function(e){
      e.preventDefault();
      orinocoCart.addQty(myCartItem);
      localStorage.setItem("Orinoco-cart", JSON.stringify(orinocoCart));
      setCartQtyHeader(orinocoCart);
      clearTable();
      refreshPage();
    });
    minusBtn.addEventListener("click", function (e) {
      e.preventDefault();
      orinocoCart.subQty(myCartItem);
      localStorage.setItem("Orinoco-cart", JSON.stringify(orinocoCart));
      setCartQtyHeader(orinocoCart);
      clearTable();
      refreshPage();
    });
  }
}

refreshPage();
