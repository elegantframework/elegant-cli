const spawn = require('cross-spawn');

spawn.sync(
    "npm version patch && npm publish",
    {
        stdio: 'inherit'
    }
);