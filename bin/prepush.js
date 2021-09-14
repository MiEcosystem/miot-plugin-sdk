const { execSync } = require('child_process');
const { resolve } = require('path');
const { writeFileSync } = require('fs');
// const { EOL } = require('os');

const checkDir = resolve(__dirname, '../');

function prepush() {
  console.log('开始prepush');
  const branch = execSync('git rev-parse --abbrev-ref HEAD').toString().replace(/\s+/, '');
  const result = branch.search(/^SDK_[1-9]{1}[0-9]{4}$/i);
  const branch_code = parseInt(branch.replace("SDK_", ""));
  if (result == -1) {
    console.log('此分支不用处理');
    return;
  }
  let tmpResult = require('../miot-sdk/package.json');
  if (tmpResult.api_level === branch_code) {
    console.log("无需更新");
    return;
  }
  tmpResult.api_level = branch_code;
  tmpResult.min_native_api_level.android = branch_code;
  tmpResult.min_native_api_level.ios = branch_code;
  // SDK_10043,version则为1.4.3
  tmpResult.version = `${ parseInt(branch_code / 10000) }.${ parseInt(branch_code % 10000 / 10) }.${ branch_code % 10 }`;
  writeFileSync(`${ checkDir }/miot-sdk/package.json`, JSON.stringify(tmpResult, null, 4));
  execSync(`git add ${ checkDir }/miot-sdk/package.json`);
  execSync(" git commit -m 'update SDK version' ");
  console.log('完成prepush');
}

prepush();