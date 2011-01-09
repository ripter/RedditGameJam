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
    
    //Create the flirt dialog.
    $('#flirt').dialog({
        autoOpen: false,
        title: 'Flirt',
        width: 400,
        modal: true
    });

    //The Flirt button!
    $('#btn_flirt').button().bind('click', function() {
        //Is there a male and a female selected?
        if (null == selected_male || null == selected_female) {
            $('<div><p>You must select a Male and Female to flirt.</p></div>')
                .dialog({
                    'title': 'Warning',
                    'modal': true,
                    'buttons': {
                        'Ok': function() { $(this).dialog('close'); }
                    }
                });
        } else {
            //Let's play the flirting game!
            //Stop the timer
            //stopGameLoop();
            
            //Mark that they had a date
            selected_male.hadDate = true;
            selected_female.hadDate = true;

            //Set the images.
            $('#flirt').dialog('open');

            //Run the challange minigame
            challangeLoop(new ChallangeGame());

        }
    });


    $('.client-list tr').live('click', function(e) {
        //Find the client for this profile
        var target = $(e.currentTarget);
        //is the the boy list or the girl list?
        if ('males' ==  target.parent().parent().attr('id')) {
            //Set the border
            $('#males td').css('border', 'thin solid #ccc');
            

            //Find the client for this profile.
            for (var idx = male_client_list.length - 1; idx >= 0; idx--) {
                if (male_client_list[idx].id == parseInt(e.currentTarget.id, 10)) {
                    if (!male_client_list[idx].hadDate) {
                        selected_male = male_client_list[idx];
                        $('td', target).css('border', 'thick solid blue');
                    }
                    break;
                }
            }
        } else {
            //Set the border
            $('#females td').css('border', 'thin solid #ccc');
            
            //Find the client for this profile.
            for (var idx = female_client_list.length - 1; idx >= 0; idx--) {
                if (female_client_list[idx].id == parseInt(e.currentTarget.id, 10)) {
                    if (!female_client_list[idx].hadDate) {
                        selected_female = female_client_list[idx];
                        $('td', target).css('border', 'thick solid pink');
                    }
                    break;
                }
            }
        }


    });

    var msg = '<div>';
    msg += '<h1>Welcome to Hitch\'d.</h1>';
    msg += '<p>You are running a dating service, help people find true love by teaching them to flirt!</p>';
    msg += '<p>Each week, you can select a man and a woman and help them flirt. People that don\'t flirt each week will lose happyness. If the date goes well, happyness increases. Getting someone to full happyness gives you a bonus before they leave.';
    msg += '</div>';
     $(msg)
        .dialog({
            'title': 'Hitch\'d',
            modal: true,
            'width': 500,
            'buttons': {
                'Let\'s Play': function() {
                    $(this).dialog('close');
                }
            },
            beforeClose: function() {
                //Set the game timer
                startGameLoop();
            }
        });

   
}

/**
 * Starts the game loop
 */
function startGameLoop() {
    if (!running_game) {
        running_game = true;
        game_loop_id = setInterval(gameTimer, 10000);
    }
}
/**
 * Stops the Game Loop
 */
function stopGameLoop() {
    running_game = false;
    clearInterval(game_loop_id);
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
    $('#money').html('Score: ' + money);

    //Check everyone.
    idx = male_client_list.length;
    while (idx--) {
        client = male_client_list[idx];
        //If He didn't have a date, decrease his happyness
        if (!client.hadDate) {
            client.happy -= 0 | (Math.random() * 10) + 2;
        }
        //Reset the date check
        client.hadDate = false;
        //if they have no happyness, then remove them from the list.
        if (client.happy <= 0) {
            male_delete.push(idx);
        }
        //If they have full happyness, give bonus and remove
        if (client.happy >= 100) {
            money += 100;
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
        //Reset the date check
        client.hadDate = false;
        //if they have no happyness, then remove them from the list.
        if (client.happy <= 0) {
            female_delete.push(idx);
        }
        //If they have full happyness, give bonus and remove
        if (client.happy >= 100) {
            money += 100;
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

    //Stop the game if no one is left.
    if ( 0 == male_client_list.length || 0 == female_client_list) {
        stopGameLoop();
        $('<div><p>Game over!</p><p>Your Score: '+ money +'</p></div>')
                .dialog({
                    'title': 'Congratulations',
                    'modal': true,
                    'buttons': {
                        'Ok': function() { $(this).dialog('close'); }
                    }
                });
    }
}
