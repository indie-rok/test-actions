// fileFinder.js
const fs = require("fs");
const path = require("path");

const findFilesByExtension = (directoryPath, extension) => {
  const directoriesToParse = [directoryPath];
  const filesToCount = [];

  while (directoriesToParse.length > 0) {
    const currentPath = directoriesToParse.pop();
    const entries = fs.readdirSync(currentPath, { withFileTypes: true });

    for (const entry of entries) {
      const fullPathOfEntry = path.join(currentPath, entry.name);
      if (entry.isDirectory()) {
        directoriesToParse.push(fullPathOfEntry);
      } else if (entry.isFile() && fullPathOfEntry.endsWith(extension)) {
        filesToCount.push(fullPathOfEntry);
      }
    }
  }

  return filesToCount;
};

module.exports = { findFilesByExtension };
