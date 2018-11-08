$.ajax({
    url: "https://api.opendata.lillemetropole.fr/api/records/1.0/search/?dataset=disponibilite-parkings&facet=libelle&facet=ville&facet=etat",
    method: "get",
    dataType: "json",
    success: function(json) {
        var nbParkings = json.nhits;
        var listParkings = json.records;

    },
    error: function(response) {
        alert("Erreur Serveur");
    }
});