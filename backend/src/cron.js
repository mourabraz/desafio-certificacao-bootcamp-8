import './bootstrap';

import cron from 'node-cron';

import Queue from './lib/Queue';

import VanishUnusedImages from './app/jobs/VanishUnusedImages';

// * * * * * *
// | | | | | |
// | | | | | day of week
// | | | | month
// | | | day of month
// | | hour
// | minute
// second ( optional )

cron.schedule('0 1 * * *', async () => {
  console.log('running a task every day at 01:00 (UTC)');

  await Queue.add(VanishUnusedImages.key);
});
