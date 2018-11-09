mapboxgl.accessToken = 'pk.eyJ1Ijoib2RvciIsImEiOiJjam82eGtoOHQwbnMxM3FwcWxmM2ZtaW4zIn0.WVlYHUYvukEai_eSlvk38A';
var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/streets-v9', // stylesheet location
    center: [3.059, 50.631], // starting position [lng, lat]
    zoom: 13 // starting zoom
});

//get API data
getParkingsMap();

var instructions = document.getElementById('instructions');
$("#instructions").hide();

var idOk;

function showPath(e) {
    idOk = e;
    getRoute();
}

function callParkings(geojson) {
    geojson.records.forEach(function (marker) {
        // create a DOM element for the marker
        var el = document.createElement('div');
        el.className = 'marker ' + marker.geometry.coordinates;
        el.id = marker.fields.id;
        el.innerHTML = "<i class='material-icons'> directions_car</i>";

        var obj= getObjectToBase64(marker);
        console.log(obj);

        var icon = "star";

        if(isFavorite(marker.recordid)) {
            icon = "stars";
            console.log("fav: "+icon+" - "+marker.recordid);
        }
        
        switch (true) {
            case (marker.fields.dispo > 15):
                el.className += " green";
                break;
            case (marker.fields.dispo < 16 && marker.fields.dispo > 0):
                el.className += " orange";
                break;
            case (marker.fields.dispo === 0):
                el.className += " red";
                break;
        }

        //addFav("'+ obj+'");
        var text ='<div class="chip">'+'<div class="chip-media bg-color-blue">'+
        '<i class="icon f7-icons ios-only cursor">compass</i>'+
        '<i id="icon'+marker.recordid+'" class="icon material-icons md-only cursor" onclick=\'addFav("'+obj+'");\'>'+icon+'</i>'+
        '</div>'+
        '<div class="chip-label">'+ marker.recordid +' '+ marker.fields.libelle +'</div>'+
        '</div>'+
        '<p>Places disponibles: ' + marker.fields.dispo + '</p>' +
             '<p>Adresse: ' + marker.fields.adresse + ' <i class="material-icons cursor" id=' + marker.geometry.coordinates + ' onclick="showPath(this.id)" >near_me</i></p>'
             ;

        var popup = new mapboxgl.Popup({
                offset: 25
            })
            .setLngLat(marker.geometry.coordinates)
            .setHTML(text);

        // add marker to map
        new mapboxgl.Marker(el)
            .setLngLat(marker.geometry.coordinates)
            .setPopup(popup)
            .addTo(map);

    });
}

var startLat = "";
var startLng = "";

function maPosition(position) {
    startLat = position.coords.latitude;
    startLng = position.coords.longitude;
}

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(maPosition);
}

function getRoute() {

    if (map.getLayer('route')) {
        try {
            map.removeLayer('route').removeSource('route');
            map.removeLayer('start').removeSource('start');
            map.removeLayer('end').removeSource('end');
        } catch (err) {}
    }

    var start = [startLng, startLat];
    var end = idOk;
    if (startLat) {}
    var directionsRequest = 'https://api.mapbox.com/directions/v5/mapbox/driving-traffic/' + startLng + ',' + startLat + ';' + end + '?steps=true&geometries=geojson&access_token=' + mapboxgl.accessToken;
    $.ajax({
        method: 'GET',
        url: directionsRequest,
    }).done(function (data) {
        var route = data.routes[0].geometry;
        map.addLayer({
            id: 'route',
            type: 'line',
            source: {
                type: 'geojson',
                data: {
                    type: 'Feature',
                    geometry: route
                }
            },
            paint: {
                'line-width': 2
            }
        });
        map.addLayer({
            id: 'start',
            type: 'circle',
            source: {
                type: 'geojson',
                data: {
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: start
                    }
                }
            }
        });
        map.addLayer({
            id: 'end',
            type: 'circle',
            source: {
                type: 'geojson',
                data: {
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: end
                    }
                }
            }
        });

        if (instructions.innerHTML != "") {
            instructions.innerHTML = "";
        }
        var steps = data.routes[0].legs[0].steps;
        $("#instructions").show();
        steps.forEach(function (step) {
            instructions.insertAdjacentHTML('beforeend', '<p> -' + step.maneuver.instruction + '</p> <br/>');
        });

    });
}