class Teddy {
  constructor(pId, pName, pDescription, pPrice, pImageUrl) {
    this.id = pId;
    this.name = pName;
    this.description = pDescription;
    this.price = pPrice;
    this.imageUrl = pImageUrl;
    this.color = null;
  }

  setColor(pColor) {
    this.color = pColor;
  }
}

teddy = new Teddy(
  sessionStorage.getItem("id"),
  sessionStorage.getItem("name"),
  sessionStorage.getItem("description"),
  sessionStorage.getItem("price"),
  sessionStorage.getItem("imageUrl")
);
console.log(teddy);