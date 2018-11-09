mapboxgl.accessToken = 'pk.eyJ1Ijoib2RvciIsImEiOiJjam82eGtoOHQwbnMxM3FwcWxmM2ZtaW4zIn0.WVlYHUYvukEai_eSlvk38A';
var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/streets-v9', // stylesheet location
    center: [3.059, 50.631], // starting position [lng, lat]
    zoom: 13 // starting zoom
});

var geojson = {
    nhits: 26,
    parameters: {
        dataset: [
            "disponibilite-parkings"
        ],
        timezone: "UTC",
        rows: 10,
        format: "json",
        facet: [
            "libelle",
            "ville",
            "etat"
        ]
    },
    records: [{
            datasetid: "disponibilite-parkings",
            recordid: "bbb498154918c5ee22f0890fca79598d596fca30",
            fields: {
                etat: "OUVERT",
                ville: "Lille",
                coordgeo: [
                    50.637096656342,
                    3.0636064596115
                ],
                dispo: 14,
                geometry: {
                    type: "Point",
                    coordinates: [
                        3.0636064596115,
                        50.637096656342
                    ]
                },
                adresse: "Place du General de Gaulle",
                aff: "115",
                libelle: "Parking Grand Place",
                datemaj: "2018-11-07T10:40:00+00:00",
                max: 342,
                id: "LIL0011"
            },
            geometry: {
                type: "Point",
                coordinates: [
                    3.0636064596115,
                    50.637096656342
                ]
            },
            record_timestamp: "2018-11-07T10:42:07+00:00"
        },

        {
            datasetid: "disponibilite-parkings",
            recordid: "af81df7ffc0b46f15d47d9b3ba7d14f387b268e2",
            fields: {
                etat: "OUVERT",
                ville: "Lille",
                coordgeo: [
                    50.631013293077,
                    3.0626957915787
                ],
                dispo: 16,
                geometry: {
                    type: "Point",
                    coordinates: [
                        3.0626957915787,
                        50.631013293077
                    ]
                },
                adresse: "Place de la Republique",
                aff: "14",
                libelle: "Parking Republique",
                datemaj: "2018-11-07T10:40:00+00:00",
                max: 203,
                id: "LIL0001"
            },
            geometry: {
                type: "Point",
                coordinates: [
                    3.0626957915787,
                    50.631013293077
                ]
            },
            record_timestamp: "2018-11-07T10:42:07+00:00"
        },
        {
            datasetid: "disponibilite-parkings",
            recordid: "91a0e57a70bf152e806f492b98b262fe1a5f11a8",
            fields: {
                etat: "OUVERT",
                ville: "Lille",
                coordgeo: [
                    50.631466425318,
                    3.0785725846773
                ],
                dispo: 663,
                geometry: {
                    type: "Point",
                    coordinates: [
                        3.0785725846773,
                        50.631466425318
                    ]
                },
                adresse: "Boulevard des Citees Unies",
                aff: "660",
                libelle: "Parking Grand Palais",
                datemaj: "2018-11-07T10:40:00+00:00",
                max: 1219,
                id: "LIL0004"
            },
            geometry: {
                type: "Point",
                coordinates: [
                    3.0785725846773,
                    50.631466425318
                ]
            },
            record_timestamp: "2018-11-07T10:42:07+00:00"
        },
        {
            datasetid: "disponibilite-parkings",
            recordid: "ad332dfa8a4acabb241da006534cb5493fc74abe",
            fields: {
                etat: "OUVERT",
                ville: "Lille",
                coordgeo: [
                    50.636788993222,
                    3.0730428283576
                ],
                dispo: 0,
                geometry: {
                    type: "Point",
                    coordinates: [
                        3.0730428283576,
                        50.636788993222
                    ]
                },
                adresse: "164 Avenue Willy Brandt",
                aff: "1050",
                libelle: "Parking Euralille",
                datemaj: "2018-11-07T10:40:00+00:00",
                max: 2500,
                id: "LIL0006"
            },
            geometry: {
                type: "Point",
                coordinates: [
                    3.0730428283576,
                    50.636788993222
                ]
            },
            record_timestamp: "2018-11-07T10:42:07+00:00"
        }
    ],
    facet_groups: []
};

var instructions = document.getElementById('instructions');
$("#instructions").hide();

var idOk;
function showPath(e) {
    idOk = e;
    getRoute();
}

// add markers to map
geojson.records.forEach(function (marker) {
    // create a DOM element for the marker
    var el = document.createElement('div');
    el.className = 'marker ' + marker.geometry.coordinates;
    el.id = marker.fields.id;
    el.innerHTML = "<i class='material-icons'> directions_car</i>";

    switch (true) {
        case (marker.fields.dispo > 15):
            el.className += " green";
            break;
        case (marker.fields.dispo < 15 && marker.fields.dispo > 0):
            el.className += " orange";
            break;
        case (marker.fields.dispo === 0):
            el.className += " red";
            break;
    }

    var text =
        '<h3>' + marker.fields.libelle + '</h3>' +
        '<p>' + marker.fields.dispo + '</p>' +
        '<p>' + marker.fields.adresse + '</p>' +
        '<button  type="button" id=' + marker.fields.id + ' class=' + marker.geometry.coordinates + '  onclick="showPath(this.className)">' + marker.fields.id + '</button>' +
        '<button  type="button" id=' + marker.fields.id + ' class=' + marker.geometry.coordinates + ' ">Favorits</button>';

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