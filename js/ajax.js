// Exécute un appel AJAX GET
// retourne une promesse qui appelera une callback resolve si OK, reject sinon
export const ajaxGet = (url) =>{
  return new Promise((resolve, reject)  => {
  var req = new XMLHttpRequest();
  req.open("GET", url);
  req.addEventListener("load", function () {
    if (req.status >= 200 && req.status < 400) {
      // Appelle la fonction callback en lui passant la réponse de la requête
      resolve(req.responseText);
    } else {
      reject(req.status + " " + req.statusText + " " + url);
    }
  });
  
  req.send();
})
}

// Exécute un appel AJAX POST
// Le paramètre isJson permet d'indiquer si l'envoi concerne des données JSON
// Retourne une promesse qui appelera une callback resolve si OK, reject sinon
export const ajaxPost = (url, data, isJson) => {
  return new Promise((resolve, reject) => {
    var req = new XMLHttpRequest();
    req.open("POST", url);
    req.addEventListener("load", function () {
      if (req.status >= 200 && req.status < 400) {
        resolve(req.responseText);
      } else {
        resolve("Code erreur: "+ req.status + "  -- Type d'erreur : " + req.statusText + " pour l'URL: " + url);
      }
    });
    if (isJson) {
      // Définit le contenu de la requête comme étant du JSON
      req.setRequestHeader("Content-Type", "application/json");
      // Transforme la donnée du format JSON vers le format texte avant l'envoi
      data = JSON.stringify(data);
    }
    req.send(data);
  })
  }
