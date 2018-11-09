
function addFav (data){
    var object = getObjectFromBase64(data);

    var check = isFavorite(object.recordid);

    if(!check) {
        // enregistrement
        localStorage.setItem(object.recordid, data);

        $('#icon'+object.recordid).html('stars');
    } else {
        // suppression
        localStorage.removeItem(object.recordid);

        $('#icon'+object.recordid).html('star');
    }

    console.log('isFaborite ? :'+isFavorite(object.recordid));

    

}

function listFav(){

    
}


function isFavorite(id) {
    var favorite = localStorage.getItem(id);

    if(favorite) {
        return favorite;
    }

    return false;
}


function getObjectFromBase64(data) {
    return JSON.parse(atob(data));
}

function getObjectToBase64(data) {
    return btoa(JSON.stringify(data));
}

