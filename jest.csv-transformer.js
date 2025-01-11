const Papa = require("papaparse");

module.exports = {
  process(fileContent) {
    return (
      "module.exports = " + JSON.stringify(Papa.parse(fileContent).data) + ";"
    );
  },
};
