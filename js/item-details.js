//-------------------CLASSES------------------------
class Teddy {
  constructor(pId, pName, pDescription, pPrice, pImageUrl, pColors) {
    this.id = pId;
    this.name = pName;
    this.description = pDescription;
    this.price = pPrice;
    this.imageUrl = pImageUrl;
    this.tColors = pColors;
  }
}

class CartItem {
  constructor(pItemId, pName, pDescription, pPrice, pImageUrl, pMod, pQty) {
    this.id = pItemId;
    this.name = pName;
    this.description = pDescription;
    this.price = pPrice;
    this.imageUrl = pImageUrl;
    this.tModifiers = pMod;
    this.qty = pQty;
    this.isCartItem = true;
  }
}
let bExist = true;
if (localStorage.getItem("item") === null) {
  bExist = false;
}

if (bExist) {
  let teddy = new Teddy(
    JSON.parse(localStorage.getItem("item")).id,
    JSON.parse(localStorage.getItem("item")).name,
    JSON.parse(localStorage.getItem("item")).description,
    JSON.parse(localStorage.getItem("item")).price,
    JSON.parse(localStorage.getItem("item")).imageUrl,
    JSON.parse(localStorage.getItem("item")).tColors
  );

  function formatTextAttribute(pElt, pObjParam) {
    pElt.innerHTML = pObjParam;
    pElt.style.color = "#212529";
    pElt.style.backgroundColor = "#FFFFFF";
    if (pObjParam === teddy.price) {
      pElt.innerHTML += " €";
    }
  }
  //--------------------------OPTIONNAL: RANDOM H1 ------------------------------
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
  function rndInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
  function displayTitle(stringTab) {
    if (teddy.id) {
      let randIndex = rndInt(stringTab.length - 1);
      document.querySelector("h1").textContent = stringTab[randIndex];
    }
  }
  displayTitle(tRandHeader);

  //-----------------------WEB PAGE------------------------
  //init pages elements:
  imgElt = document.querySelector("#imageUrl");
  nameElt = document.querySelector("#name");
  descriptionElt = document.querySelector("#description");
  priceElt = document.querySelector("#price");

  //formating page:
  imgElt.setAttribute("src", teddy.imageUrl);
  document.title = "Orinoco: " + teddy.name;
  formatTextAttribute(nameElt, teddy.name);
  formatTextAttribute(descriptionElt, teddy.description);
  formatTextAttribute(priceElt, teddy.price);

  //Formating color 'select'
  for (color of teddy.tColors) {
    optionElt = document.createElement("option");
    optionElt.textContent = color;
    optionElt.setAttribute("value", color);
    document.querySelector("#couleur").appendChild(optionElt);
  }
  // ---------------------BUTTONS---------------------
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

  //Get the actual qty of pItemId in cart.
  function getCartQty(pItemId) {
    let tempCart = localStorage.getItem("cart--" + pItemId);
    tempCart = JSON.parse(tempCart);
    let qty = tempCart.qty;
    return qty;
  }
} else {
  //Display if no item/infos in localStorage:
  document.querySelector("h1").textContent =
    "C'est une bonne situation ça, page cassée ?";
  document.title = "Orinoco: C'est cassé";
  subtitleElt = document.querySelector("#subtitle");
  subtitleElt.innerHTML =
    '<a href="index.html">> Par ici, je m\'occupe du reste ! <</a>';
}

//Adds qty of pItemId in cart
let cartQtyElt = document.querySelector("#cartQty");
function addCart(pQty, pItem) {
  let cart = new CartItem(
    pItem.id,
    pItem.name,
    pItem.description,
    pItem.price,
    pItem.imageUrl,
    pItem.tColors,
    pQty
  );
  if (localStorage.getItem("cart--" + cart.itemId)) {
    cart.qty += getCartQty(pItem.id);
    localStorage.setItem("cart--" + pItem.id, JSON.stringify(cart));
  } else {
    localStorage.setItem("cart--" + pItem.id, JSON.stringify(cart));
  }
  if (localStorage.getItem("cartQty")) {
    let locStorCartQty = localStorage.getItem("cartQty");
    locStorCartQty = parseInt(locStorCartQty);
    localStorage.setItem("cartQty", locStorCartQty + pQty);
  } else {
    localStorage.setItem("cartQty", pQty);
  }
  cartQtyElt.textContent = localStorage.getItem("cartQty");
  cartQtyElt.style.display = "inline";
}
//Set cart Qty in header on page load:
if (localStorage.getItem("cartQty")) {
  cartQtyElt.textContent = localStorage.getItem("cartQty");
} else {
  cartQtyElt.style.display = "none";
}
