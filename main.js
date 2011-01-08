/**
 * Main Game Code
 */
$(document).ready(function() {
    //Intialize the menu
    createMenu();

    //Create some client profiles
    var clients = [];
    //Male Profile
    clients.push({
        image: 'img/male1.png',
        name: 'Steve Wallus',
        sex: 'Male',
        likes: ['Cheese', 'Kittens'],
        hates: ['Homework', 'Pillows'],
        loneliness: 80,
        intelligence: 80,
        fitness: 30,
        social: 10,
        income: 50
    });
    clients.push({
        image: 'img/male2.png',
        name: 'Dannel Jackson',
        sex: 'Male',
        likes: ['Aliens', 'Language'],
        hates: ['Guns', 'Pollen'],
        loneliness: 30,
        intelligence: 90,
        fitness: 50,
        social: 70,
        income: 20
    });

    //Female Profile
    clients.push({
        image: 'img/female1.png',
        name: 'Jenna Mitcheal',
        sex: 'Female',
        likes: ['Rock', 'Books'],
        hates: ['Cheese', 'Hotdogs'],
        loneliness: 35,
        intelligence: 45,
        fitness: 65,
        social: 75,
        income: 25
    });
    clients.push({
        image: 'img/female2.png',
        name: 'Sam Cater',
        sex: 'Female',
        likes: ['Aliens', 'Space'],
        hates: ['Fishing', 'Boredom'],
        loneliness: 55,
        intelligence: 95,
        fitness: 65,
        social: 35,
        income: 75
    });



    //Build the profile list.
    $('#client_list').jqoteapp('#tmpl_client_profile', clients);


    //Create Challange Data
    var data = {
        container_id: '#challange',
        name: 'Intelligence',
        perfect: [90, 4],
        good: [80, 40],
        ok: [60, 100]

    };
    challangeBar(data, function(zone, img) {
        console.log('Hit zone: ', zone);
        //Diplay the image
        var context = $('#flirt_int')[0].getContext('2d');
        context.putImageData(img, 0, 0);

    });
});

function createMenu() {
    $( "#beginning" ).button({
			text: false,
			icons: {
				primary: "ui-icon-seek-start"
			}
		});
		$( "#rewind" ).button({
			text: false,
			icons: {
				primary: "ui-icon-seek-prev"
			}
		});
		$( "#play" ).button({
			text: false,
			icons: {
				primary: "ui-icon-play"
			}
		})
		.click(function() {
			var options;
			if ( $( this ).text() === "play" ) {
				options = {
					label: "pause",
					icons: {
						primary: "ui-icon-pause"
					}
				};
			} else {
				options = {
					label: "play",
					icons: {
						primary: "ui-icon-play"
					}
				};
			}
			$( this ).button( "option", options );
		});
		$( "#stop" ).button({
			text: false,
			icons: {
				primary: "ui-icon-stop"
			}
		})
		.click(function() {
			$( "#play" ).button( "option", {
				label: "play",
				icons: {
					primary: "ui-icon-play"
				}
			});
		});
		$( "#forward" ).button({
			text: false,
			icons: {
				primary: "ui-icon-seek-next"
			}
		});
		$( "#end" ).button({
			text: false,
			icons: {
				primary: "ui-icon-seek-end"
			}
		});
		$( "#shuffle" ).button();
		$( "#repeat" ).buttonset();
    
}
