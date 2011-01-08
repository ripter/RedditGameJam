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
    console.log('Lets Flirt!');
    var context = $('#flirt_c')[0].getContext('2d');
    var width = $('#flirt_c').width();
    var height = $('#flirt_c').height();
    var center = width / 2;
    var position = center;
    var goLeft = true;

    //Set the range boxes.
    var good_len = 80;
    var ok_len = 30;


    //Create a loop to run the flirting
    var interval_id = setInterval(function() {
        //Clear the old
        //context.clearRect(0, 0, width, height);


        //Draw the ranges.
        context.fillStyle = 'red';
        context.fillRect(0, 0, width, height);

        context.fillStyle = 'yellow';
        context.fillRect(
            (center - (good_len / 2)) - ok_len,
            0,
            good_len + (ok_len * 2),
            height);

        context.fillStyle = 'green';
        context.fillRect(center - (good_len / 2), 0, good_len, height);

        context.fillStyle = 'blue';
        context.fillRect(center, 0, 4, height);

        //Draw the pointer at the current position.
        context.fillStyle = 'orange';
        context.fillRect(position, 0, 3, height);

        //Update the position
        if (goLeft && position >= (width - 3)) {
            goLeft = false;
        } else if (!goLeft && position <= 0) {
            goLeft = true;
        }

        if (goLeft) { position++; }
        else { position--; }
    }, 20);


    //Bind on keypress.
    $(document).bind('keydown', function(e) {
        //Stop the loop
        clearInterval(interval_id);
        //Figure out where they stopped.
        console.log('Position:', position);
    });
}

