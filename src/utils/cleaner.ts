import fs from "fs/promises";
import path from "path";

import appRootPath from "app-root-path";

fs.readdir(path.join(appRootPath.toString(), "uploads"))
  .then((files) => {
    for (const file of files) {
      fs.unlink(path.join("uploads", file)).catch((err) => console.log(err));
    }
  })
  .catch((err) => console.log(err));
