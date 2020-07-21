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
  constructor(pProductId, pQty) {
    this.productId = pProductId;
    this.qty = pQty;
  }
}

let teddy = new Teddy(
  localStorage.getItem("id"),
  localStorage.getItem("name"),
  localStorage.getItem("description"),
  localStorage.getItem("price"),
  localStorage.getItem("imageUrl"),
  localStorage.getItem("colors")
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
let colorsArray = teddy.tColors.split(",");
for (color of colorsArray) {
  optionElt = document.createElement("option");
  optionElt.textContent = color;
  optionElt.setAttribute("value", color);
  document.querySelector("#couleur").appendChild(optionElt);
}

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

//Get the actual qty of pItemId in cart.
function getCartQty(pItemId) {
  let tempCart = localStorage.getItem("cart--" + pItemId);
  tempCart = JSON.parse(tempCart);
  let qty = tempCart.qty;
  console.log("getCartQty test: Valeur actuelle: " + qty);
  return qty;
}

//Adds qty of pItemId in cart
function addCart(pQty, pItemId) {
  let cart = new Cart(pItemId, pQty);
  if (localStorage.getItem("cart--" + cart.productId)) {
    cart.qty += getCartQty(pItemId);
    console.log("qté ajoutée: " + pQty);
    localStorage.setItem("cart--" + pItemId, JSON.stringify(cart));
  } else {
    localStorage.setItem("cart--" + pItemId, JSON.stringify(cart));
  }
}

//Command Btn click:
commandBtn.addEventListener("click", function (e) {
  e.preventDefault();
  addCart(qty, teddy.id);
});
