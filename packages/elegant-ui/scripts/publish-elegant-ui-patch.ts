const ui_patch_spawn = require('cross-spawn');

ui_patch_spawn.sync(
    "npm version patch && npm test && npm run build && npm publish",
    {
        stdio: 'inherit'
    }
);