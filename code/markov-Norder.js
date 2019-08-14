autowatch = 1;
outlets = 3;

var NorderLib = require('NorderLib');
var markov = new NorderLib.MarkovN();

/**
 * holds incoming note data from UI object
 @name myval
 @type string
 *
 **/
var myval = [];


/**
 * outputs generated Markov chain
 * @function
 * @name outputResult
 *
 **/
function outputResult(markov) {

    outlet(0, markov.getPitches());
    outlet(1, markov.getVelocities());
    outlet(2, markov.getDurations());
}

/**
 * function to pass data from UI object to myval array
 * @function
 * @name list
 *
 **/
function list() {
    var a = arrayfromargs(arguments);
    myval.push(a);
}

/**
 * clears the markov chain and internal storage for UI values
 * @function
 * @name clear
 *
 **/
function clear() {
    myval = [];
    markov.clear();
}

/**
 * wrapper function for multiMarkov.createMarkov();
 * @function
 * @name callCreate
 *
 **/
function callCreate() {

    markov.createMarkov(myval);

}

/**
 * wrapper function for multiMarkov.generate() and  outputResult()
 * @function
 * @name callGenerateandOutput()
 *
 **/
function callGenerateandOutput() {

    markov.generate(myval);
    outputResult(markov);
}

/**
 * wrapper function for  markov.setOrder()
 * @function
 * @name setOrder
 * @param {number} x desired order
 *
 **/
function setOrder(x) {
    markov.setOrder(x);
}

/**
 * wrapper function for markov.setOrder()
 * @function
 * @name setMarkovLength
 * @param {number} x desired length
 *
 **/
function setMarkovLength(x) {
    markov.setMarkovLength(x);

}







