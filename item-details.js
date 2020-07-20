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

teddy = new Teddy(
  sessionStorage.getItem("id"),
  sessionStorage.getItem("name"),
  sessionStorage.getItem("description"),
  sessionStorage.getItem("price"),
  sessionStorage.getItem("imageUrl"),
  sessionStorage.getItem("colors")
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
    optionElt = document.createElement('option');
    optionElt.textContent = color;
    optionElt.setAttribute('value', color);
    document.querySelector('#couleur').appendChild(optionElt);
}

//Decrease, Increase buttons
let qty = 1;
let qtyElt = document.querySelector('#qty');

let decreaseBtn = document.querySelector("#decreaseBtn");
decreaseBtn.addEventListener('click', function(e){
    e.preventDefault();
    qty--;
    if(qty == 0){
            decreaseBtn.setAttribute('disabled', 'true');
        }
    qtyElt.textContent = qty;
});

let increaseBtn = document.querySelector("#increaseBtn");
increaseBtn.addEventListener("click", function (e) {
  e.preventDefault();
  qty++;
  if(qty > 0){
      decreaseBtn.removeAttribute('disabled');
  }
  qtyElt.textContent = qty;
});

//Command Btn:
let commandBtn = document.querySelector('#commandBtn');
commandBtn.addEventListener('click', function(e){
    e.preventDefault();
})
