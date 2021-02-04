let move = [];
let actualZoom;


/* initialisation d'un marker et du popup*/
function createMarker(data){
    let markers = [];
    for(let p of data){
        let posx = p["coordonne_x"] / 32;
        let posy = -(p["coordonne_y"] / 32);
        let a = L.divIcon({
            html:"<p class='planet-name planet-name-display'>"+p["name"]+"</p>",
            className:[p["class"]+" planete"],
            iconSize:null,
            popupAnchor:[0,-20]
        });
        let marker = L.marker([posy,posx],{icon:a,url:p["url"],name:p["name"]}).addTo(planet);
        marker.bindPopup('<img src='+p["url"]+ ' width="100px"><h1><a class="popup-lien" href='+p["redirection"]+'>'+p["name"]+'</a></h1>');
        markers.push(marker);
    }
    return markers;
}


function createClass(markers){
    let style = document.createElement("style");
    for(let m of markers){
        let selector = "."+m._icon.classList[1];
        let content = selector + "{ background-image:url('"+ m.options.url+"');}";
        style.appendChild(document.createTextNode(content));
    }
    document.head.appendChild(style);
}

let showName = true;
/* initialisation de la zone de la carte */
let SW = [1,8192],
    NE = [8192,1];
/* initialisation de la map */
let route = L.layerGroup();
let planet = L.layerGroup().addTo(map);
let namePlanet = L.layerGroup().addTo(map);

let lng = [ [-137,49] ,[-146.125,54.5],[-159.78,61.125],[-166.718,65.406],[-177.4375,74.25],[-185.218,81.406]];
let polyline = L.polyline(lng, {color: 'white',weight:5}).bindPopup("<p>Sanctuary Pipeline</p>").addTo(route);

let area = new L.LatLngBounds(
    map.unproject(SW,map.getMaxZoom()),
    map.unproject(NE,map.getMaxZoom())
);
let space = L.tileLayer('tiles/{z}/{x}/{y}.png',{
    crs:L.CRS.Simple,
    minZoom:1,
    maxZoom:5,
    noWrap:true,
    bounds:area
});
space.addTo(map);

/* Peux pas bouger en-dehors de la map */
//map.setMaxBounds(area);
map.fitBounds(area);
let markers = createMarker(data);
createClass(markers);


let overlays = {
    "Route":route,
    "Planete":planet,
    "Name":namePlanet
};
let baseLayers = {
    "Space":space
};


L.control.layers(baseLayers,overlays,{hideSingleBase:true,collapsed:false}).addTo(map);
