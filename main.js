/**
 * Main Game Code
 */
$(document).ready(function() {

    //Create Challange Data
    var data = {
        container_id: '#challange',
        name: 'Intelligence',
        perfect: [90, 4],
        good:  [ 80, 40 ],
        ok: [ 60, 100 ]
        
    };
    challangeBar(data, function(zone, img) { 
        console.log('Hit zone: ', zone); 
        //Diplay the image
        var context = $('#flirt_int')[0].getContext('2d');
        context.putImageData(img, 0, 0);

    });
});

/**
 * Runs the Flirt Game
 */
function runFlirt() {
    var width = $('#flirt_int').width();
    var height = $('#flirt_int').height();
    var center = width / 2;

    var position_context =  $('#flirt_int')[0].getContext('2d');
    var position = 0 | (Math.random() * width);
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
        //Figure out where they stopped.
        console.log('Position:', position);
        var html = position;
        var display =  $('#' + active_range + ' p');

        if ('int' == active_range) {
            //Change the active range
            active_range = 'fit';
            //Change the context
            position_context =  $('#flirt_fit')[0].getContext('2d');
            //Figure out which zone they hit
            if ( position > center - 3 && position < center + 3 ) {
                html += ' Perfect!';
            } else if ( position > (center - (int_good_len / 2)) && position < (center + (int_good_len / 2) ) ) {
                html += ' Good!';
            } else if ( position > ((center - (int_good_len / 2)) - int_ok_len) && position < ((center + (int_good_len / 2)) + int_ok_len) ) {
                html += ' Ok!';
            } else {
                html += ' Miss!';     
            }
        } else if ('fit' == active_range) {
            active_range = 'soc';
            position_context =  $('#flirt_soc')[0].getContext('2d');
        } else if ('soc' == active_range) {
            active_range = 'inc';
            position_context =  $('#flirt_inc')[0].getContext('2d');
        } else {
            clearInterval(interval_id);
        }

        //Show the position
        display.html(html);

        //Reset the position
        position = 0 | (Math.random() * width);

    });
}

/**
 * Creates and runs a challangeBar
 */
function challangeBar(data, callback) {
    var canvas = $(data.container_id + ' canvas');
    var context = canvas[0].getContext('2d');

    var height = canvas.height();
    var width = canvas.width();
    var position =  0 | (Math.random() * width);
    var goLeft = true;

    //Set the Title
    $(data.container_id + ' .name').html(data.name);

    //Create a loop to run the animation
    var interval_id = setInterval(function() {
        //Draw the FAIL zone
        context.fillStyle = 'red';
        context.fillRect(0, 0, width, height);
        //Draw the OK zone
        context.fillStyle = 'yellow';
        context.fillRect( data.ok[0], 0, data.ok[1], height);
        //Draw the GOOD zone
        context.fillStyle = 'green';
        context.fillRect( data.good[0], 0, data.good[1], height);
        //Draw the PERFECT zone
        context.fillStyle = 'orange';
        context.fillRect(data.perfect[0], 0, data.perfect[1], height);

        //Draw the position marker
        context.fillStyle = 'blue';
        context.fillRect(position, 0, 4, height);
        //Update the position
        if (goLeft && position >= (width - 3)) {
            goLeft = false;
        } else if (!goLeft && position <= 0) {
            goLeft = true;
        }

        if (goLeft) { position++; }
        else { position--; }
        
    }, 20);

    //Handle any keypress
    $(document).bind('keydown', function(e) {
        //Stop the position
        clearInterval(interval_id);
        //Get the image data
        var image_data = context.getImageData(0, 0, width, height);
        //figure out which zone its in
        if ( position > data.perfect[0] && 
            position < (data.perfect[0] + data.perfect[1])){

            //Call the callback
            callback('perfect', image_data);
        } else if ( position > data.good[0] &&
            position < (data.good[0] + data.good[1])) {

            //make that call
            callback('good', image_data);

        } else if ( position > data.ok[0] &&
            position < (data.ok[0] + data.ok[1])) {

            //make the call
            callback('ok', image_data);

        } else {
            //Aw, too bad
            callback('miss', image_data);
        }
    });
}
