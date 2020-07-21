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
class Cart {
  constructor(pItemId, pQty) {
    this.itemId = pItemId;
    this.qty = pQty;
  }
}

//TODO: stringify / parsing plutôt que de passer chaque paramètre en item localStorage.
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
//-----------------------WEB PAGE------------------------
//init pages elements:
imgElt = document.querySelector("#imageUrl");
nameElt = document.querySelector("#name");
descriptionElt = document.querySelector("#description");
priceElt = document.querySelector("#price");

//formating page:
imgElt.setAttribute("src", teddy.imageUrl);
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
  addCart(qty, teddy.id);
});

//Get the actual qty of pItemId in cart.
function getCartQty(pItemId) {
  let tempCart = localStorage.getItem("cart--" + pItemId);
  tempCart = JSON.parse(tempCart);
  let qty = tempCart.qty;
  return qty;
}

//Adds qty of pItemId in cart
let cartQtyElt = document.querySelector("#cartQty");
function addCart(pQty, pItemId) {
  let cart = new Cart(pItemId, pQty);
  if (localStorage.getItem("cart--" + cart.itemId)) {
    cart.qty += getCartQty(pItemId);
    localStorage.setItem("cart--" + pItemId, JSON.stringify(cart));
  } else {
    localStorage.setItem("cart--" + pItemId, JSON.stringify(cart));
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
  let randIndex = rndInt(stringTab.length - 1);
  document.querySelector("h1").textContent = stringTab[randIndex];
}
displayTitle(tRandHeader);
