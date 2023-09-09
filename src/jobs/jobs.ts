import fs from "fs";
import cron from "node-cron";

function removeImageAfter2min(filePath: string) {
  const job = cron.schedule("*/2 * * * *", () => {
    fs.unlink(filePath, (err) => {
      if (err) {
        job.stop();
      }
    });
    job.stop();
  });
  job.start();
}

export { removeImageAfter2min };
