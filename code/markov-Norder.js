autowatch = 1;
outlets = 3;

var NorderLib = require('NoderLib');


var myval = [];

var seqtowrite;

NorderLib.MarkovN.prototype.outputResult = function() {

    outlet(0, markov.pitches);
    outlet(1, markov.velocities);
    outlet(2, markov.durations);
};



var markov= new NorderLib.MarkovN();




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

function setMarkovLength(x){
    markov.markovLength= x;

}







