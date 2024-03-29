const fs = require("fs");
console.log(process.env);

const config = {
  apiUrl: process.env.API_URL || "/api",
};

const configFilePath = "src/assets/config.json";
console.log(JSON.stringify(config));
fs.writeFile(configFilePath, JSON.stringify(config, null, 2), (err) => {
  if (err) {
    console.error("Erreur lors de la création du fichier config.json :", err);
    process.exit(1);
  }
  console.log(
    `Le fichier config.json a été créé avec succès dans ${configFilePath}`
  );
});
