const path = require('path');
const fs = require('fs');
const { DEV, SUPPORTED_ASSET_FILE_TYPES, project_dir } = require('./bin/config/common');
const { assetExts } = require('metro-config/src/defaults/defaults');
const blacklist = require('metro-config/src/defaults/blacklist');

// 排除非当前项目的目录，避免 jest-haste-map DuplicateError
const currentProject = process.env.MIOT_PROJECT;
const otherProjects = currentProject
  ? fs.readdirSync(path.join(__dirname, 'projects'))
      .filter(d => d !== currentProject && !d.startsWith('.') && fs.statSync(path.join(__dirname, 'projects', d)).isDirectory())
      .map(d => new RegExp(`projects/${d.replace(/\./g, '\\.')}/.*`))
  : [];

module.exports = {
  resolver: {
    /* resolver options */
    blacklistRE: blacklist(otherProjects),
    assetExts: [...assetExts, ...SUPPORTED_ASSET_FILE_TYPES],
    extraNodeModules: {
      "miot": path.resolve(__dirname, "miot-sdk")
    }
  },
  transformer: {
    /* transformer options */
    babelTransformerPath: path.join(project_dir, "bin", "config", DEV ? "transformerForBuild.js" : "transformer.js")
  },
  serializer: {
    /* serializer options */
  },
  server: {
    /* server options */
  }
  /* general options */
};
