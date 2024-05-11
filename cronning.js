import cron from 'cron';
import https from 'https';

const linkverse_api = 'https://linkverse.onrender.com/api';
const wanderway_api = 'https://wander-way-api.onrender.com/api/';

const job = new cron.CronJob('*/14 * * * *', () => {
  https
    .get(linkverse_api, (res) => {
      if (res.statusCode === 200) {
        console.log('Server restarted');
      } else {
        console.error(
          `Failed to restart server with status code: ${res.statusCode}`
        );
      }
    })
    .on('error', (err) => {
      console.error('Error during Restart:', err.message);
    });
  https
    .get(wanderway_api, (res2) => {
      if (res2.statusCode === 200) {
        console.log('API 2 called successfully');
      } else {
        console.error(
          `Failed to call API 2 with status code: ${res2.statusCode}`
        );
      }
    })
    .on('error', (err2) => {
      console.error('Error calling API 2:', err2.message);
    });
});

job.start();
