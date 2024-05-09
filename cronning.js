import cron from 'cron';
import https from 'https';

const backendUrl = 'https://linkverse.onrender.com/api';

const job = new cron.CronJob('*/14 * * * *', () => {
  https
    .get(backendUrl, (res) => {
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
});

job.start();
