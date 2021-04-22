var aktKerdes;
var aktualisKerdes = 1;

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
    //console.log("Siker");
    aktKerdes = data;

    kérdésMegjelenítés(data);
    gombok();
}

function letoltes() {
    /*fetch('/questions/'+aktualisKerdes)
    .then(response => response.json())
        .then(data => letoltesBefejeződött(data)
);*/
    fetch(`/questions/${aktualisKerdes}`)
        .then(response => {
            if (!response.ok) {
                console.error(`Hibás válasz: ${response.status}`)
                aktualisKerdes = 1;
            }
            else {
                return response.json()
            }
        })
        .then(data => letoltesBefejeződött(data));
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
    q.innerHTML = kérdés.questionText;
    v1.innerHTML = kérdés.answer1;
    v2.innerHTML = kérdés.answer2;
    v3.innerHTML = kérdés.answer3;

    if (kérdés.image != " ") {
        image.src = "https://szoft1.comeback.hu/hajo/" + kérdés.image;
    }

}

var f1 = function () {
    aktualisKerdes = aktualisKerdes + 1;
    letoltes();
    visszaSzínez();


}
var f2 = function () {
    aktualisKerdes = aktualisKerdes - 1;
    visszaSzínez();
    letoltes();
}


var választás = function () {
    osszesPiros();
    jotSzinez();
}

function osszesPiros() {
    document.getElementById("válasz1").className = "rossz kattintható kerdes";
    document.getElementById("válasz2").className = "rossz kattintható kerdes";
    document.getElementById("válasz3").className = "rossz kattintható kerdes";
}

function jotSzinez() {
    let helyes = document.getElementById("válasz" + aktKerdes.correctAnswer)
    
    helyes.className = "jó kattintható kerdes";
}
var visszaSzínez = function () {
    document.getElementById("válasz1").className = "kattintható kerdes";
    document.getElementById("válasz2").className = "kattintható kerdes ";
    document.getElementById("válasz3").className = "kattintható kerdes";

}






window.onload = function () {
    console.log("Oldal betöltve...");
    letoltes();
}
