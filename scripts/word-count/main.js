// main.js
const { countWords } = require("./wordCounter");
const { findFilesByExtension } = require("./fileFinder");
const { writeSummary } = require("./summaryWriter");
const fs = require("fs");

function main() {
  const root = process.argv[2];
  const mdFiles = findFilesByExtension(root, ".md");

  const results = mdFiles.map((file) => {
    const content = fs.readFileSync(file, "utf-8");
    return { file, count: countWords(content) };
  });

  writeSummary(results);
}

main();
