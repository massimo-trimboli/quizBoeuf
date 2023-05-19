//variables
//variables pour lanimation dintro
let sceneIntro = document.querySelector(".scene-intro");
let divIntro = document.querySelector(".scene-intro div");
//pour essuyer lecran
let wipe = document.querySelector(".wipe");
let posWipeY = -100;
//compteur pour savoir quand le nombre dManimations css qui ont joues
let compteurAnimIntro = 0;
// positio de sceneIntro
let animIntroPosY = 0;

//variables pour la partie principale
let laQuestion = document.querySelector(".la-question")
let indexQuestion;
let objetQuestion;
let score = 0;

//variables fin
let textScore = document.querySelector(".score");
let textTopScore = document.querySelector(".top-score");
let zoneFin = document.querySelector("scene-fin");
let topScore;

//gestionaires devenements
//gerr=
divIntro.addEventListener("animationend", gererNbAnimations);

// temporary call // add animation later ///////////////////////////////////////////////////////////////
// afficherQusetions();

//fonction pour enlever la section d'intro
function gererNbAnimations() {
    compteurAnimIntro++
    //jouer apres la 2e animatioin
    if(compteurAnimIntro ==2){
        requestAnimationFrame(animerSceneIntro);
    }
}

function animerSceneIntro(){
    if(animIntroPosY >= -800){
        // animer la section dintro
        animIntroPosY -= 8;
        sceneIntro.style.translate = `0 ${animIntroPosY}px`;
        requestAnimationFrame(animerSceneIntro);
    }   else if (posWipeY <= 100) {
        // transition wipe
        // console.log(posWipeY);
        posWipeY += 1;
        wipe.style.translate = `0 ${posWipeY}%`
        if(posWipeY >= -5){
            sceneIntro.remove()
        }
        requestAnimationFrame(animerSceneIntro);
    } else {
        afficherQusetions();
        wipe.remove();
    }
}

function afficherQusetions() {
    //veifier qu'il reste des questions
    if(lesQuestions.length > 0) {
        //enlever les questions
        viderChoix();
        //choisir une question au hazard
        indexQuestion = Math.floor(Math.random()*lesQuestions.length);
        console.log("nobre question "+lesQuestions.length)
        objetQuestion = lesQuestions[indexQuestion];
        //ecrire la question
        laQuestion.innerText = objetQuestion.question;
        //ecrire les choix
        for(let i = 0; i<= 3; i++){
            let elmChoix = document.createElement("div");
            elmChoix.innerText = objetQuestion.choix[i];
            // verifier si cest la bonne reponse
            if(i == objetQuestion.reponse){
                elmChoix.bonneReponse = true;
            } else {
                elmChoix.bonneReponse = false;
            }
            //donner la classe
            elmChoix.classList.add("choix")

            //gestionaire devenement
            elmChoix.addEventListener("click", verifierReponse);
            elmChoix.addEventListener("mouseenter", cursorHover);
            elmChoix.addEventListener("mouseleave", cursorHover);

            // mettre lelement dans la zone
            let zoneQuestions = document.querySelector(".les-choix");
            zoneQuestions.append(elmChoix);
        }
    } else {
        afficherfin();
    }
}

//fonction pour vider la zone de choix
function viderChoix() {
    let elmADetruire = document.querySelectorAll(".choix")
    for(let elm of elmADetruire) {
        // console.log(elm);
        elm.remove()
    }
}

//fonction pour verifier si cest la bonne reponse ou non
function verifierReponse(event){
    let reponseChoisie = event.target
    //changer couleur de fond dependant de reponse
    if(reponseChoisie.bonneReponse){
        document.body.style.backgroundColor = "green"
        score++;
    } else {
        document.body.style.backgroundColor = "red"
    }
    //
    setTimeout(function(){
        document.body.style.backgroundColor = "var(--couleur-principale)";
        lesQuestions.splice(indexQuestion, 1);
        afficherQusetions();
    }, 1000)
}

//fonction pour afficher lecran de fin
function afficherfin() {
    //enlever scene question
    let sceneQuestion = document.querySelector(".scene-question");
    sceneQuestion.style.display = "none";
    //afficher score
    textScore.innerText = `score: ${score}/5`
    //top score
    //localstorage
    if(localStorage.getItem("localTopScore") == null) {
        localStorage.setItem("localTopScore", score.toString());
        topScore = Number(localStorage.getItem("localTopScore"));
    } else {
        topScore = Number(localStorage.getItem("localTopScore"));
        if(score > topScore){
            topScore = score;
            localStorage.setItem("localTopScore", topScore.toString());
        }
    }
    //afficher le topscore
    textTopScore.innerText = `top score: ${topScore}/5`
}