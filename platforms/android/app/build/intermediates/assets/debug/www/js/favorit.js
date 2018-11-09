// //get API data
// getParkingsMap();

// function callFavorit(geojson){

//     var listeParkings= geojson.records[0].fields.favorit;
//     console.log(listeParkings);

// }

function addFav (object){
    var object = JSON.parse(atob(object));

console.log('json:'+object);

    localStorage.setItem(object.recordid, object);

    var p = localStorage.getItem(object.recordid);
    
    //console.log(p.fields.ville);
    var favArray = [];

}