


function MarkovN() {

    this.markObj = {};
     this.result = [];
     this.pitches= [];
     this.velocities = [];
     this.durations = [];
     this.currentGram = [];
     this.order ;


    this.createMarkov= function(noteList) {

        //create an entry of size this.order


        for (var i = 0; i <=  noteList.length - this.order; i++) {


            // break up noteList into clusters of this.order n

            var gram = [];
            gram.push( noteList.slice(i, i + this.order));

            if (!this.markObj[gram] ) {
                this.markObj[gram] = [];

            }
            
           

            //special case second to last and last elements lead to first
            //push first element after last to create a loop
            if (i === (noteList.length - this.order)) {

                this.markObj[(noteList.slice(noteList.length - (this.order)))] = [];
                for(var r= 0; r< this.order-1; r++) {
                    this.markObj[(noteList.slice(noteList.length - (this.order - (r+1))).concat(noteList.slice(0, (r+1))))] = [];
                    this.markObj[(noteList.slice(noteList.length - (this.order - (r+1))).concat(noteList.slice(0, (r+1))))].push(noteList[r+1]);
                }

                this.markObj[gram].push(noteList[0]);
                //this.markObj[noteList.slice(noteList.length-this.order).push( noteList[0])];

                // this.markObj[(noteList.slice(noteList.length - (this.order-1)).concat(noteList[0]))].push(noteList[1]);


                //   this.markObj[noteList[noteList.length - 1]].push(noteList[0]);
            } else {
                this.markObj[gram].push(noteList[i + this.order]);

            }


        }




        var properties = [];
        for (var key in this.markObj) {
            if (this.markObj.hasOwnProperty(key)) {
                post("Markov key: " + key + " " + "value: " + this.markObj[key] + " ");
                post();
            }
        }
        //assign first element to this.this.currentGram for next function//bad practice

    }


    this.generate= function(noteList) {

        //get the first index of markObj
        this.currentGram =(Object.keys(this.markObj)[0]);
        this.currentGram = this.currentGram.split(',').map(function(item) {
            return parseInt(item, 10);
        });





        for(var x= 0; x< this.order; x++) {
            this.result.push(this.currentGram.slice(x* 3, (x*3)+ 3));

        }
        post("this.result at first  " + this.result.toString());
        post();

        for (var i = 0; i < 64; i++) {

            //get all possible succesors given an index
            var possibilities = this.markObj[this.currentGram];
            //pick a value from all possible values and add it to the this.result string
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
                this.result.push(next);
                post("this.result: "  + this.result.toString());
                post();
                this.pitches.push(this.result[i][0]);
                this.velocities.push(this.result[i][1]);
                this.durations.push(this.result[i][2]);
                this.currentGram = this.result.slice(this.result.length - this.order);
                post("this.currentGram: " + this.currentGram.toString());
                post();
            }
        }




    }
    
    
    
    
    

}


exports.MarkovN= MarkovN;