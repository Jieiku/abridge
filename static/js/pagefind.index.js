async function createIndex() {
    // Dynamically import the pagefind module
    const pagefind = await import('pagefind');
    const path = require('path');

    const fs = require('fs');

    

    console.log('Creating index...');
    const { index } = await pagefind.createIndex({
        forceLanguage: 'en', // Force the language to English
    });

    const filePath = path.join(__dirname, '../search_index.en.json');

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
    await index.writeFiles({
        outputPath: 'public/pagefind'
    });

    console.log('Index created successfully!');
}

createIndex().catch(console.error);