//---------------CLASSES AND GLOBAL VARIABLES-----------------
class CartItem {
  constructor(pItemId, pName, pDescription, pPrice, pImageUrl, pMod, pQty) {
    this.id = pItemId;
    this.name = pName;
    this.description = pDescription;
    this.price = pPrice;
    this.imageUrl = pImageUrl;
    this.tModifiers = pMod;
    this.qty = pQty;
  }
}

let isEmpty = true;

//Set cart Qty in header and page title on page load:
let cartQtyElt = document.querySelector("#cartQty");
if (localStorage.getItem("cartQty")) {
  isEmpty = false;
  cartQtyElt.textContent = localStorage.getItem("cartQty");
  document.querySelector("#cartInfos").innerHTML =
    '<p id="cartInfos" class="h6 mt-3">Votre panier contient <span id="cartNb"></span> produit(s).</p>';
  document.querySelector("#cartNb").textContent = localStorage.getItem(
    "cartQty"
  );
} else {
  isEmpty = true;
  cartQtyElt.style.display = "none";
}

if (!isEmpty) {
  document
    .querySelector(".container")
    .insertAdjacentHTML(
      "afterend",
      '<div class="container" id="cartTab"></div>'
    );
  containerElt = document.querySelector("#cartTab");

  //Init tables Headers:
  //Cart:
  tableElt = document.createElement("table");
  tableElt.setAttribute("class", "table table-hover");
  containerElt.appendChild(tableElt);
  tableElt.innerHTML =
    '<thead class="thead-dark"><tr><th scope="col"> </th> <th scope="col"> </th> <th scope="col">Article</th> <th scope="col">Prix</th> <th scope="col">Quantité</th> <th scope="col">Total</th> </tr></thead><tbody></tbody>';
  //Total price
  //tHeader
  totalTableElt = document.createElement("table");
  totalTableElt.setAttribute("class", "col-6 table my-5 justify-content-end");
  containerElt.appendChild(totalTableElt);
  totalTableElt.innerHTML =
    '<thead class="thead-dark"><tr><th scope="col" colspan="2">Total du panier</th></tr></thead><tbody id="tbodyTotal"></tbody>';
  //tBody
  totalCartTrElt1 = document.createElement('tr');
  document.querySelector("#tbodyTotal").appendChild(totalCartTrElt1);

  totalCartText = document.createElement('td');
  totalCartText.setAttribute('scope', 'row');
  totalCartText.textContent = "Total";
  totalCartTrElt1.appendChild(totalCartText);

  totalCartValue = document.createElement('td');
  totalCartValue.textContent = "TOTALVALUE";
  totalCartTrElt1.appendChild(totalCartValue);    

  totalCartTrElt2 = document.createElement("tr");
  document.querySelector("#tbodyTotal").appendChild(totalCartTrElt2);
  commandBtn = document.createElement('button');
  commandTdElt = document.createElement('td');
  commandTdElt.setAttribute('colspan', '2');
  totalCartTrElt2.appendChild(commandTdElt);
  commandTdElt.appendChild(commandBtn);
  commandTdElt.id = 'commandTd';
  commandBtn.setAttribute('class', 'btn btn-primary');
  commandBtn.id = 'totalCartSubmit';
  commandBtn.textContent = 'Procéder au paiement';

}

//Getting infos from localStorage:
//  ================TEST===================
for (let i = 0; i < localStorage.length; i++) {
  tempItem = JSON.parse(localStorage.getItem(localStorage.key(i)));
  //Instance CartItem if valid localStorage item:
  if (tempItem.isCartItem) {
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
    tbodyElt = document.querySelector("tbody");
    trElt = document.createElement("tr");
    tbodyElt.appendChild(trElt);

    thElt = document.createElement("th");
    thElt.setAttribute("scope", "row");
    trElt.appendChild(thElt);
    //DEL Button
    delBtn = document.createElement("button");
    delBtn.setAttribute("class", "btn btn-outline-danger btn-sm");
    delBtn.textContent = "X";
    thElt.appendChild(delBtn);
    //Item picture
    imgTdElt = document.createElement("td");
    trElt.appendChild(imgTdElt);
    imgElt = document.createElement("img");
    imgElt.setAttribute("src", myCartItem.imageUrl);
    imgElt.setAttribute("width", "60");
    imgTdElt.appendChild(imgElt);
    //Item name
    nameTdElt = document.createElement("td");
    nameTdElt.setAttribute("class", "align-middle");
    nameTdElt.textContent = myCartItem.name;
    trElt.appendChild(nameTdElt);
    //Item Price
    priceTdElt = document.createElement("td");
    priceTdElt.setAttribute("class", "align-middle");
    priceTdElt.textContent = myCartItem.price + " €";
    trElt.appendChild(priceTdElt);

    //Item Quantity
    qtyTdElt = document.createElement("td");
    qtyTdElt.setAttribute("class", "row align-middle");
    // [ - ] Button
    minusBtn = document.createElement("button");
    minusBtn.setAttribute("class", "btn btn-outline-secondary btn-sm mx-3");
    minusBtn.textContent = "-";
    // [ + ] Button
    addBtn = document.createElement("button");
    addBtn.setAttribute("class", "btn btn-outline-secondary btn-sm mx-3");
    addBtn.textContent = "+";
    //Qty text
    qtyElt = document.createElement("p");
    qtyElt.setAttribute("class", "align-middle");
    qtyElt.id = "qtyElt";
    qtyElt.textContent = myCartItem.qty;

    trElt.appendChild(qtyTdElt);
    qtyTdElt.appendChild(minusBtn);
    qtyTdElt.appendChild(qtyElt);
    qtyTdElt.appendChild(addBtn);
    //Total Price
    totalPriceTdElt = document.createElement("td");
    totalPriceTdElt.setAttribute("class", "align-middle");
    totalPriceTdElt.textContent = myCartItem.price * myCartItem.qty + " €";
    totalPriceTdElt.style.fontWeight = "bold";
    trElt.appendChild(totalPriceTdElt);
  }
}

// =======================================
