export const EVENTS_SCHEMA = 'restaurant_list';
export const EventsSchema = {
  name: EVENTS_SCHEMA,
  primaryKey: 'id',
  properties: {
    id: 'int',
    address: 'string',
    description: 'string',
    latitude: 'string',
    longitude: 'string',
    mobile: 'string',
    rating: 'float',
    title: 'string',
    total_review: 'int',
  },
};

// import Realm from 'realm';

// // Declare Schema
// class BookSchema extends Realm.Object {}
// BookSchema.schema = {
//   name: 'Book',
//   properties: {
//     id: 'int',
//     address: 'string',
//     description: 'string',
//     latitude: 'string',
//     longitude: 'string',
//     mobile: 'string',
//     rating: 'float',
//     title: 'string',
//     total_review: 'int',
//   },
// };

// // Create realm
// let realm = new Realm({schema: [BookSchema], schemaVersion: 1});

// // Export the realm
// export default realm;
