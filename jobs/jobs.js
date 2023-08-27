const fs = require("fs");

const cron = require("node-cron");

function removeImageAfter2min(filepath) {
  const job = cron.schedule("*/2 * * * *", () => {
    fs.unlink(filepath, (err) => {
      if (err) {
        console.log(err);
      }
    });
    job.stop();
  });
  job.start();
}

module.exports = {
  removeImageAfter2min,
};
