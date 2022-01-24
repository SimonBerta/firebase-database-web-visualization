// script to get child keys, dates and times of entries from database for both channels 
// script also adds these entries (options) to select menus in html page

var my_Keys_ai0 = [];
var my_Keys_ai1 = [];
var Dates = [];
var Times = [];
var select_ai0 = document.getElementById('select_ai0'); // html elements ids
var select_ai1 = document.getElementById('select_ai1'); 
var ai0_ref = database.ref('ai0'); // database references
var ai1_ref = database.ref('ai1');
var i = 0;

// code for AI0 channel
ai0_ref.orderByChild('time').on('child_added', (snapshot) => { // async function to order child entries by time and get their child keys
    my_Keys_ai0[i] = snapshot.key;
    var ai0_childref_date = database.ref('ai0/' + my_Keys_ai0[i] + '/0/0');
    var ai0_childref_time = database.ref('ai0/' + my_Keys_ai0[i] + '/0/1');

    ai0_childref_date.once('value', (snapshot) => { // get dates and times of measurements
        Dates[i] = snapshot.val().date;
    });
    ai0_childref_time.once('value', (snapshot) => {
        Times[i] = snapshot.val().time;
    });

    var option = '<option value="' + my_Keys_ai0[i] + '" >' + 'Date and time of measurement: ' + Dates[i] + ' ' + Times[i] + ', Child key(AI0): ' + my_Keys_ai0[i] + '</option>'; // create string with html option 
    //console.log(option);
    select_ai0.insertAdjacentHTML('beforeend', option); // insert option into html select menu 
    i++; // continue
});
// debug
//console.log(my_Keys_ai1);
i = 0;

// code for AI1 channel
// functionally the same code as for AI0 channel
ai1_ref.orderByChild('time').on('child_added', (snapshot) => {
    my_Keys_ai1[i] = snapshot.key;
    var ai1_childref_date = database.ref('ai1/' + my_Keys_ai1[i] + '/0/0');
    var ai1_childref_time = database.ref('ai1/' + my_Keys_ai1[i] + '/0/1');

    ai1_childref_date.once('value', (snapshot) => {
        Dates[i] = snapshot.val().date;
    });
    ai1_childref_time.once('value', (snapshot) => {
        Times[i] = snapshot.val().time;
    });

    var option = '<option value="' + my_Keys_ai1[i] + '" >' + 'Date and time of measurement: ' + Dates[i] + ' ' + Times[i] + ', Child key(AI1): ' + my_Keys_ai1[i] + '</option>';
    //console.log(option);
    select_ai1.insertAdjacentHTML('beforeend', option);
    i++;
});
i = 0;