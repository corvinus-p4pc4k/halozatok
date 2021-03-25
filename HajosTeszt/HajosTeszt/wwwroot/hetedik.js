var kerdesek;
var aktualisKerdes = 0;

function gombok() {
    let elore = document.getElementById("elore")
    let vissza = document.getElementById("vissza")

    let v1 = document.getElementById("válasz1");
    let v2 = document.getElementById("válasz2");
    let v3 = document.getElementById("válasz3");

    elore.onclick = f1;
    vissza.onclick = f2;
    visszaSzínez();
    v1.onclick = választás;
    v2.onclick = választás;
    v3.onclick = választás;
    

}


function letoltesBefejeződött(data) {
    console.log("Sikeres letöltés");
    console.log(data);
    console.log("Siker");
    kerdesek = data;

    kérdésMegjelenítés(0);
    gombok();
}

function letoltes() {
    fetch('/json.json').
        then(response => response.json()).
        then(data => letoltesBefejeződött(data));
}


function kérdésMegjelenítés(kérdés) {

    let q = document.getElementById("kérdés_szöveg");
    let v1 = document.getElementById("válasz1");
    let v2 = document.getElementById("válasz2");
    let v3 = document.getElementById("válasz3");
    let image = document.getElementById("kép1");
    /*-----------------------------*/
    q.innerHTML = "";
    v1.innerHTML = "";
    v2.innerHTML = "";
    v3.innerHTML = "";
    image.src = "";
    /*-----------------------------*/
    q.innerHTML = kerdesek[kérdés].questionText;
    v1.innerHTML = kerdesek[kérdés].answer1;
    v2.innerHTML = kerdesek[kérdés].answer2;
    v3.innerHTML = kerdesek[kérdés].answer3;

    if (kerdesek[kérdés].image != " ") {
        image.src = "https://szoft1.comeback.hu/hajo/" + kerdesek[kérdés].image;
    }

}

var f1 = function () {
    aktualisKerdes = aktualisKerdes + 1;
    /*console.log(aktualisKerdes % kerdesek.length);*/
    kérdésMegjelenítés(aktualisKerdes % kerdesek.length)
    visszaSzínez();

}
var f2 = function () {
    aktualisKerdes = aktualisKerdes - 1;
    aktualisKerdes = Math.abs(aktualisKerdes % kerdesek.length)
    kérdésMegjelenítés(aktualisKerdes)
    visszaSzínez();
}

var választott = function (index) {
    if (kerdesek[aktualisKerdes].correctAnswer == index) {
        let valasz = document.getElementById("válasz1" + index);
        valasz.classList.add("jó")

    }

    let v1 = document.getElementById("válasz1");
    let v2 = document.getElementById("válasz2");
    let v3 = document.getElementById("válasz3");
}

var választás = function () {
    osszesPiros();
    jotSzinez();
}

function osszesPiros() {
    document.getElementById("válasz1").className = "rossz";
    document.getElementById("válasz2").className = "rossz";
    document.getElementById("válasz3").className = "rossz";
}

function jotSzinez() {
    let helyes = document.getElementById("válasz" + kerdesek[aktualisKerdes].correctAnswer)
    
    helyes.className = "jó";
}
var visszaSzínez = function () {
    document.getElementById("válasz1").className = "kattintható";
    document.getElementById("válasz2").className = "kattintható";
    document.getElementById("válasz3").className = "kattintható";

}






window.onload = function () {
    console.log("Oldal betöltve...");
    letoltes();
}
