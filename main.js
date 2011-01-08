/**
 * Main Game Code
 */
$(document).ready(function() {

    //Create some client profiles
    var clients = [];
    //Male Profile
    clients.push({
        image: 'img/male1.png',
        name: 'Steve Wallus',
        sex: 'Male',
        likes: ['Cheese', 'Kittens'],
        hates: ['Homework', 'Pillows'],
        loneliness: 80
    });
    //Female Profile
    clients.push({
        image: 'img/female1.png',
        name: 'Jenna Workus',
        sex: 'Female',
        likes: ['Rock', 'Books'],
        hates: ['Cheese', 'Hotdogs'],
        loneliness: 35
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


