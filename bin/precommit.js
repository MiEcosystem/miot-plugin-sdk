const { exec } = require('child_process');
const { resolve } = require('path');
const { existsSync } = require('fs');
// const { EOL } = require('os');
const { fix } = require('./run-eslint');
// console.log(9999, EOL);

const repo = resolve(__dirname, '../../');
const checkDir = resolve(__dirname, '../');

const cmdPrecommit = 'git diff --cached --name-only';

// const excludes = [
//   'exports/'
// ];

function precommit() {
  exec(cmdPrecommit, {
    cwd: repo
  }, (e, stdout) => {
    if (e) {
      process.exit(2);
      return;
    }
    if (!stdout) {
      return;
    }

    const paths = stdout.split('\n').map((path) => {
      return path ? resolve(repo, path) : '';
    }).filter((path) => {
      return !!path && existsSync(path) && path.startsWith(checkDir);
    });
    console.log('paths', paths);

    if (!paths) {
      return;
    }

    fix(paths).then(({ hasFix }) => {
      if (hasFix) {
        reAdd(paths);
        return;
      }
      console.log('pre commit check success');
    }).catch(() => {
      console.log('pre commit check fail');
      process.exit(1);
    });
  });
}

function reAdd(paths) {
  exec(`git add ${ paths.map((path) => {
    return path;
  }).join(' ') }`, {
    cwd: repo
  }, (e, stdout) => {
    if (e) {
      process.exit(2);
      return;
    }
    if (!stdout) {
      return;
    }

    precommit();
  });
}

precommit();
