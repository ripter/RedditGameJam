/**
 * Creates and runs a challangeBar
 * @param {Object} data The name, zones, and element for the challangeBar.
 * @param {function} callback returns the
 *        zone name and an image of the user's final position.
 */
function challangeBar(data, callback) {
    var canvas = $(data.container_id + ' canvas');
    var context = canvas[0].getContext('2d');

    var height = canvas.height();
    var width = canvas.width();
    var position = 0 | (Math.random() * width);
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
        context.fillRect(data.ok[0], 0, data.ok[1], height);
        //Draw the GOOD zone
        context.fillStyle = 'green';
        context.fillRect(data.good[0], 0, data.good[1], height);
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
        if (position > data.perfect[0] &&
            position < (data.perfect[0] + data.perfect[1])) {

            //Call the callback
            callback('perfect', image_data);
        } else if (position > data.good[0] &&
            position < (data.good[0] + data.good[1])) {

            //make that call
            callback('good', image_data);

        } else if (position > data.ok[0] &&
            position < (data.ok[0] + data.ok[1])) {

            //make the call
            callback('ok', image_data);

        } else {
            //Aw, too bad
            callback('miss', image_data);
        }
    });
}

/**
 * Creates the challange data from the selected male & female.
 * @constructor
 */
function CreateChallangeData() {

}
