const fs = require('fs');

const fetchJSONData = async () => {
  return new Promise((resolve, reject) => {
    try {
      resolve(JSON.parse(fs.readFileSync("./temp.json", "utf8")));
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = fetchJSONData;
