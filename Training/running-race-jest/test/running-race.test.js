const Race = require('../src/running-race');

jest.mock('uuid/v4', () => {
    return jest.fn()
    .mockImplementationOnce(() => { return '1111111-1111-1111-1111'; })
    .mockImplementationOnce(() => { return '2222222-2222-2222-2222'; })
    .mockImplementation(() => { return '3333333-3333-3333-3333'; })
});

describe("running race", () => {
    it("should with 0 runners", () => {
        const race = new Race();
        expect(race.getRunners().length).toBe(0);
    });

    describe("adding runners", () => {
        let race;

        beforeAll(() => {
            race = new Race();
            race.addRunner({name: "DJ"});
            race.addRunner({name: "George"});
            race.addRunner({name: "Tim"});
        });

        it("should add 1 runner to the race", () => {
            expect(race.getRunners()[0].name).toBe('DJ');
        });
        
        it("should add 2 runners to the race", () => {
            expect(race.getRunners()[0].name).toBe('DJ');
            expect(race.getRunners()[1].name).toBe('George');
            expect(race.getRunners()[2].name).toBe('Tim');

            expect(race.getRunners().length).toBe(3);
        });

        it("should set the id of the runner", () => {
            expect(race.getRunners()[0].id).toBe("1111111-1111-1111-1111");
        });

        it("should set the id of the runners", () => {
            expect(race.getRunners()[0].id).toBe("1111111-1111-1111-1111");
            expect(race.getRunners()[1].id).toBe("2222222-2222-2222-2222");
            expect(race.getRunners()[2].id).toBe("3333333-3333-3333-3333");
        });

        describe("Resolving Promises", () => {
            it("should return the race id", () => {
                expect.assertions(1);
                return expect(race.start()).resolves.toEqual('3333333-3333-3333-3333');
            });
        });

        describe("Using async/await test for race", () => {
            it("should return the race id", async () => {
                expect.assertions(1);
                await expect(race.start()).resolves.toEqual('3333333-3333-3333-3333');
            });
        });
    });
});