import {
  Cart,
  CartItem,
  Teddy,
  setCartQtyHeader,
  initCart,
} from "./cartManager.js";

window.addEventListener("load", function () {
  "use strict";
  // Au chargement de la page, on doit créer l'objet Cart, ou le récupérer de localStorage s'il existe déjà
  let orinocoCart = new Cart();
  initCart(orinocoCart);
  setCartQtyHeader(orinocoCart);

  //--------Checking Orinoco-item in localstorage to format display-------
  let bExist;
  localStorage.getItem("Orinoco-item") === null
    ? (bExist = false)
    : (bExist = true);

  if (bExist) {
    var teddy = new Teddy(
      JSON.parse(localStorage.getItem("Orinoco-item")).id,
      JSON.parse(localStorage.getItem("Orinoco-item")).name,
      JSON.parse(localStorage.getItem("Orinoco-item")).description,
      JSON.parse(localStorage.getItem("Orinoco-item")).price,
      JSON.parse(localStorage.getItem("Orinoco-item")).imageUrl,
      JSON.parse(localStorage.getItem("Orinoco-item")).tColors
    );
    displayTitle(false);
    formatInfos();
    formatButtons();
  } else {
    displayTitle(true);
  }

  function formatInfos() {
    //init pages elements:
    let imgElt = document.querySelector("#imageUrl");
    let nameElt = document.querySelector("#name");
    let descriptionElt = document.querySelector("#description");
    let priceElt = document.querySelector("#price");

    //formating page:
    imgElt.setAttribute("src", teddy.imageUrl);
    document.title = "Orinoco: " + teddy.name;
    formatTextAttribute(nameElt, teddy.name);
    formatTextAttribute(descriptionElt, teddy.description);
    formatTextAttribute(priceElt, teddy.price);

    //Formating color 'select'
    if (teddy.tColors.length === 1) {
      document.getElementById("helpText").textContent = "";
    }
    for (let color of teddy.tColors) {
      let optionElt = document.createElement("option");
      optionElt.textContent = color;
      optionElt.setAttribute("value", color);
      document.querySelector("#couleur").appendChild(optionElt);
    }
  }

  function formatButtons() {
    //Decrease, Increase buttons
    let qty = 1;
    let qtyElt = document.querySelector("#qty");

    let decreaseBtn = document.querySelector("#decreaseBtn");
    let commandBtn = document.querySelector("#commandBtn");
    decreaseBtn.addEventListener("click", function (e) {
      e.preventDefault();
      qty--;
      if (qty == 0) {
        decreaseBtn.setAttribute("disabled", "true");
        commandBtn.setAttribute("disabled", "true");
      }
      qtyElt.textContent = qty;
    });

    let increaseBtn = document.querySelector("#increaseBtn");
    increaseBtn.addEventListener("click", function (e) {
      e.preventDefault();
      qty++;
      if (qty > 0) {
        decreaseBtn.removeAttribute("disabled");
        commandBtn.removeAttribute("disabled");
      }
      qtyElt.textContent = qty;
    });

    //Command Btn click:
    commandBtn.addEventListener("click", function (e) {
      e.preventDefault();
      addCart(qty, teddy);
    });
  }

  function addCart(pQty, pItem) {
    const cartItem = new CartItem(
      pItem.id,
      pItem.name,
      pItem.description,
      pItem.price,
      pItem.imageUrl,
      pItem.tColors,
      pQty
    );
    //Check if item already exist in Object Cart
    let bAlreadyInCart = false;
    for (let item of orinocoCart.itemsList) {
      if (cartItem.id === item.id) {
        bAlreadyInCart = true;
        let actualQty = parseInt(item.qty);
        item.qty = actualQty + pQty;
      }
    }
    if (bAlreadyInCart) {
    } else {
      //Création de l'entrée Orinoco-cart dans localStorage
      orinocoCart.addItem(cartItem);
    }
    localStorage.setItem("Orinoco-cart", JSON.stringify(orinocoCart));

    //Set cart Qty in header
    let cartQtyElt = document.querySelector("#cartQty");
    cartQtyElt.textContent = orinocoCart.getTotalQty();
    cartQtyElt.style.display = "inline";
  }

  function rndInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  function displayTitle(pIsBroken) {
    if (pIsBroken) {
      //Display if no item/infos in localStorage:
      document.querySelector("h1").textContent =
        "C'est une bonne situation ça, page cassée ?";
      document.title = "Orinoco: C'est cassé";
      let subtitleElt = document.getElementById("subtitle");
      subtitleElt.innerHTML =
        '<a href="index.html" id="subtitle">> Par ici, je m\'occupe du reste ! <</a>';
    } else {
      let tRandHeader = [
        "Excellent choix",
        "Wow, vous avez du goût !",
        "J'ai pris le même à mon neveu",
        "Ma fille l'a adoré !",
        "C'est pas dans la description, mais il est tout doux !",
        "Pour l'accompagner au pays des songes...",
        "Ils sont pas trop mignons, ces petits yeux ?",
        "Meilleur rapport qualité prix !",
        "Fabriqué en France !",
      ];
      let randIndex = rndInt(tRandHeader.length - 1);
      document.querySelector("h1").textContent = tRandHeader[randIndex];
    }
  }

  function formatTextAttribute(pElt, pObjParam) {
    pElt.innerHTML = pObjParam;
    pElt.style.color = "#212529";
    pElt.style.backgroundColor = "#FFFFFF";
    if (pObjParam === teddy.price) {
      pElt.innerHTML += " €";
    }
  }
});
