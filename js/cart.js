import { CartItem, setCartQtyHeader, Cart, initCart } from "./cartManager.js";
import { ajaxPost } from "./ajax.js";

window.addEventListener("load", function () {
  "use strict";
  var teddiesPostURL = "http://localhost:3000/api/teddies/order";

  class Contact {
    constructor(pPrenom, pNom, pAddress, pCity, pEmail) {
      this.firstName = pPrenom;
      this.lastName = pNom;
      this.address = pAddress;
      this.city = pCity;
      this.email = pEmail;
    }
  }

  class PayoutRequest {
    constructor(pPrenom, pNom, pAdress, pCity, pEmail, pCart) {
      //Init contact part
      this.contact = new Contact(pPrenom, pNom, pAdress, pCity, pEmail);
      //Init Products array
      this.products = [];
      for (let i = 0; i < pCart.itemsList.length; i++) {
        for (let j = 0; j < pCart.itemsList[i].qty; j++) {
          let productId = pCart.itemsList[i].id;
          this.products.push(productId);
        }
      }
    }
  }

  //Set cart Qty in header on page load:
  let orinocoCart = new Cart();
  initCart(orinocoCart);
  setCartQtyHeader(orinocoCart);

  refreshPage();

  function refreshPage() {
    let isEmpty;
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

      initTable();
      formatTableContent();
      initForm();
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

      //DEL Button
      let delTdElt = document.createElement("td");
      delTdElt.setAttribute("scope", "row");
      delTdElt.setAttribute("class", "d-none d-sm-table-cell");
      trElt.appendChild(delTdElt);
      let delBtn = document.createElement("button");
      delBtn.setAttribute("class", "btn btn-outline-danger btn-sm");
      delBtn.textContent = "X";
      delTdElt.appendChild(delBtn);
      //Item picture
      let imgTdElt = document.createElement("td");
      trElt.appendChild(imgTdElt);
      let imgElt = document.createElement("img");
      imgElt.setAttribute("src", myCartItem.imageUrl);
      imgElt.setAttribute("id", "tabImg");
      imgTdElt.setAttribute("class", "d-none d-sm-table-cell");
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
      minusBtn.setAttribute(
        "class",
        "btn btn-outline-secondary btn-sm mx-1 mx-sm-3"
      );
      minusBtn.textContent = "-";
      // [ + ] Button
      let addBtn = document.createElement("button");
      addBtn.setAttribute(
        "class",
        "btn btn-outline-secondary btn-sm mx-1 mx-sm-3"
      );
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

  function initTable() {
    let containerElt = document.querySelector("#cartTab");
    //Init tables Headers:
    //Cart:
    let tableElt = document.createElement("table");
    tableElt.setAttribute("class", "col-12 table table-hover");
    containerElt.appendChild(tableElt);
    tableElt.innerHTML =
      '<thead class="thead-dark"><tr><th scope="col" class="tab-hide"> </th> <th scope="col" class="tab-hide"> </th> <th scope="col">Article</th> <th scope="col">Prix</th> <th scope="col">Quantité</th> <th scope="col">Total</th> </tr></thead><tbody></tbody>';
    //Total price
    //tHeader
    let totalTableElt = document.createElement("table");
    totalTableElt.setAttribute("class", "col-6 table my-5");
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
  }

  function initForm() {
    document
      .querySelector("#totalTable")
      .insertAdjacentHTML(
        "afterend",
        '<form id="payoutForm" class="border rounded"></form>'
      );
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
    formPrenomInput.setAttribute("required", "true");
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
    formNomInput.setAttribute("required", "true");
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
    formAdressLabel.textContent = "Adresse :";
    colAdress.appendChild(formAdressLabel);
    let formAdressInput = document.createElement("input");
    formAdressInput.setAttribute("type", "text");
    formAdressInput.setAttribute("id", "Adress");
    formAdressInput.setAttribute("class", "form-control");
    formAdressInput.setAttribute("required", "true");
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
    formCityInput.setAttribute("required", "true");
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
    formEmailInput.setAttribute("required", "true");
    formEmailInput.setAttribute("placeholder", "Mail");
    divEmail.appendChild(formEmailInput);
    //Button
    let commandBtn = document.createElement("input");
    commandBtn.setAttribute("type", "submit");
    commandBtn.setAttribute("class", "btn btn-lg btn-primary float-right");
    commandBtn.id = "totalCartSubmit";
    commandBtn.value = "Procéder au paiement";
    divEmail.appendChild(commandBtn);

    formElt.addEventListener("submit", function (e) {
      e.preventDefault();
      let payoutReq = new PayoutRequest(
        formPrenomInput.value,
        formNomInput.value,
        formAdressInput.value,
        formCityInput.value,
        formEmailInput.value,
        orinocoCart
      );
      //  Formating request in 'data'
      let data = {
        contact: {
          firstName: payoutReq.contact.firstName,
          lastName: payoutReq.contact.lastName,
          address: payoutReq.contact.address,
          city: payoutReq.contact.city,
          email: payoutReq.contact.email,
        },
        products: payoutReq.products,
      };
      if (
        isDataValid("firstName", data.contact.firstName) &&
        isDataValid("lastName", data.contact.lastName) &&
        isDataValid("address", data.contact.address) &&
        isDataValid("city", data.contact.city) &&
        isDataValid("email", data.contact.email)
      ) {
        // Send POST req to server to get command confirm
        ajaxPost(teddiesPostURL, data, true)
          .then(createConfirmInfos)
          .catch(() => {
            console.error(err);
          });
        //Emptying cart:
        localStorage.removeItem("Orinoco-cart");
      }
    });
  }

  function isDataValid(pType, pData) {
    let regex;
    let validLenght;
    switch (pType) {
      case "firstName":
        regex = new RegExp(/^[a-z ,.'-]+$/i);
        pData.trim().length > 0 ? (validLenght = true) : (validLenght = false);
        if (!validLenght || !regex.test(pData)) {
          alert("Format du prénom invalide");
          return false;
        }
        break;
      case "lastName":
        regex = new RegExp(/^[a-z ,.'-]+$/i);
        pData.trim().length > 0 ? (validLenght = true) : (validLenght = false);
        if (!validLenght || !regex.test(pData)) {
          alert("Format du nom invalide");
          return false;
        }
        break;
      case "city":
        regex = new RegExp(/^[a-z ,.'-]+$/i);
        pData.trim().length > 0 ? (validLenght = true) : (validLenght = false);
        if (!validLenght || !regex.test(pData)) {
          alert("Format de la ville invalide");
          return false;
        }
        break;
      case "address":
        pData.trim().length > 5 ? (validLenght = true) : (validLenght = false);
        if (!validLenght){
          alert("Format de l'adresse invalide");
          return false;
        }
        break;
      case "email":
        regex = new RegExp(
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
        pData.trim().length > 0 ? (validLenght = true) : (validLenght = false);
        if (!validLenght || !regex.test(pData)) {
          alert("Format de l'adresse mail invalide");
          return false;
        }
        break;
      default:
        console.error("isDataValid wrong argument");
    }
    return true;
  }

  function createConfirmInfos(reqResponse) {
    let confirmInfos = {
      id: JSON.parse(reqResponse).orderId,
      totalPrice: orinocoCart.getTotalPrice(),
    };
    sessionStorage.setItem(
      "Orinoco-ConfirmationInfos",
      JSON.stringify(confirmInfos)
    );
    window.location = "command-confirm.html";
  }
});
