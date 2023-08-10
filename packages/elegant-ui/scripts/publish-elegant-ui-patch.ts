const ui_patch_spawn = require('cross-spawn');

ui_patch_spawn.sync(
    "npm version patch && npm publish",
    {
        stdio: 'inherit'
    }
);