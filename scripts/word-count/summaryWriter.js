// summaryWriter.js
const fs = require("fs");

const writeSummary = (results) => {
  const summaryFile = process.env.GITHUB_STEP_SUMMARY;
  if (summaryFile) {
    const lines = ["### Word Counts:\n"];
    results.forEach(({ file, count }) => {
      lines.push(`- \`${file}\`: ${count} words`);
    });
    fs.appendFileSync(summaryFile, lines.join("\n") + "\n");
  }
};

module.exports = { writeSummary };
