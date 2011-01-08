//Hold a list of all the clients
var clients = [];

/**
 * Main Game Code
 */
$(document).ready(function() {
    //Intialize the menu
    setup();

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

function setup() {
    //Set the game timer
    setInterval(gameTimer, 5000);


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

function gameTimer() {
    var client = null;
    var idx = 0;
    var male_delete = [];
    var female_delete = [];

    //Update the week
    week_count++;
    $('#time').html('Week ' + week_count);

    //Income
    money += 3 * female_client_list.length;
    money += 10 * male_client_list.length;
    $('#money').html('Cash: $' + money);

    //Check everyone.
    idx = male_client_list.length;
    while (idx--) {
        client = male_client_list[idx];
        //If He didn't have a date, decrease his happyness
        if (!client.hadDate) {
            client.happy -= 0 | (Math.random() * 10) + 2;
        }
        //if they have no happyness, then remove them from the list.
        if (client.happy <= 0) {
            male_delete.push(idx);
        }
    }
    idx = female_client_list.length;
    while (idx--) {
        client = female_client_list[idx];
        //Women don't lose happyness as fast as men
        if (!client.hadDate) {
            client.happy -= 0 | (Math.random() * 5) + 1;
        }
        //if they have no happyness, then remove them from the list.
        if (client.happy <= 0) {
            female_delete.push(idx);
        }
    }
    
    //Remove anyone that's unhappy
    idx = male_delete.length;
    while (idx--) {
        male_client_list.splice( male_delete[idx], 1);
    }
    idx = female_delete.length;
    while (idx--) {
        female_client_list.splice(female_delete[idx], 1);
    }


    //Now let's draw the tables
    $('#males tbody').empty().jqoteapp('#tmpl_client_row', male_client_list);
    $('#females tbody').empty().jqoteapp('#tmpl_client_row', female_client_list);
    //Set the slected border
    if (null != selected_male) {
        $('#' + selected_male.id + ' td').css('border', 'thick solid blue');
    }
    if (null != selected_female) {
        $('#' + selected_female.id + ' td').css('border', 'thick solid pink');
    }
}
