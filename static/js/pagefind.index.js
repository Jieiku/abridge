async function createIndex() {
    // Dynamically import the pagefind module
    const pagefind = await import("pagefind");
  
    // Import the path and fs modules to fetch the search index
    const path = require("path");
    const fs = require("fs");
  
    console.log("Creating index...");
  
    const publicFolder = path.join(__dirname, "../../public");
  
    const files = fs.readdirSync(publicFolder);
    let langArray = [];
  
    files.forEach((file) => {
      if (file.startsWith("search_index")) {
        langArray.push(file.split(".")[1]);
      }
    });
  
  
    const { index } = await pagefind.createIndex();
    // Assuming index, fs, and path are already defined and properly imported
  
    // Convert each lang in langArray to a promise that performs the desired operations
    const promises = langArray.map((lang) =>
      (async () => {
        const filePath = path.join(
          __dirname,
          "../../public/search_index." + lang + ".json"
        );
  
        // Read the file content synchronously (consider using async readFile for better performance)
        const fileContent = fs.readFileSync(filePath);
        const data = JSON.parse(fileContent);
  
        // Add each record to the index asynchronously
        for (const record of data) {
          await index.addCustomRecord({
            url: record.url,
            content: record.body,
            language: lang,
            meta: {
              title: record.title,
              description: record.meta,
            },
          });
        }
      })()
    );
  
    // Execute all promises concurrently
    Promise.all(promises)
      .then(async () => {
        // Write the index files to disk
        const { errors } = await index.writeFiles({
          outputPath: "./static/js/",
        });
        if (errors != []) {
          console.log("Errors: ", errors);
        }
    })
    .then(async () => {
        
        // Edit the pagefind to convert from MJS to CJS
        const pagefindPath = path.join(__dirname, "pagefind.js");
        let pagefindContent = fs.readFileSync(pagefindPath, "utf8");
        // Remove 'import.meta.url' from the pagefind file and exports
        pagefindContent = pagefindContent
          .replace(
            /initPrimary\(\)\{([^{}]*\{[^{}]*\})*[^{}]*\}/g,
            `initPrimary(){}`
          ) // Remove annoying function
          .replace(/;export\{[^}]*\}/g, "");
        fs.writeFileSync(pagefindPath, pagefindContent);
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  
  }
  
  module.exports = createIndex;
  