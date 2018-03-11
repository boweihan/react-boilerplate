import Enum from 'helpers/enum';

describe('Enum', () => {
  it('Creates a new enum without default values', () => {
    expect(Object.keys(new Enum()).length).toEqual(0);
  });

  it('Creates a new enum WITH default values', () => {
    expect(Object.keys(new Enum('INTERSECTION', 'LID')).length).toEqual(2);
  });

  it('adds a key', () => {
    let en = new Enum('INTERSECTION', 'LID');
    en.add('key');
    expect(Object.keys(en).length).toEqual(3);
  });

  it('lists all keys', () => {
    let en = new Enum('INTERSECTION', 'LID');
    en.add('key');
    expect(en.toList()).toEqual(['INTERSECTION', 'LID', 'key']);
  });
});
