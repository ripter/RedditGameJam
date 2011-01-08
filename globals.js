/**
 * Evil GLOBALS!!!
 * These smarmy bastereds are shared accross the game.
 */

//Holds the last unique id.
var _unique_id = 1;
//All the clients in the game.
var client_list = [];

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

