import fs from "fs";
import cron from "node-cron";

function removeImageAfter1min(filePath: string) {
  const job = cron.schedule("*/1 * * * *", () => {
    fs.unlink(filePath, (err) => {
      if (err) {
        job.stop();
      }
    });
    job.stop();
  });
  job.start();
}

export { removeImageAfter1min };
