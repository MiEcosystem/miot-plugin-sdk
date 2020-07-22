const path = require('path')
const { DEV, SUPPORTED_ASSET_FILE_TYPES, project_dir } = require('./bin/config/common')
const { assetExts } = require('metro-config/src/defaults/defaults');

module.exports = {
    resolver: {
      /* resolver options */
      assetExts: [...assetExts, ...SUPPORTED_ASSET_FILE_TYPES ]
    },
    transformer: {
      /* transformer options */
      babelTransformerPath: path.join(project_dir, "bin", "config", DEV ? "transformerForBuild.js" : "transformer.js"),
    },
    serializer: {
      /* serializer options */
    },
    server: {
      /* server options */
    }

    /* general options */
  };
