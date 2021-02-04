/* Redimensionne les planetes en fonction du zoom */
function setSizePlanet(size){
    let newSize = ''+size+'px';
    let planete = document.querySelectorAll(".planete");
    for(let p of planete){
        p.style.width = newSize;
        p.style.height = newSize;
        p.style.backgroundSize = newSize+' '+newSize;
        p.style.marginLeft = ''+(-(size/2))+'px';
        p.style.marginTop = ''+(-(size/2))+'px';
    }
}

/* Ajuste la position du nom des planetes en zoomant */
function setSizeName(size,margin){
    let newMargin = ''+margin+'px';
    let name = document.querySelectorAll(".planet-name");
    for(let n of name){
        n.style.marginLeft = newMargin;
        n.style.marginTop = ''+size+"px";
    }
}

/* Ajoute ou Enleve le nom des planetes */
function displayName(){
    let name = document.querySelectorAll(".planet-name");
    for(let n of name){
        n.classList.toggle("planet-name-display");
    }
}

/* Recupere les planetes visible à l'ecran */
function getVisibleMarker(markers){
    let pos = map.getBounds();
    let visibleMarkers = [];
    for(let m of markers){
        if(pos.contains(m.getLatLng())){
            visibleMarkers.push(m);
        }
    }
    return visibleMarkers;
}

/* Change la position des planetes si trop proche */
function moveMarkers(markers){
        for(let m1 of markers){
            for(let m2 of markers){
                if(m1.options.name != m2.options.name){
                    let posm1 = m1.getLatLng();
                    let posm2 = m2.getLatLng();
                    let diffLng = Math.abs(posm1.lng) - Math.abs(posm2.lng);
                    let diffLat = Math.abs(posm1.lat) - Math.abs(posm2.lat);
                    if(diffLat == 0 && diffLng == 0){
                        let lng = m1._latlng.lng + 2;
                        let lat = m1._latlng.lat;
                        m1.setLatLng(new L.LatLng(lat,lng)).update();
                    }
                    else if(diffLng < 2 && diffLng >= 0 && diffLat < 2 && diffLat >= 0){
                        let lng = m1._latlng.lng + 1;
                        let lat = m1._latlng.lat;
                        m1.setLatLng(new L.LatLng(lat,lng)).update();
                    }
                    else if(diffLng < 2 && diffLng >= 0 && diffLat > -2 && diffLat <= 0){
                        let lng = m1._latlng.lng + 1;
                        let lat = m1._latlng.lat;
                        m1.setLatLng(new L.LatLng(lat,lng)).update();
                    }
                    else if(diffLng > -2 && diffLng <= 0 && diffLat > -2 && diffLat <= 0){
                        let lng = m1._latlng.lng - 1;
                        let lat = m1._latlng.lat;
                        m1.setLatLng(new L.LatLng(lat,lng)).update();
                    }
                    else if(diffLng > -2 && diffLng <= 0 && diffLat < 2 && diffLat >= 0){
                        let lng = m1._latlng.lng - 1;
                        let lat = m1._latlng.lat;
                        m1.setLatLng(new L.LatLng(lat,lng)).update();
                    }
                    
                }
            }
        }
}