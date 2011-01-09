/**
 * Evil GLOBALS!!!
 * These smarmy bastereds are shared accross the game.
 */

//Holds the last unique id.
var _unique_id = 1;
//All the clients in the game.
var male_client_list = [];
var female_client_list = [];

//Selected values are used for the menu/controls
var selected_male = null;
var selected_female = null;

//Keep track of the week counter
var week_count = 1;
var money = 100;
var running_game = false;
var running_animation = false;
var game_loop_id = 0;
var animation_loop_id = 0;


/**
 * Returns a new Unqiue ID
 * @return {int} a unique id in the system.
 */
function getUniqueID() {
    //Incriment the unique
    _unique_id++;
    //Return the new value
    return _unique_id;
}


var interests = [
    'Cooking',
    'Housework',
    'Games',
    'Books',
    'Knitting',
    'Family',
    'Politics',
    'Shopping',
    'Traveling',
    'Parties',
    'Beaches',
    'Movies',
    'Gambling',
    'RealityTV',
    'Music',
    'Romance',
    'Gardening',
    'Sports',
    'SciFi',
    'Nature',
    'Technology',
    'Hiking',
    'Work',
    'Coffee',
    'Aquariums',
    'Baths',
    'Hockey',
    'Jewelry'
];

var last_names = [
    'Richards',
    'Myers',
    'Weaver',
    'Schwartz',
    'Matthews',
    'Smith',
    'Simmons',
    'Townsend',
    'Williams',
    'Thompson',
    'Jackson',
    'Carter',
    'Mitchell',
    'Frazier',
    'Black',
    'Parker',
    'Jefferson',
    'Mays',
    'Ammons',
    'Brunner',
    'Bush',
    'Gardner',
    'Cox',
    'Evans',
    'Gray',
    'Higgins',
    'Hoffer',
    'McKay',
    'Brown',
    'Newton',
    'Morris',
    'Moore',
    'Owens',
    'Quaid',
    'Rogers'
];

var first_names_male = [
    'Chris',
    'Hale',
    'Mark',
    'John',
    'Shaun',
    'Scott',
    'Craig',
    'Brandon',
    'Kyle',
    'Dustin',
    'Graham',
    'Cody',
    'Ryan',
    'David',
    'Brent',
    'Derek',
    'Bruce',
    'Matt',
    'Justin',
    'Drew',
    'Cory',
    'Steven',
    'Tim',
    'Phil',
    'Michael',
    'Thomas',
    'Austin',
    'Brian',
    'Ken',
    'Dan',
    'Daniel'
];

var first_names_female = [
    'Cassandra',
    'Jenny',
    'Jackie',
    'Kelly',
    'Emily',
    'Sasha',
    'Felicity',
    'Nancy',
    'Nora',
    'Jill',
    'Andrea',
    'Kacy',
    'Crystal',
    'Kristen',
    'Laura',
    'Sarah',
    'Courtney',
    'Dee',
    'Amy',
    'Lindsey',
    'Allison',
    'Nicole',
    'Jane',
    'Christine',
    'Michelle',
    'Anna',
    'Leah',
    'Carrie',
    'Becca',
    'Samantha',
    'Abby',
    'Jody'
];

