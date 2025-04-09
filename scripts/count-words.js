const fs = require("fs");
const path = require("path");

const countWords = (text) => text.split(/\s+/).filter(Boolean).length;

const findMarkdownFiles = (toCountPath) => {
  const directoriesToParse = [toCountPath];
  const filesToCount = [];

  while (directoriesToParse.length > 0) {
    const currentPath = directoriesToParse.pop();
    const entries = fs.readdirSync(currentPath, { withFileTypes: true });

    for (const entry of entries) {
      const fullPathOfEntry = path.join(currentPath, entry.name);
      if (entry.isDirectory()) {
        directoriesToParse.push(fullPathOfEntry);
      } else if (entry.isFile() && fullPathOfEntry.endsWith(".md")) {
        filesToCount.push(fullPathOfEntry);
      }
    }
  }

  return filesToCount;
};

function writeSummary(results) {
  const summaryFile = process.env.GITHUB_STEP_SUMMARY;
  if (summaryFile) {
    const lines = ["### Word Counts:\n"];
    results.forEach(({ file, count }) => {
      lines.push(`- \`${file}\`: ${count} words`);
    });
    fs.appendFileSync(summaryFile, lines.join("\n") + "\n");
  }
}

function main() {
  const mdFiles = findMarkdownFiles(root);

  const results = mdFiles.map((file) => {
    const content = fs.readFileSync(file, "utf-8");
    return { file, count: countWords(content) };
  });

  writeSummary(results);

  results.forEach(({ file, count }) => {
    console.log(`${file}: ${count} words`);
  });
}

main();
