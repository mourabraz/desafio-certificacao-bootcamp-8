import faker from 'faker';
import { factory } from 'factory-girl';

import User from '../src/app/models/User';
import Banner from '../src/app/models/Banner';
import Meetup from '../src/app/models/Meetup';

factory.define('User', User, {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
});

factory.define('Banner', Banner, {
  name: faker.lorem.word(),
  path: faker.lorem.word(),
});

factory.define('Meetup', Meetup, {
  title: faker.lorem.sentence(),
  description: faker.lorem.paragraphs(2),
  localization: faker.address.streetAddress(),
  date: faker.date.future(),
  user_id: 1,
  banner_id: 1,
});

export default factory;
