const fs = require("fs");

const config = {
  apiUrl: process.env.API_URL || "http://localhost:3000",
};

const configFilePath = "src/assets/config.json";

fs.writeFile(configFilePath, JSON.stringify(config, null, 2), (err) => {
  if (err) {
    console.error("Erreur lors de la création du fichier config.json :", err);
    process.exit(1);
  }
  console.log(
    `Le fichier config.json a été créé avec succès dans ${configFilePath}`
  );
});
