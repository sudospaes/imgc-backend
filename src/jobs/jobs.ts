import fs from "fs/promises";
import cron from "node-cron";

function removeImageAfter1min(filePath: string) {
  const job = cron.schedule("*/1 * * * *", () => {
    fs.unlink(filePath).catch(() => job.stop());
  });
  job.start();
}

export { removeImageAfter1min };
