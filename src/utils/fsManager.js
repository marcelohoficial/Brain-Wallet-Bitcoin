const fs = require("fs");

class fsManager {
  db = [];

  append() {
    fs.appendFile("src/db/btc.json", db, "utf8", function (err) {
      if (err) throw err;
      console.log("Data is appended to file successfully.");
    });
  }

  create(data) {
    fs.writeFile("src/db/btc.json", data.toString("utf8"), function (err) {
      if (err) throw err;
      console.log("File is created successfully.");
    });
  }

  read() {
    fs.readFile("src/db/btc.json", "utf8", (err, data) => {
      if (err) throw err;
      this.save(data);
    });
  }

  save(data) {
    this.db.push(data);
  }

  write(data) {
    fs.writeFile(
      "src/db/btc.json",
      data.toString("utf8"),
      function (err, data) {
        if (err) throw err;
        return data;
      }
    );
  }
}

module.exports = new fsManager();
