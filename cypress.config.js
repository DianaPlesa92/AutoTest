const { defineConfig } = require("cypress");
const {
  addCucumberPreprocessorPlugin,
} = require("@badeball/cypress-cucumber-preprocessor");
const {
  preprocessor,
} = require("@badeball/cypress-cucumber-preprocessor/browserify");

const { readFileSync } = require('fs')


async function setupNodeEvents(on, config) {
  const file = config.env.fileConfig || 'stage';
  const text = readFileSync('cypress/configFiles/' + `${file}.json`)
  const values = JSON.parse(text)

  config.env = {
    values
  }
  
  on('task', {
    readPdf,
  })
  await addCucumberPreprocessorPlugin(on, config);

  on("file:preprocessor", preprocessor(config));

  return config;
}

module.exports = defineConfig({
  e2e: {
    specPattern: "**/*.feature",
    setupNodeEvents,
    testIsolation: false,
    "viewportWidth": 1750,
    "viewportHeight": 1200,
    "defaultCommandTimeout": 15000,
    video: false,
    numTestsKeptInMemory: 0,

  },
});



function readPdf(pathToPdf) {
  return new Promise((resolve) => {
    const pdfPath = path.resolve(pathToPdf)
    let dataBuffer = fs.readFileSync(pdfPath)
    pdf(dataBuffer).then(function ({ text }) {
      const arr = text.split("\n");
      resolve(arr)
    })
  })
}