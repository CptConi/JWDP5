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

    //----------------------Tables--------------------------
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
    totalTableElt.id = "totalTable";
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
    totalCartValue.style.fontWeight = "bold";
    totalCartTrElt1.appendChild(totalCartValue);


    formatTableContent();

    //------------------Form--------------------
    /**
     * Expects request to contain:
     * contact: {
     *   firstName: string,
     *   lastName: string,
     *   address: string,
     *   city: string,
     *   email: string
     * }
     * products: [string] <-- array of product _id
     */
    document
      .querySelector("#totalTable")
      .insertAdjacentHTML("afterend", '<form id="payoutForm"></form>');
    let formElt = document.getElementById("payoutForm");
    //TODO:
    // Ajouter les classes de mise en forme Bootsrap pour le formulaire ici.

    //First Name:
    let divPrenomNom = document.createElement("div");
    divPrenomNom.setAttribute("class", "form-group form-row");
    formElt.appendChild(divPrenomNom);
    let colPrenom = document.createElement("div");
    colPrenom.setAttribute("class", "col");
    divPrenomNom.appendChild(colPrenom);
    let formPrenomLabel = document.createElement("label");
    formPrenomLabel.setAttribute("for", "firstName");
    formPrenomLabel.textContent = "Prénom :";
    colPrenom.appendChild(formPrenomLabel);
    let formPrenomInput = document.createElement("input");
    formPrenomInput.setAttribute("type", "text");
    formPrenomInput.setAttribute("id", "firstName");
    formPrenomInput.setAttribute("class", "form-control");
    formPrenomInput.setAttribute("placeholder", "Prénom");
    colPrenom.appendChild(formPrenomInput);
    //Last Name:
    let colNom = document.createElement("div");
    colNom.setAttribute("class", "col");
    divPrenomNom.appendChild(colNom);
    let formNomLabel = document.createElement("label");
    formNomLabel.setAttribute("for", "lastName");
    formNomLabel.textContent = "Nom :";
    colNom.appendChild(formNomLabel);
    let formNomInput = document.createElement("input");
    formNomInput.setAttribute("type", "text");
    formNomInput.setAttribute("id", "lastName");
    formNomInput.setAttribute("class", "form-control");
    formNomInput.setAttribute("placeholder", "Nom");
    colNom.appendChild(formNomInput);
    //Adress:
    let divAdress = document.createElement("div");
    divAdress.setAttribute("class", "form-group form-row");
    formElt.appendChild(divAdress);
    let colAdress = document.createElement("div");
    colAdress.setAttribute("class", "col");
    divAdress.appendChild(colAdress);
    let formAdressLabel = document.createElement("label");
    formAdressLabel.setAttribute("for", "Adress");
    formAdressLabel.textContent = "Adresse postale :";
    colAdress.appendChild(formAdressLabel);
    let formAdressInput = document.createElement("input");
    formAdressInput.setAttribute("type", "text");
    formAdressInput.setAttribute("id", "Adress");
    formAdressInput.setAttribute("class", "form-control");
    formAdressInput.setAttribute("placeholder", "Adresse");
    colAdress.appendChild(formAdressInput);
    //Ville
    let colCity = document.createElement("div");
    colCity.setAttribute("class", "col");
    divAdress.appendChild(colCity);
    let formCityLabel = document.createElement("label");
    formCityLabel.setAttribute("for", "city");
    formCityLabel.textContent = "Ville :";
    colCity.appendChild(formCityLabel);
    let formCityInput = document.createElement("input");
    formCityInput.setAttribute("type", "text");
    formCityInput.setAttribute("id", "city");
    formCityInput.setAttribute("class", "form-control");
    formCityInput.setAttribute("placeholder", "Ville");
    colCity.appendChild(formCityInput);
    //Email
    let divEmail = document.createElement("div");
    divEmail.setAttribute("class", "form-group");
    formElt.appendChild(divEmail);
    let formEmailLabel = document.createElement("label");
    formEmailLabel.setAttribute("for", "email");
    formEmailLabel.textContent = "Adresse mail :";
    divEmail.appendChild(formEmailLabel);
    let formEmailInput = document.createElement("input");
    formEmailInput.setAttribute("type", "email");
    formEmailInput.setAttribute("id", "email");
    formEmailInput.setAttribute("class", "form-control");
    formEmailInput.setAttribute("placeholder", "Mail");
    divEmail.appendChild(formEmailInput);
    //Button
    let commandBtn = document.createElement("input");
    commandBtn.setAttribute("type", "submit");
    commandBtn.setAttribute("class", "btn btn-lg btn-primary float-right");
    commandBtn.id = "totalCartSubmit";
    commandBtn.value = "Procéder au paiement";
    divEmail.appendChild(commandBtn);
  }
}

function clearPage() {
  let table = document.getElementsByTagName("table");
  for (let i = 0; i < table.length; i++) {
    while (table[i].firstChild) {
      table[i].removeChild(table[i].firstChild);
    }
  }
  let form = document.getElementsByTagName("form");
  for (let i = 0; i < form.length; i++) {
    while (form[i].firstChild) {
      form[i].removeChild(form[i].firstChild);
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
    addBtn.addEventListener("click", function (e) {
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
