import cron from "node-cron";

import fs from "fs/promises";

export function removeImageAfter1min(filePath: string) {
  const job = cron.schedule("*/1 * * * *", () => {
    fs.unlink(filePath).catch(() => job.stop());
  });
  job.start();
}
