//Set cart Qty in header and page title on page load:
let cartQtyElt = document.querySelector("#cartQty");
if (localStorage.getItem("cartQty")) {
  cartQtyElt.textContent = localStorage.getItem("cartQty");
  document.querySelector("#cartInfos").innerHTML =
    '<p id="cartInfos" class="h6 mt-3">Votre panier contient <span id="cartNb"></span> produit(s).</p>';
  document.querySelector("#cartNb").textContent = localStorage.getItem(
    "cartQty"
  );
} else {
  cartQtyElt.style.display = "none";
}

//Getting infos from localStorage:
