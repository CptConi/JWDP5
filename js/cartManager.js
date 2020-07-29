export class Cart {
  constructor() {
    this.itemsList = [];
  }
  init(pList) {
    for (let i = 0; i < pList.length; i++) {
      this.addItem(pList[i]);
    }
  }
  addItem(pItem) {
    //Ajoute un item dans la liste du cart
    this.itemsList.push(pItem);
  }
  removeItem(pItem) {
    //Remove pItem from cart itemsList
    let id = pItem.id;
    for (let i = 0; i < this.itemsList.length; i++) {
      let cartItem = this.itemsList[i];
      if (id === cartItem.id) {
        this.itemsList.splice(i, 1);
      }
    }
  }
  addQty(pItem) {
    //Qty +1 pour l'item du cart pItem
    let id = pItem.id;
    for (let i = 0; i < this.itemsList.length; i++) {
      let cartItem = this.itemsList[i];
      if (id === cartItem.id) {
        let actualQty = parseInt(cartItem.qty);
        cartItem.qty = actualQty + 1;
      }
    }
  }
  subQty(pItem) {
    //Qty -1 pour l'item du cart pItem
    let id = pItem.id;
    for (let i = 0; i < this.itemsList.length; i++) {
      let cartItem = this.itemsList[i];
      if (id === cartItem.id) {
        let actualQty = parseInt(cartItem.qty);
        cartItem.qty = actualQty - 1;
        if (cartItem.qty <= 0) {
          this.removeItem(pItem);
        }
      }
    }
  }
  getTotalQty() {
    //Return total qty of items in itemsList
    let qty = 0;
    for (let item of this.itemsList) {
      qty += item.qty;
    }
    return qty;
  }
  getTotalPrice() {
    //return total price of command
    let totalPrice = 0;
    for (let item of this.itemsList) {
      totalPrice = totalPrice + (item.price * item.qty);
    }
    return totalPrice;
  }
}

export class CartItem {
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

export class Teddy {
  constructor(pId, pName, pDescription, pPrice, pImageUrl, pColor) {
    this.id = pId;
    this.name = pName;
    this.description = pDescription;
    this.price = pPrice;
    this.imageUrl = pImageUrl;
    this.tColors = pColor;
  }
}

export function setCartQtyHeader(pCart) {
  let cartQtyElt = document.querySelector("#cartQty");
  //Set cart Qty in header on page load:
  if (pCart.itemsList.length > 0) {
    cartQtyElt.textContent = pCart.getTotalQty();
  } else {
    cartQtyElt.style.display = "none";
  }
}

export function initCart(pCart) {
  //Init Cart avec les infos déjà présentes sur LocalStorage
  if (localStorage.getItem("Orinoco-cart")) {
    pCart.init(JSON.parse(localStorage.getItem("Orinoco-cart")).itemsList);
    //Création du Cart si LocalStorage vide à la clé 'Orinoco-Cart'
  }
}
