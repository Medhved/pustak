const controller = require('../controllers/main');
const chai = require('chai');

const expect = chai.expect;

describe('smoke test', function () {
    it('checks equality', function () {
        expect(true).to.be.true;
    });
});

describe('node test', function() {
    describe('get test', function(){
        it('should return hello world', function(){
            expect(controller.getTest()).to.equal('Hello World Test!');
        })
    })
})
