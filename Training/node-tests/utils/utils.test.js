const expect = require('expect');
const utils = require('./utils');

describe('Utils', () => {
    it('should add two numbers', () => {
        var result = utils.add(33,11);
    
        expect(result).toBe(44).toBeA('number');
    });
    
    it('should async add two numbers', (done) =>{
        utils.asyncAdd(4, 3, (sum) => {
            expect(sum).toBe(7).toBeA('number');
            done();
        });
    });
    
    it('shoukd square a number', () => {
        var result = utils.square(5);
    
        expect(result).toBe(25).toBeA('number');
    });
    
    it('shoukd async square a number', (done) => {
        utils.asyncSquare(5, (sum) => {
            expect(sum).toBe(25).toBeA('number');
            done();
        });
    });
});

it('should verify first name and last name value', () => {
    var user = { age: 43, location: 'stamford'};

    var result = utils.setName(user, 'David Jacobs');

    expect(result).toInclude({firstName: 'David', lastName: 'Jacobs'});
});