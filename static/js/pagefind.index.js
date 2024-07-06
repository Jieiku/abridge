async function createIndex() {
    // Dynamically import the pagefind module
    const pagefind = await import('pagefind');

    // Import the path and fs modules to fetch the search index
    const path = require('path');
    const fs = require('fs');

    

    console.log('Creating index...');
    const { index } = await pagefind.createIndex({
        forceLanguage: 'en', // Force the language to English
    });


    const filePath = path.join(__dirname, '../../public/search_index.en.json');

    // Assuming fetch is available in the environment
    // Fetch the data asynchronously and wait for the response


    const fileContent = fs.readFileSync(filePath);
    const data = JSON.parse(fileContent);
    // Assuming the response is JSON, parse it
    console.log('Data fetched');

    // Add each record to the index
    for (const record of data) {
        await index.addCustomRecord({
            url: record.url,
            content: record.body,
            language: 'en',
            meta: {
                title: record.title,
                description: record.meta,
            }
        });
    }

    // Write the index files to disk
    const {errors} = await index.writeFiles({
        outputPath: './static/js/',
    });

    if (errors != []) {
        console.log('Errors: ', errors);
    }

    console.log('Index created successfully!');
}

createIndex().catch(console.error);