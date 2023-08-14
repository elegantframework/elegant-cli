const patch_spawn = require('cross-spawn');

patch_spawn.sync(
    "npm version patch && npm publish",
    {
        stdio: 'inherit'
    }
);