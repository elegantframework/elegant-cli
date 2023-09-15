const ui_minor_version_spawn = require('cross-spawn');

ui_minor_version_spawn.sync(
    "npm version minor && npm test && npm run build && npm publish",
    {
        stdio: 'inherit'
    }
);