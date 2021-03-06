/**
 * Creates and runs a challangeBar
 * @param {Object} data The name, zones, and element for the challangeBar.
 * @param {function} callback returns the
 *        zone name and an image of the user's final position.
 */
function challangeBar(data, speed, callback) {
    var canvas = $(data.container_id + ' canvas');
    var context = canvas[0].getContext('2d');

    var height = 30;
    var width = 200;
    var position = 0 | (Math.random() * width);
    //Start left or right?
    var goLeft = true;
    if (0 == (0 | (Math.random() * 2))) {
        goLeft = false;
    }

    //Set the Title
    $(data.container_id + ' .name').html(data.name);
    

    //Create a loop to run the animation
    if (!running_animation) {
        //Mark that the animation is running
        running_animation = true;
        //Start the timer
        animation_loop_id = setInterval(function() {
            //Draw the FAIL zone
            context.fillStyle = 'red';
            context.fillRect(0, 0, width, height);
            context.fillRect(0, 0, 200, 15);
            //Draw the OK zone
            context.fillStyle = 'yellow';
            context.fillRect(data.ok[0], 0, data.ok[1], height);
            //Draw the GOOD zone
            context.fillStyle = 'green';
            context.fillRect(data.good[0], 0, data.good[1], height);
            //Draw the PERFECT zone
            //context.fillStyle = 'orange';
            //context.fillRect(data.perfect[0], 0, data.perfect[1], height);

            //Draw the position marker
            context.fillStyle = 'blue';
            context.fillRect(position, 0, 4, height);
            //Update the position
            if (goLeft && position >= (width - 3)) {
                goLeft = false;
            } else if (!goLeft && position <= 0) {
                goLeft = true;
            }

            if (goLeft) { position += speed }
            else { position -= speed }

        }, 20);
    }

    //Handle any keypress
    $(document).bind('keydown', function(e) {
        //Stop the position
        running_animation = false;
        clearInterval(animation_loop_id);
        //Unbind
        $(document).unbind('keydown');

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
 * @param {String} name the status property to use
 */
function ChallangeData(name) {
    this.container_id = '#challange';
    this.name = name;

    //Set the starting zone size
    var good = 30;
    var ok = 60;


    //Figure out how many hearts are needed.
    this.needed_hearts = 5;
    this.hearts = 0;
    this.deadhearts = 0;
    var x, y;

    //Check intrestes 
    for (x = 0; x < 2; x++) {
        for (y = 0; y < 2; y++) {
            //Matching Likes?
            if (selected_male.like_list[x] == selected_female.like_list[y] ||
                    selected_male.hate_list[x] == selected_female.hate_list[y]) {
                //They share an intrest, remove a requirement.
                this.needed_hearts--;
                //Increate the good zone
                good += 10;
                ok -= 5;
            }

            //Like one of their dislikes?
            if (selected_male.like_list[x] == selected_female.hate_list[y] ||
                    selected_male.hate_list[x] == selected_female.like_list[y]) {
                //Uhoh, make it harder
                this.needed_hearts++;
                //Adjust the zones
                good -= 15;
                ok += 5;
            }
        }
    }

    //Set the ranges
    this.perfect = [0 | (Math.random() * 100), 4];
    this.good = [0 | (Math.random() * 100), good];
    this.ok = [0 | (Math.random() * 100), ok];

}

/**
 * Creates a Challange Game Object
 * @constructor
 */
function ChallangeGame() {
    this.level = 1;
    this.needed_hearts = 5;
    this.hearts = 0;
    this.deadhearts = 0;
    var x, y;

    //Check intrestes 
    for (x = 0; x < 2; x++) {
        for (y = 0; y < 2; y++) {
            //Matching Likes?
            if (selected_male.like_list[x] == selected_female.like_list[y] ||
                    selected_male.hate_list[x] == selected_female.hate_list[y]) {
                //They share an intrest, remove a requirement.
                this.needed_hearts--;
            }

            //Like one of their dislikes?
            if (selected_male.like_list[x] == selected_female.hate_list[y] ||
                    selected_male.hate_list[x] == selected_female.like_list[y]) {
                //Uhoh, make it harder
                this.needed_hearts++;
            }
        }
    }
}

/**
 * Runs a challange game.
 */
function challangeLoop(game_data) {
    //Create the challange data
    var challange_data = new ChallangeData('Level ' + game_data.level);

    //Set the hearts 
    $('#progress').empty(); 
    var idx = game_data.needed_hearts - game_data.hearts;
    while (idx--) {
        $('#progress').append('<img src="img/sadheart.png" />');
    }
    idx = game_data.deadhearts;
    while (idx--) {
        $('#progress').append('<img src="img/deadheart.png" />');
    }
    idx = game_data.hearts;
    while (idx--) {
        $('#progress').append('<img src="img/pumpheart.gif" />');
    }

    //Run the challange
    challangeBar( challange_data, game_data.level, function(zone, img) {
        //Which zone?
        if ('good' == zone || 'perfect' == zone) {
            game_data.hearts++;
        } else if ('miss' == zone) {
            game_data.deadhearts++;
        }

        //As long as we haven't reached the nessary number of hearts
        if (game_data.needed_hearts > (game_data.hearts + game_data.deadhearts)){
            game_data.level++;
            //recursive call
            challangeLoop(game_data);
        } else {
            //Close the prompt
            $('#flirt').dialog('close');
            
            //Did it go well?
            var percent = game_data.hearts / game_data.needed_hearts;
            if (0.9 <= percent) {
                //alert("The Date went great! Happyness greatly increased!");
                $('<div><p>The Date went great! Happiness greatly increased!</p></div>')
                .dialog({
                    'title': 'Results',
                    'modal': true
                });
                selected_male.happy += 20;
                selected_female.happy += 35;
            } else if (0.7 <= percent) {
                //alert("The date went well.");
                $('<div><p>The date went well.</p></div>')
                .dialog({
                    'title': 'Results',
                    'modal': true
                });

                selected_male.happy += 8;
                selected_female.happy += 18;
            } else {
                //alert("Uh oh, the data didn't go very well.");
                $('<div><p>Uh oh, the data didn\'t go very well.</p></div>')
                .dialog({
                    'title': 'Results',
                    'modal': true
                });

                selected_male.happy -= 25;
                selected_female.happy -= 20;
            }
            //Update the display
            $('#' + selected_male.id + ' .happy').html(selected_male.happy);
            $('#' + selected_female.id + ' .happy').html(selected_female.happy);
            //Unselect them both.
            $('#' + selected_male.id + ' td').css({
                'border': 'thin solid #ccc',
                'background-color': '#ccc'
            });
            $('#' + selected_female.id + ' td').css({
                'border': 'thin solid #ccc',
                'background-color': '#ccc'
            });
            selected_male = null;
            selected_female = null;

            //Start the main game back up
            startGameLoop();

        }
    });
}
