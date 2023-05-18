const spawn = require('cross-spawn');

spawn.sync(
    "npm version prerelease --preid=innovators && npm publish --tag innovators",
    {
        stdio: 'inherit'
    }
);