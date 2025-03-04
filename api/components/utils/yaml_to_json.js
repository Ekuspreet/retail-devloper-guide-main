const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");

// Define the root directory where your YAML files are located
const rootDirectory = path.join(__dirname, "../examples/retailFlows");

// Function to convert a YAML file to JSON and delete the original YAML file
function convertYamlToJson(yamlFilePath, jsonFilePath) {
  try {
    const yamlContent = fs.readFileSync(yamlFilePath, "utf8");
    const yamlObject = yaml.load(yamlContent);
    const jsonContent = JSON.stringify(yamlObject, null, 2);
    
    fs.writeFileSync(jsonFilePath, jsonContent, "utf8");
    fs.unlinkSync(yamlFilePath); // Delete the YAML file after conversion

    console.log(`Converted and deleted: ${yamlFilePath} → ${jsonFilePath}`);
  } catch (err) {
    console.error(`Error processing ${yamlFilePath}:`, err);
  }
}

// Recursively process directories and files
function processDirectory(directoryPath) {
  const files = fs.readdirSync(directoryPath);

  for (const file of files) {
    const filePath = path.join(directoryPath, file);

    if (fs.statSync(filePath).isDirectory()) {
      processDirectory(filePath); // Recurse into subdirectories
    } else if ([".yaml", ".yml"].includes(path.extname(file).toLowerCase())) {
      const jsonFilePath = path.join(
        directoryPath,
        path.basename(file, path.extname(file)) + ".json"
      );
      convertYamlToJson(filePath, jsonFilePath);
    }
  }
}

// Start processing the root directory
processDirectory(rootDirectory);
