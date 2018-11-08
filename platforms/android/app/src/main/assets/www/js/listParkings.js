
function showParkings(json) {
    var parkings = json.records;

    for(var i = 0; i < parkings.length; i++) {
        var libelle = parkings[i].fields.libelle;
        var etat = parking[i].fields.etat;
        var ville = parkings[i].fields.ville;
        var coord = parkings[i].fields.coordgeo;
        var dispo = parkings[i].fields.dispo;
        var adresse = parkings[i].fields.adresse;
    }

    
}