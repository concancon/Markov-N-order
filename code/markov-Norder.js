autowatch = 1;
outlets = 3;


var myval = [];
var markObj = {};
var currentGram = [];
var seqtowrite;
var order = 1;
var foobar = new Object();

//object instance identifier will be printed via bang
//all global code happens within context of that instance
function bang() {
	post('hola\n');
	post(foobar);
	post();
}


function list() {
    var a = arrayfromargs(arguments);
    myval.push(a);
    bang();
}


function clear() {
    markObj = {};
    myval = [];
    result = [];
    pitches= [];
    velocities = [];
    durations = [];

}

function callCreate() {

    createMarkov(myval);

}

function callGenerate(){

    generate(myval);
}




function createMarkov(noteList) {

//create an entry of size order




         post("new index " + noteList.slice(noteList.length - (order)));
        post();

    for (var i = 0; i <=  noteList.length - order; i++) {


        // break up noteList into clusters of order n

        var gram = [];
        gram.push( noteList.slice(i, i + order));

        if (!markObj[gram] ) {
            markObj[gram] = [];

        }





        //this section still needs to be generalized




        //special case second to last and last elements lead to first
        //push first element after last to create a loop
        if (i === (noteList.length - order)) {

            markObj[(noteList.slice(noteList.length - (order)))] = [];
            for(var r= 0; r< order-1; r++) {
                markObj[(noteList.slice(noteList.length - (order - (r+1))).concat(noteList.slice(0, (r+1))))] = [];
                markObj[(noteList.slice(noteList.length - (order - (r+1))).concat(noteList.slice(0, (r+1))))].push(noteList[r+1]);
            }

            markObj[gram].push(noteList[0]);
            //markObj[noteList.slice(noteList.length-order).push( noteList[0])];

           // markObj[(noteList.slice(noteList.length - (order-1)).concat(noteList[0]))].push(noteList[1]);


         //   markObj[noteList[noteList.length - 1]].push(noteList[0]);
        } else {
            markObj[gram].push(noteList[i + order]);

        }


    }




    var properties = [];
    for (var key in markObj) {
        if (markObj.hasOwnProperty(key)) {
            post("key: " + key + " " + "value: " + markObj[key] + " ");
            post();
        }
    }
    //assign first element to currentgram for next function//bad practice

}

var result = [];
var pitches= [];
var velocities = [];
var durations = [];


function generate(noteList) {

    //get the first index of markObj
    currentGram =(Object.keys(markObj)[0]);
    currentGram = currentGram.split(',').map(function(item) {
        return parseInt(item, 10);
    });





    for(var x= 0; x< order; x++) {
        result.push(currentGram.slice(x* 3, (x*3)+ 3));
        //result.push(currentGram.slice(3, 5));
    }
    post("result at first: " + result.toString());
    post();

    for (var i = 0; i < 64; i++) {

        //get all possible succesors given an index
        var possibilities = markObj[currentGram];
        //pick a value from all possible values and add it to the result string
        post("poss " + possibilities);
        post();

        if (typeof possibilities === 'undefined' || possibilities === null) {
            // possibilities is undefined or null

            break;

        }
        else {
            var next = possibilities[Math.floor(Math.random() * possibilities.length)];
            post("next: " + next.toString());
            post();
            result.push(next);
            post("result: " + result.toString());
            post();
            pitches.push(result[i][0]);
            velocities.push(result[i][1]);
            durations.push(result[i][2]);
            currentGram = result.slice(result.length - order);
            post("currentGram: " + currentGram.toString());
            post();
        }
    }

    outlet(0, pitches);
    outlet(1, velocities);
    outlet(2, durations);



}

function setOrder(x){
    order= x;
}










