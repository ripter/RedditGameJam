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
    client_list.push({
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
    client_list.push({
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
    client_list.push({
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
    client_list.push({
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
    $('#client_list').jqoteapp('#tmpl_client_profile', client_list);


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
    //Create the flirt dialog.
    $('#flirt').dialog({
        autoOpen: false
    });

    //The Flirt button!
    $('#btn_flirt').button().bind('click', function() {
        //Is there a male and a female selected?
        if (null == selected_male || null == selected_female) {
            alert('You must select a Male and a Female to flirt');
        } else {
            //Let's play the flirting game!
            $('#flirt').dialog('open');
        }
    });

    //Clicking on a client profile should select them.
    $('#client_list table').live('click', function(e) {
        //Find the client for this profile.
        for (var idx = client_list.length - 1; idx >= 0; idx--) {
            if (client_list[idx].id == parseInt(e.currentTarget.id, 10)) {
                //Male or Female?
                if ('Male' == client_list[idx].sex) {
                    selected_male = client_list[idx];
                } else {
                    selected_female = client_list[idx];
                }
                break;
            }
        }

        //Clear all of the old selections
        $('.client-profile').css('border', 'thick solid #ccc');

        //Now Color the male and female
        if (null != selected_male) {
            $('#' + selected_male.id).css('border', 'thick solid blue');
        }
        if (null != selected_female) {
             $('#' + selected_female.id).css('border', 'thick solid red');
        }
    });

}
