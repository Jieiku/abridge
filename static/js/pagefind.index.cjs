// Import the path and fs modules to fetch the search index
const path = require("path");
const fs = require("fs");

async function createIndex() {
  // Dynamically import the pagefind module
  const pagefind = await import("pagefind");

  removeOldIndex();

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
  await Promise.all(promises)
    .then(async () => {
      // Write the index files to disk
      const { errors } = await index.writeFiles({
        outputPath: "./static/js/",
      });
      if (errors.length > 0) {
        console.log("Errors: ", errors);
      }
    })
    .then(async () => {
      // Edit the pagefind to convert from MJS to CJS
      const pagefindPath = path.join(__dirname, "pagefind.js");//source pagefind from node module
      let pagefindContent = fs.readFileSync(pagefindPath, "utf8");
      // Remove 'import.meta.url' from the pagefind file and exports
      pagefindContent = pagefindContent
        .replace(
          /initPrimary\(\)\{([^{}]*\{[^{}]*\})*[^{}]*\}/g,
          `initPrimary(){}`
        ) // Remove annoying function
        .replace(/;export\{[^}]*\}/g, "");
      fs.writeFileSync(pagefindPath, pagefindContent);

      // now insert the CJS into the anonymous function within pagefind.search.js
      const pagefind_searchPath = path.join(__dirname, "pagefind.search.js");//file to insert into
      const search_pagefindPath = path.join(__dirname, "pagefind_search.js");//output
      let pagefind_searchContent = fs.readFileSync(pagefind_searchPath, "utf8");
      // Now insert into pagefind.search.js at this location: //insertHere
      pagefind_searchContent = pagefind_searchContent.replace(/\/\/insertHere/g, pagefindContent);
      fs.writeFileSync(search_pagefindPath, pagefind_searchContent);

    })
    .then(async () => {
      await pagefind.close();
    })
    .catch((error) => {
      console.error("An error occurred:", error);
    });
}

function removeOldIndex() {
  // Remove all the old fragment, index and pagefind files
  const indexFolder = path.join(__dirname, "../../static/js/index");
  const fragmentFolder = path.join(__dirname, "../../static/js/fragment");
  clearFolder(indexFolder);
  clearFolder(fragmentFolder);

  // Delete all files in this format pagefind.*.pf_meta
  const staticFolder = path.join(__dirname, "../../static/js");
  const files = fs.readdirSync(staticFolder);
  files.forEach((file) => {
    if (file.startsWith("pagefind") && file.endsWith(".pf_meta")) {
      fs.unlinkSync(path.join(staticFolder, file));
    }
  });
}

function clearFolder(directoryPath) {
  try {
    // Read all the files in the directory
    const files = fs.readdirSync(directoryPath);

    // Iterate over each file and delete it
    for (const file of files) {
      const filePath = path.join(directoryPath, file);
      fs.unlinkSync(filePath);
    }
  } catch (error) {
    // Ignore the error if the directory does not exist, as that is a good behaviour :)
    if (error.code !== 'ENOENT') {
      console.error("An error occurred:", error);
    }
  }
}

module.exports = createIndex;
