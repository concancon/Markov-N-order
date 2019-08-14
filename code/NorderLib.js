/**
 * a constructor for an n order Markov Chain
 * @constructor
 * @name MultiMarkov
 *
 **/
function MarkovN() {
    /**
     * Object used to build a Markov chain
     @name markObj
     @type object
     *
     **/
    this.markObj = {};
    /**
     * result after applying markov chain
     @name result
     @type string
     *
     **/
    this.result = [];
    /**
     * holds pitch data
     @name pitches
     @type string
     *
     **/
    this.pitches = [];
    /**
     * holds velocity data
     @name velocities
     @type string
     *
     **/
    this.velocities = [];
    /**
     * holds duration data
     @name durations
     @type string
     *
     **/
    this.durations = [];
    /**
     * entry in Markov Object used to find possible successors
     @name currentGram
     @type string
     *
     **/
    this.currentGram = [];
    /**
     * specifies order of the markov chain to be created
     @name order
     @type number
     *
     **/
    this.order;
    /**
     * desired length for generated markov chain
     @name markovLength
     @type number
     *
     **/
    this.markovLength;


    /**
     * parses input from live.step object and creates a markov object out of it.
     * every unique value is a key whose values are its possible succesors
     * code adapted from Dan Schiffman's tutorial: github.com/codepadawan93/Text-Generator
     * @function
     * @name createMarkov
     * @param {array} noteList a list of notes to use as input for the Markov Chain
     **/
    this.createMarkov = function (noteList) {

        //create an entry of size this.order

        for (var i = 0; i <= noteList.length - this.order; i++) {


            // break up noteList into clusters of this.order n

            var gram = [];
            gram.push(noteList.slice(i, i + this.order));

            if (!this.markObj[gram]) {
                this.markObj[gram] = [];
            }


            //special case "second" to last and last elements lead to first
            //push first element after last to create a loop
            if (i === (noteList.length - this.order)) {

                if (this.order === 1) {
                    //if the order is 1 then simply put the first note after the last
                    this.markObj[gram].push(noteList[0]);

                } else {
                    //create necessary number of entries to loop over end of user input
                    this.markObj[gram].push(noteList[0]);
                    for (var r = 0; r < this.order - 1; r++) {
                        this.markObj[(noteList.slice(noteList.length - (this.order - (r + 1))).concat(noteList.slice(0, (r + 1))))] = [];
                        this.markObj[(noteList.slice(noteList.length - (this.order - (r + 1))).concat(noteList.slice(0, (r + 1))))].push(noteList[r + 1]);
                    }
                }

            } else {
                this.markObj[gram].push(noteList[i + this.order]);

            }


        }


    };

    /**
     * creates a Markov chain according to the order of notes input by the user and of length specified by markovLength variable.
     * @function
     * @name generate
     *
     **/
    this.generate = function (noteList) {

        //get the first index of markObj
        this.currentGram = (Object.keys(this.markObj)[0]);
        this.currentGram = this.currentGram.split(',').map(function (item) {
            return parseInt(item, 10);
        });


        for (var x = 0; x < this.order; x++) {
            this.result.push(this.currentGram.slice(x * 3, (x * 3) + 3));

        }

        for (var i = 0; i < this.markovLength; i++) {

            //get all possible succesors given an index
            var possibilities = this.markObj[this.currentGram];
            //pick a value from all possible values and add it to the this.result string

            if (typeof possibilities === 'undefined' || possibilities === null) {
                // possibilities is undefined or null

                break;

            } else {
                var next = possibilities[Math.floor(Math.random() * possibilities.length)];

                this.result.push(next);
                this.pitches.push(this.result[i][0]);
                this.velocities.push(this.result[i][1]);
                this.durations.push(this.result[i][2]);
                this.currentGram = this.result.slice(this.result.length - this.order);

            }
        }


    };

    /**
     * a getter function for the length or number of entries in markovObj
     * @function
     * @name getMarkObjLength
     * @returns {number} the length of the markov Object.
     **/
    this.getMarkObjLength = function () {

        return Object.keys(this.markObj).length;
    };
    /**
     * a getter function for an entry in the pitches array
     * @function
     * @name getPitches
     * @param {number} index of desired entry in pitches
     * @returns {string} desired entry in pitches
     **/
    this.getPitches= function () {

        return this.pitches;
    };
    /**
     * a getter function for an entry in the velocity array
     * @function
     * @name getVelocities
     * @param {number} index of desired entry in velocities
     * @returns {string} desired entry in velocities
     **/
    this.getVelocities = function() {

        return this.velocities;
    };
    /**
     * a getter function for an entry in the duration array
     * @function
     * @name getDurations
     * @param {number} index of desired entry in durations
     * @returns {string} desired entry in durations
     **/
    this.getDurations = function () {
        return this.durations;
    };
    /**
     * a setter function for the order of the markov chain
     * @function
     * @name setOrder
     * @param {number} desired Markov chain order
     **/
    this.setOrder = function(x){
        this.order = x;

    };

    /**
     * a setter function for the length of the markov chain
     * @function
     * @name setMarkovLength
     * @param {number} desired Markov chain length
     **/
    this.setMarkovLength= function(x) {

        this.markovLength= x;
    };
    /**
     * clears all markov chains contents and properties
     * @function
     * @name clear
     *
     **/
    this.clear= function () {

        this.markObj = {};
        this.result = [];
        this.pitches= [];
        this.velocities = [];
        this.durations = [];
    };
}


exports.MarkovN = MarkovN;