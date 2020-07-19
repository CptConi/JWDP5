let teddiesURL = "http://localhost:3000/api/teddies";
let result;
let request = new XMLHttpRequest();

// Requesting Teddies array
request.onreadystatechange = function () {
  if (request.readyState === 4) {
    if (request.status == 200) {
      //Inscrire ici les path pour accéder aux infos de la réponse server, avec un JSON.parce(request.responseText.[...])
      result = JSON.parse(request.responseText);
      // Affichage et formatage des différents éléments récupérés dans result
      for (var response of result) {
        cardSection = document.querySelector("#cards");
        col = document.createElement("div");
        div1 = document.createElement("div");
        div2 = document.createElement("div");
        img = document.createElement("img");
        title = document.createElement("h2");
        description = document.createElement("p");
        price = document.createElement("p");

        cardSection.appendChild(col);
        col.appendChild(div1);
        div1.appendChild(div2);
        div1.appendChild(img);
        div2.appendChild(title);
        div1.appendChild(description);
        div1.appendChild(price);

        col.setAttribute("class", "col-4 my-3");
        div1.setAttribute("class", "card shadow");
        div2.setAttribute("class", "card-body");
        img.setAttribute("class", "card-img-top h-75");
        let imgPath = response.imageUrl;
        img.setAttribute("src", imgPath);
        title.setAttribute("class", "card-title text-center");
        description.setAttribute("class", "card-text m-1");
        price.setAttribute("class", "card-text text-right mr-3 mb-1 h4");

        title.textContent = response.name;
        description.textContent = response.description;
        price.textContent = response.price + " €";
      }
    } else {
      alert("Impossible de contacter le serveur distant.");
    }
  }
};

request.open("GET", teddiesURL, true);
request.send();
