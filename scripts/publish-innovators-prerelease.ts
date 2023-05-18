const spawn = require('cross-spawn');

spawn.sync(
    "npm version prerelease --preid=prerelease && npm publish --tag prerelease",
    {
        stdio: 'inherit'
    }
);