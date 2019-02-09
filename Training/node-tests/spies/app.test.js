const expect = require('expect');
const rewire = require('rewire');

var app = rewire('./app');

describe('App', () => {
    var db = {
        saveUser: expect.createSpy()
    };
    app.__set__('db', db);

    it('Should call the spy correctly', () => {
        var spy = expect.createSpy();
        spy('DJ', 43);
        expect(spy).toHaveBeenCalledWith('DJ', 43);
    });

    it('should call saveUser with user object', () => {
        var email = 'test@test.com';
        var password = '123abd';

        app.handleSignUp(email, password);
        expect(db.saveUser).toHaveBeenCalledWith({email, password});
    });
});