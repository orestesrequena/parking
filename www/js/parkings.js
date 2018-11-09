function getParkings(virtualList) {
    // console.log('parking');
    $.ajax({
        url: "https://opendata.lillemetropole.fr/api/records/1.0/search/?dataset=disponibilite-parkings&facet=libelle&facet=ville&facet=etat",
        method: "get",
        dataType: "json",
        success: function(json) {
                        
            for (var i = 0; i < json.records.length; i++) {
                var disponibilite = json.records[i].fields.dispo;
                // var el = document.getElementsByClassName('material-icons');

                // switch (disponibilite) {
                //     case (disponibilite > 15):
                //         el.className += " green";
                //         break;
                //     case (disponibilite < 15 && disponibilite > 0):
                //         el.className += " orange";
                //         break;
                //     case (disponibilite === 0):
                //         el.className += " red";
                //         break;
                // }

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