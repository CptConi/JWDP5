import { Cart, initCart, setCartQtyHeader } from "./cartManager.js";

//Set cart Qty in header on page load:
let orinocoCart = new Cart();
initCart(orinocoCart);
setCartQtyHeader(orinocoCart);

cleanPage();

//Check if sessionStorage Orinoco-confirmInfos exists:
let bInfosExist = false;

if (sessionStorage.getItem("Orinoco-ConfirmationInfos")){
    bInfosExist = true
}

if (bInfosExist){
    let commandInfos = JSON.parse(sessionStorage.getItem('Orinoco-ConfirmationInfos'));
    let commandId = commandInfos.id;
    let totalPrice = commandInfos.totalPrice;
    let contentElt = document.querySelector("#content");
    let p1Elt = document.createElement('p')
    p1Elt.setAttribute("class", "h5 confirmMessage");
    p1Elt.innerHTML = 'Votre commande est confirmée ! Votre identifiant de commande est le suivant : </br><strong id="idCommand"></strong>';
    contentElt.appendChild(p1Elt);
    
    let commandIdElt = document.querySelector('#idCommand');
    commandIdElt.textContent = commandId;

    let p2Elt = document.createElement("p");
    p2Elt.setAttribute("class", "h5 confirmMessage");
    p2Elt.innerHTML =
      'Faites chauffer la CB, Son prix total est de : </br><strong id="totalPrice"></strong>';
    contentElt.appendChild(p2Elt);
    let priceElt = document.querySelector("#totalPrice");
    priceElt.textContent = totalPrice +' €';
}else{
    cleanPage();
    let titleElt = document.querySelector('#title')
    titleElt.textContent = 'Je pense que vous vous êtes perdus...'
}



  function cleanPage() {
    let contentElt = document.querySelector("#content");
    while (contentElt.firstChild) {
      contentElt.removeChild(contentElt.firstChild);
    }
  }