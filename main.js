/**
 * Main Game Code
 */
$(document).ready(function() {
    console.log('So far so good');
    runFlirt();
});

/**
 * Runs the Flirt Game
 */
function runFlirt() {
    var width = $('#flirt_int').width();
    var height = $('#flirt_int').height();
    var center = width / 2;

    var position_context =  $('#flirt_int')[0].getContext('2d');
    var position = center;
    var goLeft = true;
    var active_range = 'int';

    //Set the range boxes.
    var int_good_len = 80;
    var int_ok_len = 30;
    
    var fit_good_len = 100;
    var fit_ok_len = 10;

    var soc_good_len = 20;
    var soc_ok_len = 30;

    var inc_good_len = 52;
    var inc_ok_len = 100;


    /**
     * Draws the Flirt bar
     */
    function drawFlirtBar(context, good_len, ok_len) {
        //Background is red
        context.fillStyle = 'red';
        context.fillRect(0, 0, width, height);
        //Next the OK bar
        context.fillStyle = 'yellow';
        context.fillRect(
            (center - (good_len / 2)) - ok_len,
            0,
            good_len + (ok_len * 2),
            height);
        //Now the GOOD bar
        context.fillStyle = 'green';
        context.fillRect(center - (good_len / 2), 0, good_len, height);
        //Finally the PERFECT bar
        context.fillStyle = 'blue';
        context.fillRect(center, 0, 4, height);
    }

    /**
     * Draws the position
     */
    function drawPosition() {
        //Draw the pointer at the current position.
        position_context.fillStyle = 'orange';
        position_context.fillRect(position, 0, 3, height);

        //Update the position
        if (goLeft && position >= (width - 3)) {
            goLeft = false;
        } else if (!goLeft && position <= 0) {
            goLeft = true;
        }

        if (goLeft) { position++; }
        else { position--; }
    }

    //Create a loop to run the flirting
    var interval_id = setInterval(function() {
        //Clear the old
        //context.clearRect(0, 0, width, height);


        //Draw the ranges.
        drawFlirtBar($('#flirt_int')[0].getContext('2d'), int_good_len, int_ok_len);
        drawFlirtBar($('#flirt_fit')[0].getContext('2d'), fit_good_len, fit_ok_len);
        drawFlirtBar($('#flirt_soc')[0].getContext('2d'), soc_good_len, soc_ok_len);
        drawFlirtBar($('#flirt_inc')[0].getContext('2d'), inc_good_len, inc_ok_len);

        //Draw the position.
        drawPosition();
       
        
    }, 20);


    //Bind on keypress.
    $(document).bind('keydown', function(e) {
        //Stop the loop
        clearInterval(interval_id);
        //Figure out where they stopped.
        console.log('Position:', position);

        if ('int' == active_range) {
            //Show the position
            $('flirt_int_p').html(position);
            //Change the active range
            active_range = 'fit';
            //Change the context
            position_context =  $('#flirt_fit')[0].getContext('2d');
        } else if ('fit' == active_range) {
            $('flirt_fit_p').html(position);
            active_range = 'soc';
            position_context =  $('#flirt_soc')[0].getContext('2d');
        } else if ('soc' == active_range) {
            $('flirt_soc_p').html(position);
            active_range = 'inc';
            position_context =  $('#flirt_inc')[0].getContext('2d');
        } else {
            $('flirt_inc_p').html(position);
            cleatInterval(interval_id);
        }

        //Reset the position
        position = center;

    });
}

