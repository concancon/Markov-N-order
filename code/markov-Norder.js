autowatch = 1;
outlets = 3;

var NorderLib = require('NoderLib');


var myval = [];

var seqtowrite;

NorderLib.MarkovN.prototype.outputResult = function() {

    outlet(0, markov.pitches);
    outlet(1, markov.velocities);
    outlet(2, markov.durations);
}



var markov= new NorderLib.MarkovN();


//var foobar = new Object();

//object instance identifier will be printed via bang
//all global code happens within context of that instance
/*
function bang() {
	post('hola\n');
	post(foobar);
	post();
}
*/

function list() {
    var a = arrayfromargs(arguments);
    myval.push(a);
   // bang();
}


function clear() {
    markov.markObj = {};
    myval = [];
    markov.result = [];
    markov.pitches= [];
    markov.velocities = [];
    markov.durations = [];

}

function callCreate() {

    markov.createMarkov(myval);

}

function callGenerateandOutput(){

    markov.generate(myval);
    markov.outputResult();
}



function setOrder(x){
    markov.order= x;
}

function setnstep(x){
    markov.nstep= x;
}








