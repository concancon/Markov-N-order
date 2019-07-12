var NorderLib = require('../NoderLib');
var assert = require('assert');


describe('Markov_N-order_Algorithm', function () {
    describe('Initialization', function () {
        describe('Markov object creation ', function () {


            const markov = new NorderLib.MarkovN();
            before(function () {

                var notelist = [];
                notelist.push("57,16,120");
                notelist.push("57,16,30");
                notelist.push("57,106,30");

                markov.order = 1;
                markov.createMarkov(notelist);

            });


            it('has correct length given single sequence', function () {


                assert.equal(markov.getMarkObjLength(), 3);

            });


            describe('createMarkov ', function () {


                const markov = new NorderLib.MarkovN();
                before(function () {

                    var notelist = [];
                    notelist.push("57,16,120");
                    notelist.push("57,16,30");
                    notelist.push("57,16,30");


                    markov.order = 1;

                    markov.createMarkov(notelist);

                });


                it('puts values that are equal under the same key name', function () {


                    assert.equal(markov.getMarkObjLength(), 2);

                });

            });
            describe('createMarkov ', function () {


                const markov = new NorderLib.MarkovN();
                before(function () {

                    var notelist = [];
                    notelist.push("57,16,120");
                    notelist.push("57,16,30");
                    notelist.push("57,16,30");


                    markov.order = 2;

                    markov.createMarkov(notelist);

                });


                it('creates appropriate amount of entries in MarkObj according to order', function () {


                    assert.equal(markov.getMarkObjLength(), 3);

                });

            });
            describe('createMarkov ', function () {


                const markov = new NorderLib.MarkovN();
                before(function () {

                    var notelist = [];
                    notelist.push("57,16,120");
                    notelist.push("57,16,30");
                    notelist.push("57,16,30");
                    notelist.push("57,16,30");


                    markov.order = 3;

                    markov.createMarkov(notelist);

                });


                it('creates appropriate amount of entries in MarkObj according to order', function () {


                    assert.equal(markov.getMarkObjLength(), 4);

                });

            });


            describe('createMarkov', function () {


                const markov = new NorderLib.MarkovN();
                before(function () {

                    var notelist = [];
                    notelist.push("57,16,120");
                    notelist.push("57,16,30");
                    notelist.push("57,16,30");

                    markov.order = 1;
                    markov.createMarkov(notelist);

                });


                it('creates Markov object where the last note is a key whose value is the first element', function () {


                    assert.equal(markov.markObj['57,16,30'], '57,16,120');

                });

            });
        });
        describe('Markov Chain Generation', function () {
            describe('generate ', function () {
                const markov = new NorderLib.MarkovN();
                before(function () {

                    var notelist = [];
                    notelist.push("57,16,120");
                    notelist.push("57,16,30");
                    notelist.push("57,16,10");
                    markov.order = 1;
                    markov.markovLength = 64;
                    markov.createMarkov(notelist);
                    markov.generate();

                });


                it(' generates Markov chain according to ruleset ', function () {

                    assert.equal(markov.markObj['57,16,120'], '57,16,30');
                    assert.equal(markov.markObj['57,16,30'], '57,16,10');
                    assert.equal(markov.markObj['57,16,10'], '57,16,120');

                });


            });
        });
        describe('Markov Chain Generation', function () {
            describe('generate ', function () {
                const markov = new NorderLib.MarkovN();
                before(function () {

                    var notelist = [];
                    notelist.push("57,16,120");
                    notelist.push("57,16,30");
                    notelist.push("57,16,10");
                    notelist.push("58,16,20");


                    markov.order = 3;
                    markov.markovLength = 64;
                    markov.createMarkov(notelist);
                    markov.generate();

                });


                it(' generates Markov chain according to ruleset given "higher" order (order 3) ', function () {

                    assert.equal(markov.markObj['57,16,120,57,16,30,57,16,10'], '58,16,20');
                    assert.equal(markov.markObj['57,16,30,57,16,10,58,16,20'], '57,16,120');
                    assert.equal(markov.markObj['57,16,10,58,16,20,57,16,120'], '57,16,30');
                    assert.equal(markov.markObj['58,16,20,57,16,120,57,16,30'], '57,16,10');

                });


            });
        });


    });
});
