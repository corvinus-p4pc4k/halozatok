var aktKerdes;


var aktualisGyakoroltatottKerdesek = [];
var aktualisGyakoroltatottKerdesekIndex = 0;
var aktualisKerdes = 1;

var osszesKerdes;




function letoltesBefejeződött(data) {
    console.log("Sikeres letöltés");
    console.log(data);
    //aktKerdes = data;
    //aktualisGyakoroltatottKerdesek.push([aktKerdes, 0])
    aktualisGyakoroltatottKerdesek[aktualisGyakoroltatottKerdesekIndex] =[data, 0];
    aktKerdes = data;
    kérdésMegjelenítés(data);
    visszaSzínez();
}

function letoltes() {
    fetch(`/questions/${aktualisKerdes}`)
        .then(response => {
            if (!response.ok) {
                console.error(`Hibás válasz: ${response.status}`)
            }
            else {
                return response.json()
            }
        })
        .then(data => letoltesBefejeződött(data));
}

function osszesKerdesLetoltes() {
    osszesKerdes=  fetch(`/questions/count`)
        
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

var f = function (szam) {

    console.log(aktualisGyakoroltatottKerdesek[aktualisGyakoroltatottKerdesekIndex][1])
    if (aktualisGyakoroltatottKerdesek[aktualisGyakoroltatottKerdesekIndex][1] == 3 ) {
        aktualisKerdes = aktualisKerdes + 1;
        letoltes();
    }
    else if (aktualisGyakoroltatottKerdesek.length < 3) {
        aktualisGyakoroltatottKerdesekIndex++;
        aktualisKerdes = aktualisKerdes + 1;
        letoltes();
    }
    else {
        aktualisGyakoroltatottKerdesekIndex = Math.abs(aktualisGyakoroltatottKerdesekIndex + szam) % 3

        aktKerdes = aktualisGyakoroltatottKerdesek[aktualisGyakoroltatottKerdesekIndex][0]
        visszaSzínez();
        kérdésMegjelenítés(aktKerdes)
    }




}
var f2 = function () {
    aktualisKerdes = aktualisKerdes - 1;
    visszaSzínez();
    letoltes();
}


var választás = function (jelolt) {
    osszesPiros();
    jotSzinez();
    if (jelolt == aktKerdes.correctAnswer) {
        aktualisGyakoroltatottKerdesek[aktualisGyakoroltatottKerdesekIndex][1]++;
    }
    else {
        if (aktualisGyakoroltatottKerdesek[aktualisGyakoroltatottKerdesekIndex][1] > 0) {
            aktualisGyakoroltatottKerdesek[aktualisGyakoroltatottKerdesekIndex][1]--;
        }

    }
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
    osszesKerdesLetoltes();
    console.log(osszesKerdes)
    letoltes();
}
