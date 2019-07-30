autowatch = 1;
outlets = 3;

var NorderLib = require('NoderLib');


var myval = [];

var seqtowrite;







var markov= new NorderLib.MarkovN();

function outputResult(markov){

    outlet(0, markov.getPitches());
    outlet(1, markov.getVelocities());
    outlet(2, markov.getDurations());
}



function list() {
    var a = arrayfromargs(arguments);
    myval.push(a);
   // bang();
}


function clear() {
    myval = [];
    markov.clear();
}

function callCreate() {

    markov.createMarkov(myval);

}

function callGenerateandOutput(){

    markov.generate(myval);
    outputResult(markov);
}



function setOrder(x){
    markov.setOrder(x);
}

function setMarkovLength(x){
    markov.setMarkovLength(x);

}







