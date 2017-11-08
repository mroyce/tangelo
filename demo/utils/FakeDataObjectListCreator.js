import faker from 'faker';


// Set seed for consistent data
faker.seed(0);


const _createFakeObjectList = (fields, numObjects) => {
  const list = [];

  for (let index = 0; index < numObjects; index++) {
    // TODO do this in a less shitty way
    const o = {};
    for (const key in fields) {
      o[key] = fields[key]();
    }

    list.push(
      Object.assign(
        { id: index },
        o
      )
    );
  }

  return list;
};


/**
 * Utilities for creating arrays of fake data objects.
 */
const FakeDataObjectListCreator = {
  createFakePeopleList: (numObjects) => {
    const fields = {
      firstName: faker.name.firstName,
      lastName: faker.name.lastName,
      email: faker.internet.email,
      address: faker.address.streetAddress,
      birthDate: faker.date.past,
      thumbnail: faker.image.avatar,
    };

    return _createFakeObjectList(fields, numObjects);
  },

}


export default FakeDataObjectListCreator;
