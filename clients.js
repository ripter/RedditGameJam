/**
 * Functions for dealing with clients
 */

/**
 * Creates a new client
 * @constructor
 * @param {bool} isMale if true, it will create a male client, false female.
 */
function Client(isMale) {
    var len;

    //Pick a first name.
    if (isMale) {
        len = first_names_male.length;
        this.name = first_names_male[0 | (Math.random() * len)];
        this.sex = 'Male';
    } else {
        len = first_names_female.length;
        this.name = first_names_female[0 | (Math.random() * len)];
        this.sex = 'Female';
    }
    //Pick a last name
    len = last_names.length;
    this.name += ' ' + last_names[0 | (Math.random() * len)];

    //Pick the likes
    len = interests.length;
    var like1 = interests[0 | (Math.random() * len)];
    var like2 = interests[0 | (Math.random() * len)];
    while (like1 == like2) {
        like2 = interests[0 | (Math.random() * len)];
    }
    this.like_list = [like1, like2];

    //Pick the Hates
    var hate1 = interests[0 | (Math.random() * len)];
    var hate2 = interests[0 | (Math.random() * len)];
    while (hate1 == hate2 ||
            like1 == hate2 ||
            like2 == hate2) {
        hate2 = interests[0 | (Math.random() * len)];
    }
    this.hate_list = [hate1, hate2];

    //Set the inital happyness
    this.happy = 30 + (0 | (Math.random() * 30));

    //Initally they haven't gone on any dates
    this.hadDate = false;
}
