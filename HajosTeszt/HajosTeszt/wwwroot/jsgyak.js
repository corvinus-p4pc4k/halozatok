function f1 () {
    for(let i = 0; i < 10; i++){
        let a = document.createElement(`div`)
        a.innerText = ` ${i+1}. div`
        a.style.backgroundColor = `rgb(100,100,${250 -i*10})`
        document.getElementById("div").appendChild(a)
    }    
}

function pascal( sor, elem) {
    if (sor === 1) return 1;
    if (elem === 1 || elem === sor) return 1;
    else return pascal(sor-1,elem-1) + pascal(sor-1,elem);
}

function f2 () {
    var n = 1;
    for (var i = 0; i < 10; i++)
    {
        let a = document.createElement("div");
        a.id = `sor${i}`
        a.className = "sor"
        document.getElementById("pascal").appendChild(a)
        for (var j = 0; j < n; j++) {
            let b = document.createElement("div");
            b.innerText = pascal(i+1,j+1);
            b.id = "elem";
            
            document.getElementById(`sor${i}`).appendChild(b)

        }
        n++;
    }
    /*let a = document.createElement("div");*/
    
}



window.onload = function () {
    console.log("Oldal betöltve...");
    f1();
    f2();
    }

