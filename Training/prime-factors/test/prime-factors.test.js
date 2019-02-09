const primefactors = require('../src/primefactors');

describe('Prime Factor Tests', () => {

  it('should throw expection with parameter with value 1', () => {
    expect(() => {
                primefactors.generate(1);
            }).toThrow('Can not accept invalid parameter');
  });

  it('should throw expection with parameter of blank string', () => {
    expect(() => {
                primefactors.generate('');
            }).toThrow('Can not accept invalid parameter');
  });

  it('should throw expection with parameter of null value', () => {
    expect(() => {
                primefactors.generate(null);
            }).toThrow('Can not accept invalid parameter');
  });

  it('should throw expection with no parameter', () => {
    expect(() => {
                primefactors.generate();
            }).toThrow('Can not accept invalid parameter');
  });

  it('should have prime factor of 2 with given parameter of 2', async () => {
    var result = primefactors.generate(2);
    var expected = [2];

    expect.assertions(1);
    await expect(result).resolves.toEqual(expected);
  });

  it('should have prime factor of 3 with given parameter of 3', async () => {
    var result = primefactors.generate(3);
    var expected = [3];

    expect.assertions(1);
    await expect(result).resolves.toEqual(expected);
  });

  it('should have prime factor of 2,2 with given parameter of 4', async () => {
    var result = primefactors.generate(4);
    var expected = [2,2];

    expect.assertions(1);
    await expect(result).resolves.toEqual(expected);
  });

  it('should have prime factor of 2,3 with given parameter of 6', async () => {
    var result = primefactors.generate(6);
    var expected = [2,3];

    expect.assertions(1);
    await expect(result).resolves.toEqual(expected);
  });

  it('should have prime factor of 2,2,2 with given parameter of 8', async () => {
    var result = primefactors.generate(8);
    var expected = [2,2,2];

    expect.assertions(1);
    await expect(result).resolves.toEqual(expected);
  });

  it('should have prime factor of 3,3 with given parameter of 9', async () => {
    var result = primefactors.generate(9);
    var expected = [3,3];

    expect.assertions(1);
    await expect(result).resolves.toEqual(expected);
  });
});