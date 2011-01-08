//Hold a list of all the clients
var clients = [];

/**
 * Main Game Code
 */
$(document).ready(function() {
    //Intialize the menu
    createMenu();

    //Create some inital people
    var len = 10;
    while( len-- ) {
        male_client_list.push(new Client(true));
    }

    len = 10;
    while (len--) {
        female_client_list.push(new Client(false));
    }

    //Now let's draw the tables
    $('#males tbody').jqoteapp('#tmpl_client_row', male_client_list);
    $('#females tbody').jqoteapp('#tmpl_client_row', female_client_list);
});

function createMenu() {
    //Create the flirt dialog.
    $('#flirt').dialog({
        autoOpen: false,
        title: 'Flirt',
        width: 400
    });

    //The Flirt button!
    $('#btn_flirt').button().bind('click', function() {
        //Is there a male and a female selected?
        if (null == selected_male || null == selected_female) {
            alert('You must select a Male and a Female to flirt');
        } else {
            //Let's play the flirting game!

            challangeBar(new ChallangeData('intelligence'), function(zone, img) {
                console.log('Hit zone: ', zone);
                //Diplay the image
                var context = $('#flirt_int')[0].getContext('2d');
                context.putImageData(img, 0, 0);

            });

            //Set the images.
            $('#flirt .male').attr('src', selected_male.image);
            $('#flirt .female').attr('src', selected_female.image);
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

    $('.client-list tr').live('click', function(e) {
        //Find the client for this profile
        var target = $(e.currentTarget);
        //is the the boy list or the girl list?
        if ('males' ==  target.parent().parent().attr('id')) {
            //Set the border
            $('#males td').css('border', 'thin solid #ccc');
            $('td', target).css('border', 'thick solid blue');

            //Find the client for this profile.
            for (var idx = male_client_list.length - 1; idx >= 0; idx--) {
                if (male_client_list[idx].id == parseInt(e.currentTarget.id, 10)) {
                    selected_male = male_client_list[idx];
                    break;
                }
            }
        } else {
            //Set the border
            $('#females td').css('border', 'thin solid #ccc');
            $('td', target).css('border', 'thick solid pink');

            //Find the client for this profile.
            for (var idx = female_client_list.length - 1; idx >= 0; idx--) {
                if (female_client_list[idx].id == parseInt(e.currentTarget.id, 10)) {
                    selected_female = female_client_list[idx];
                    break;
                }
            }
        }


    });
}
