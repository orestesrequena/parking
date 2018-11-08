//var listParkings = null;

function getParkings() {
    console.log('parking');
    $.ajax({
        url: "https://opendata.lillemetropole.fr/api/records/1.0/search/?dataset=disponibilite-parkings&facet=libelle&facet=ville&facet=etat",
        method: "get",
        dataType: "json",
        success: function(json) {
            alert("success Serveur "+json.nhits);

            //var nbParkings = json.nhits;
            //listParkings = json.records;
            showParkings(json);
        },
        error: function(response) {
            alert("Erreur Serveur");
        }
    });
}

function showParkings() {
    // var parkings = json.records;
    // var nbParkings = json.nhits;

    // for(var i = 0; i < nbParkings; i++) {
    //     var parklibelle = $('#libelle');
    //     var parkEtat = $('#etat');
    //     var parkAdresse = $('#adresse');
    //     var parkVille = $('#ville');
    //     var parkDispo = $('#dispo');

    //     parklibelle.html(parkings[i].fields.libelle);
    //     parkEtat.html(parkings[i].fields.etat);
    //     parkAdresse.html(parkings[i].fields.adresse);
    //     parkVille.html(parkings[i].fields.ville);
    //     parkDispo.html(parkings[i].fields.dipo);
    // }
    var items = [];
for (var i = 1; i <= 10000; i++) {
  items.push({
    title: 'Item ' + i,
    subtitle: 'Subtitle ' + i
  });
}

var virtualList = app.virtualList.create({
  // List Element
  el: '.virtual-list',
  // Pass array with items
  items: items,
  // Custom search function for searchbar
  searchAll: function (query, items) {
    var found = [];
    for (var i = 0; i < items.length; i++) {
      if (items[i].title.toLowerCase().indexOf(query.toLowerCase()) >= 0 || query.trim() === '') found.push(i);
    }
    return found; //return array with mathced indexes
  },
  // List item Template7 template
  itemTemplate:
    '<li>' +
      '<a href="#" class="item-link item-content">' +
        '<div class="item-inner">' +
          '<div class="item-title-row">' +
            '<div class="item-title">{{title}}</div>' +
          '</div>' +
          '<div class="item-subtitle">{{subtitle}}</div>' +
        '</div>' +
      '</a>' +
    '</li>',
  // Item height
  height: app.theme === 'ios' ? 63 : 73,
});

}
