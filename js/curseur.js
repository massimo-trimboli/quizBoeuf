//variable pour le curseur
let curseur = document.querySelector(".curseur");

//si a une souris
if (matchMedia('(pointer:fine)').matches) {
    //gestionaire devenenment
    document.addEventListener("mousemove", deplacerCurseur);
} else {
    curseur.style.display = "none"
}

//fonction pour deplacer le curseur
function deplacerCurseur(event) {
    // console.log(event);
    curseur.style.left = `${event.clientX - 18}px`
    curseur.style.top = `${event.clientY - 18}px`
}

function cursorHover(event){
    if(event.type == "mouseenter"){
        curseur.classList.add("hover");
    } else {
        curseur.classList.remove("hover");
    }
}