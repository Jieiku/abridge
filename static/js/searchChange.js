const fs = require('fs');
const path = require("path");
const { replaceInFileSync } = require('replace-in-file');

// Path for config.toml
const configTomlPath = path.join(__dirname, "../../config.toml");

async function main() {
    // Process arguments to determine the search mode
    const args = process.argv.slice(2); // Remove the first two default arguments

    if (args.length > 0) {
        // Check the search mode based on the argument provided
        switch (args[0]) {
            case '--pagefind':
                console.log('Pagefind search mode activated.');
                await swapToPagefind();
                break;
            case '--elasticlunr':
                console.log('Elasticlunr search mode activated.');
                await swapToElasticlunr();
                break;
            default:
                console.log('Unknown search mode. Please use --pagefind or --elasticlunr.');
        }
    } else {
        console.log('No search mode specified. Please use --pagefind or --elasticlunr.');
    }
}

main();

async function swapToPagefind() {
    // Edit the config.toml file
    replaceInFileSync({
        files: configTomlPath,
        from: /search_library = ['|"]\w+['|"]/g,
        to: 'search_library = "pagefind"',
    });
    replaceInFileSync({
        files: configTomlPath,
        from: /online_indexformat = ['|"]\w+['|"]/g,
        to: 'online_indexformat = "fuse_json"',
    });
    replaceInFileSync({
        files: configTomlPath,
        from: /index_format = ['|"]\w+['|"]/g,
        to: 'index_format = "fuse_json"',
    });
}

async function swapToElasticlunr() {
    // Edit the config.toml file
    replaceInFileSync({
        files: configTomlPath,
        from: /search_library = ['|"]\w+['|"]/g,
        to: 'search_library = "elasticlunr"',
    });
    replaceInFileSync({
        files: configTomlPath,
        from: /online_indexformat = ['|"]\w+['|"]/g,
        to: 'online_indexformat = "elasticlunr_json"',
    });
    replaceInFileSync({
        files: configTomlPath,
        from: /index_format = ['|"]\w+['|"]/g,
        to: 'index_format = "elasticlunr_json"',
    });
}