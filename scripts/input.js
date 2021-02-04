function getMarker(id){
    for(let m of markers){
        if(m.options.name == id){
            return m;
        }
    }
}
/* Si on click sur la reponse donné par la fonction search, nous montre sur la carte la planete demande */
let input = document.querySelector("#div-input");
input.addEventListener("click",function(e){
    if(e.target.nodeName == "P"){
        let wantedMarker = getMarker(e.target.textContent);
        let pos = wantedMarker.getLatLng();
        map.setView(pos,map.getMaxZoom());
    }
});

/* Cherche la planetes passe en parametre et l'affiche */
function search(){
    let parent = document.querySelector("#div-input");
    let planets = parent.querySelectorAll("p");
    let input = document.querySelector("#input");
    for(let p of planets){
        parent.removeChild(p);
    }
    if(input.value.length > 0){
        let word = input.value.toUpperCase();
        let indice = input.value.length;
        for(let m of markers){
            let marker = m.options.name.toUpperCase();
            let show = true;
            for(let i=0; i < indice;i++){
                if(word[i] != marker[i]){
                    show = false;
                }
            }
            if(show){
                let p = document.createElement("p");
                p.textContent = m.options.name;
                p.classList.add("input-response");
                input.parentNode.appendChild(p);
            }
        }
    }
}

