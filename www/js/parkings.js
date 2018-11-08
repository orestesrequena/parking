function getParkings(virtualList) {
    console.log('parking');
    $.ajax({
        url: "https://opendata.lillemetropole.fr/api/records/1.0/search/?dataset=disponibilite-parkings&facet=libelle&facet=ville&facet=etat",
        method: "get",
        dataType: "json",
        success: function(json) {
                        
            for (var i = 0; i < json.records.length; i++) {
                var disponibilite = json.records[i].fields.dispo > 0 ? "dispo.jpg" : "nondispo.jpg";


                virtualList.appendItem({
                    records: json.records[i],
                    disponibilite: disponibilite
                });                
            }

        },
        error: function(response) {
            alert("Erreur Serveur");
        }
    });
}