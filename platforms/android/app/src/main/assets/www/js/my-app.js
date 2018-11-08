// Initialize app
var myApp = new Framework7();


// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function () {
    console.log("Device is ready!");
});


// Now we need to run the code that will be executed only for About page.

// Option 1. Using page callback for page (for "about" page in this case) (recommended way):

function dump(obj) {
    var out = '';
    for (var i in obj) {
        out += i + ": " + obj[i] + "\n";
    }

    alert(out);
}

/*
myApp.onPageInit('about', function (page) {
    // Do something here for "about" page

    
    // Dummy items array
    var items = [];
    for (var i = 1; i <= 10000; i++) {
        items.push({
            title: 'Titre numéro ' + i,
            subtitle: 'Subtitle ' + i
        });
    }

    console.log('list: '+items[0].title);

    var virtualList = myApp.virtualList.create({
        // List Element
        el: '.virtual-list',
        // Pass array with items
        items: items,
        currentFromIndex: 0,
        currentToIndex: 10,
        // Custom search function for searchbar
       
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
        height: myApp.theme === 'ios' ? 63 : 73,
    });
    //virtualList.appendItems(items);
    //virtualList.update();


})*/

// Option 2. Using one 'pageInit' event handler for all pages:

$$(document).on('pageInit', function (e) {
    // Get page data from event data
    var page = e.detail.page;

    if (page.name === 'about') {
        // Following code will be executed for page with data-page attribute equal to "about"
        //myApp.alert('Here comes About page');

        

        
    }
})


/*
// Option 3. Using live 'pageInit' event handlers for each page
$$(document).on('pageInit', '.page[data-page="about"]', function (e) {
    // Following code will be executed for page with data-page attribute equal to "about"
    //myApp.alert('Here comes About page2');



})

*/