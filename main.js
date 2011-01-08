//Hold a list of all the clients
var clients = [];

/**
 * Main Game Code
 */
$(document).ready(function() {
    //Intialize the menu
    createMenu();

    //Create some client profiles
        //Male Profile
    clients.push({
        image: 'img/male1_min.png',
        name: 'Steve Wallus',
        sex: 'Male',
        likes: ['Cheese', 'Kittens'],
        hates: ['Homework', 'Pillows'],
        loneliness: 80,
        intelligence: 80,
        fitness: 30,
        social: 10,
        income: 50
    });
    clients.push({
        image: 'img/male2_min.png',
        name: 'Dannel Jackson',
        sex: 'Male',
        likes: ['Aliens', 'Language'],
        hates: ['Guns', 'Pollen'],
        loneliness: 30,
        intelligence: 90,
        fitness: 50,
        social: 70,
        income: 20
    });

    //Female Profile
    clients.push({
        image: 'img/female1_min.png',
        name: 'Jenna Mitcheal',
        sex: 'Female',
        likes: ['Rock', 'Books'],
        hates: ['Cheese', 'Hotdogs'],
        loneliness: 35,
        intelligence: 45,
        fitness: 65,
        social: 75,
        income: 25
    });
    clients.push({
        image: 'img/female2_min.png',
        name: 'Sam Cater',
        sex: 'Female',
        likes: ['Aliens', 'Space'],
        hates: ['Fishing', 'Boredom'],
        loneliness: 55,
        intelligence: 95,
        fitness: 65,
        social: 35,
        income: 75
    });



    //Build the profile list.
    $('#client_list').jqoteapp('#tmpl_client_profile', clients);


    //Create Challange Data
    var data = {
        container_id: '#challange',
        name: 'Intelligence',
        perfect: [90, 4],
        good: [80, 40],
        ok: [60, 100]

    };
    challangeBar(data, function(zone, img) {
        console.log('Hit zone: ', zone);
        //Diplay the image
        var context = $('#flirt_int')[0].getContext('2d');
        context.putImageData(img, 0, 0);

    });
});

function createMenu() {

    $('#client_list table').live('click', function(e) {
        //Find the client for this profile.
        var client = null;

        for (var idx = clients.length - 1; idx >= 0; idx--) {
            if (clients[idx].id == parseInt(e.currentTarget.id, 10)) {
                client = clients[idx];
                break;
            }
        }
        
        //Is it a male for female?
        if( 'Male' == client.sex ) {
            //Highlight them in blue.
            $(e.currentTarget).css('border', 'thick solid blue');
            selected_male = client;
        } else {
            //Highlight them in pink.
            $(e.currentTarget).css('border', 'thick solid pink');
            selected_female = client;
        }

        console.log('Client is:', client);
    });

}
