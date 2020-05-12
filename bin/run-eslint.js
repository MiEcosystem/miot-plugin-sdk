const { CLIEngine } = require('eslint');


function check(path) {
  return new Promise((resolve, reject) => {
    const cli = new CLIEngine();
    const report = cli.executeOnFiles(path);
    console.log('run-eslint', report);
    if (!report.errorCount) {
      resolve();
      return;
    }
    reject(report);
  });
}

function fix(path) {
  return new Promise((resolve, reject) => {
    const cli = new CLIEngine({
      fix: true
    });
    const report = cli.executeOnFiles(path);
    console.log('run-eslint', report);
    CLIEngine.outputFixes(report);
    if (!report.errorCount) {
      resolve();
      return;
    }
    reject(report);
  });
}

module.exports = {
  check,
  fix
};
