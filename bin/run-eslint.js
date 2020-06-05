const { CLIEngine } = require('eslint');
const Path = require('path');
const Colors = require('colors');

const Severitys = ['', 'warn', 'error'];

const Exts = ['.js', '.jsx'];

function formatReport(report) {
  let errorCounts = 0, warningCounts = 0, details = [], hasFix = false;
  if (report && report.results) {
    report.results.forEach(({ errorCount, warningCount, filePath, messages, output }) => {
      const isIgnored = Exts.indexOf(Path.extname(filePath)) === -1 || (messages || []).findIndex((message) => {
        return (message.message || '').toLowerCase().indexOf('file ignored') !== -1;
      }) !== -1;
      if (isIgnored) {
        return;
      }
      if (errorCount || warningCount) {
        let total = `${ filePath } errorCount:${ errorCount || 0 } warnCount:${ warningCount || 0 }`;
        console.log(`+++++++++++++++++`);
        console.log(`${ total }`);
        details.push({
          total,
          messages: messages.map(({ ruleId, line, column, severity, message }) => {
            let tip = `${ line }:${ column }  ${ Severitys[severity] }  ${ ruleId } ~ ${ message }`;
            console.log(Colors[severity === 1 ? 'yellow' : 'red'](tip));
            return tip;
          })
        });
        errorCounts += errorCount || 0;
        warningCounts += warningCount || 0;
        console.log(`-----------------`);
      }
      if (typeof output === 'string') {
        hasFix = true;
      }
    });
  }
  return {
    hasFix,
    errorCounts,
    warningCounts,
    details
  };
}

function check(path) {
  return new Promise((resolve, reject) => {
    const cli = new CLIEngine();
    const report = cli.executeOnFiles(path);
    const formatedReport = formatReport(report);
    if (!formatedReport.errorCounts) {
      resolve(formatedReport);
      return;
    }
    reject(formatedReport);
  });
}

function fix(path) {
  return new Promise((resolve, reject) => {
    const cli = new CLIEngine({
      fix: true
    });
    const report = cli.executeOnFiles(path);
    const formatedReport = formatReport(report);
    CLIEngine.outputFixes(report);
    if (!formatedReport.errorCounts) {
      resolve(formatedReport);
      return;
    }
    reject(formatedReport);
  });
}

module.exports = {
  check,
  fix
};
