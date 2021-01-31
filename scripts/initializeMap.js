/* Taille de l'image de fond */
let SW = [1,4096],
    NE = [4096,1];

/* creation du template des markers */
let Icon = L.divIcon({
    className: 'planete',
    iconSize:null,
    popupAnchor:[0,-20]
});

/* initialisation d'un marker et du popup*/
function createMarker(data){
    var newStyle = document.createElement('style');
    newStyle.type = "text/css";
    let markers = [];

    for(let p of data){
        let posx = p["coordonne_x"] / p["pos_multiplier"];
        let posy = -(p["coordonne_y"] / p["pos_multiplier"]);
        let marker = L.marker([posy,posx],{icon:Icon}).addTo(map);
        marker._icon.id = p["name"];
        marker.bindPopup('<img src='+p["url"]+' width="100px"><h1><a href='+p["redirection"]+'>'+p["name"]+'</a></h1>');
        markers.push(marker);

        let selector = "#"+p["name"];
        let style = selector + " {" + "background-image: url("+p["url"]+");}"
        newStyle.appendChild(document.createTextNode(style));
    }
    document.querySelector("head").appendChild(newStyle);
    return markers;
}

