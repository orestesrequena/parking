function getParkings(virtualList) {
    // console.log('parking');
    $.ajax({
        url: "https://opendata.lillemetropole.fr/api/records/1.0/search/?dataset=disponibilite-parkings&facet=libelle&facet=ville&facet=etat",
        method: "get",
        dataType: "json",
        success: function(json) {
                        
            for (var i = 0; i < json.records.length; i++) {
                var disponibilite = json.records[i].fields.dispo;
                var color = " red";

                if(disponibilite > 15) {
                   color = " green";
                } 
                if(disponibilite < 15 && disponibilite > 0 ) {
                    color = " orange";
                }

          
                virtualList.appendItem({
                    color: color,
                    id: i,
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